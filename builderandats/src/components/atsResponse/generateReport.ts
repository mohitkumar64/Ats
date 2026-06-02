import { AtsResponseData, sectionConfig } from "./types";

export const generateReportHtml = (data: AtsResponseData): string => {
  return `
    <html>
      <head>
        <title>ATS Report</title>
        <style>
          body{
            font-family: Arial, sans-serif;
            background:white;
            color:#111827;
            padding:40px;
          }
          h1{
            font-size:42px;
            margin-bottom:12px;
          }
          h2{
            margin-top:35px;
            margin-bottom:15px;
          }
          .score{
            font-size:72px;
            font-weight:800;
            color:#E8754A;
          }
          .card{
            border:1px solid #e5e7eb;
            border-radius:18px;
            padding:25px;
            margin-bottom:25px;
          }
          ul{
            padding-left:20px;
          }
          li{
            margin-bottom:10px;
          }
        </style>
      </head>
      <body>
        <h1>ATS Resume Report</h1>
        <div class="score">${data.score}/100</div>
        <p>${data.summary}</p>
        ${Object.entries(data.sections)
          .map(
            ([key, section]) => `
          <div class="card">
            <h2>${sectionConfig[key]?.title}</h2>
            <p>Score: ${section?.score}</p>
            ${
              section?.issues?.length
                ? `<h3>Issues</h3><ul>${section.issues.map((i) => `<li>${i}</li>`).join("")}</ul>`
                : ""
            }
            ${
              section?.advice?.length
                ? `<h3>Recommendations</h3><ul>${section.advice.map((i) => `<li>${i}</li>`).join("")}</ul>`
                : ""
            }
          </div>
        `
          )
          .join("")}
      </body>
    </html>
  `;
};
