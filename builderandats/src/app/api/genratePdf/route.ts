import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { existsSync } from "node:fs";
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const MAX_HTML_BYTES = 512 * 1024;

async function resolveBrowserExecutablePath() {
  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && existsSync(envPath)) {
    return envPath;
  }

  if (process.platform === "win32") {
    const windowsCandidates = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    ];

    for (const candidate of windowsCandidates) {
      if (existsSync(candidate)) {
        return candidate;
      }
    }
  }

  try {
    const bundledPath = await puppeteer.executablePath();
    if (bundledPath && existsSync(bundledPath)) {
      return bundledPath;
    }
  } catch {
    // Fall through to Puppeteer's default resolution if no executable was found.
  }

  return undefined;
}

export  async function POST(req : NextRequest ){
  if (!getSessionUser(req)) return unauthorizedResponse();

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  try {
    const { html } = await req.json();
    if (typeof html !== "string" || Buffer.byteLength(html, "utf8") > MAX_HTML_BYTES) {
      return NextResponse.json({ error: "HTML must be smaller than 512 KB." }, { status: 400 });
    }

    browser = await puppeteer.launch({
      executablePath: await resolveBrowserExecutablePath(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on("request", (request) => request.abort());

    await page.setContent(html , {
        waitUntil: "domcontentloaded",
        timeout: 15_000,
    })
    const pdf = await page.pdf({
        format : "A4" , 
        printBackground : true
    })
    return new NextResponse(Buffer.from(pdf) , {
        headers : {
            "content-type" : "application/pdf" ,
            "content-disposition" : "attachment; filename=generated.pdf"
        }
    })
  } catch (error) {
    console.error("PDF generation failed", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
