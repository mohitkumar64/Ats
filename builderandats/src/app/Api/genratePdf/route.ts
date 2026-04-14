import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
export  async function POST(req : NextRequest ){
    const {html} = await req.json();
  const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
    const page =  await browser.newPage();

    await page.setContent(html , {
        waitUntil  : "networkidle0"
    })
    const pdf = await page.pdf({
        format : "A4" , 
        printBackground : true
    })
    await browser.close();

    return new NextResponse(pdf , {
        headers : {
            "content-type" : "application/pdf" ,
            "content-diposition" : "attachment; filename=generated.pdf"
        }
    })
     
}