import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_HTML_BYTES = 512 * 1024;
const DEFAULT_CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar";
const DEFAULT_VIEWPORT = {
  deviceScaleFactor: 1,
  hasTouch: false,
  height: 1080,
  isLandscape: true,
  isMobile: false,
  width: 1920,
};

async function resolveLocalBrowserExecutablePath() {
  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && existsSync(envPath)) return envPath;

  if (process.platform === "win32") {
    const windowsCandidates = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    ];

    return windowsCandidates.find(existsSync);
  }

  return undefined;
}

async function launchBrowser() {
  if (process.env.VERCEL) {
    const executablePath = await chromium.executablePath(
      process.env.CHROMIUM_PACK_URL ?? DEFAULT_CHROMIUM_PACK_URL,
    );

    return puppeteer.launch({
      args: await puppeteer.defaultArgs({
        args: chromium.args,
        headless: "shell",
      }),
      defaultViewport: DEFAULT_VIEWPORT,
      executablePath,
      headless: "shell",
    });
  }

  const executablePath = await resolveLocalBrowserExecutablePath();
  if (!executablePath) {
    throw new Error(
      "No local Chrome or Edge installation was found. Set PUPPETEER_EXECUTABLE_PATH to its executable path.",
    );
  }

  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath,
    headless: true,
  });
}

export async function POST(req: NextRequest) {
  if (!getSessionUser(req)) return unauthorizedResponse();

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  try {
    const { html } = await req.json();
    if (typeof html !== "string" || Buffer.byteLength(html, "utf8") > MAX_HTML_BYTES) {
      return NextResponse.json({ error: "HTML must be smaller than 512 KB." }, { status: 400 });
    }

    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on("request", (request) => request.abort());

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
      timeout: 15_000,
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
