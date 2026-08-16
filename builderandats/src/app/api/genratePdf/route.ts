import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const MAX_HTML_BYTES = 512 * 1024;

export  async function POST(req : NextRequest ){
  if (!getSessionUser(req)) return unauthorizedResponse();

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  try {
    const { html } = await req.json();
    if (typeof html !== "string" || Buffer.byteLength(html, "utf8") > MAX_HTML_BYTES) {
      return NextResponse.json({ error: "HTML must be smaller than 512 KB." }, { status: 400 });
    }

    browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
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
