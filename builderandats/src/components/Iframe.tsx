"use client"
import React, { use, useEffect, useState } from "react";
import Handlebars from "handlebars";

const IframeRender = ({data}) => {
  const [html, setHtml] = useState("");
  const [template , setTemplate] = useState<HandlebarsTemplateDelegate | null>(null)
  


  useEffect(() => {
    async function loadTemplate() {
      const res = await fetch("/resume.html");
      const templateString = await res.text();
      const temp = Handlebars.compile(templateString);

      setTemplate(()=> temp);
    }

    loadTemplate();
  }, []);

    

  useEffect(() => {
    
    if(!template) return;
     const data1 = {
        name: data.name || "Mohit Kumar",
        email: data.email || "mohit@email.com",
        summary: data.summary || "MERN developer",
        experience: data.experience || [
          {
            role: "Frontend Dev",
            company: "ABC",
            duration: "2023 - Present",
            description: "Built UI"
          }
        ],
        projects: data.projects || [],
        skills: data.skills || "JS, React"
      };

      setTimeout(() => {
        const render = template(data1);
        setHtml(render);
      } ,300);
    
      return ()=>{
        clearTimeout();
      }
  }, [data, template]);


   const handleGenratePdf = async()=>{
        const req = await fetch("/Api/genratePdf" , {
          method : "POST" , 
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            html : html
          })
        })

        try {
        if(req.ok){
        const blob = await req.blob();
        const url =  URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf"
        a.click();}
        } catch (error) {
          console.log("error")
        }

       
       }

  return (
    <div className="bg-white  flex flex-col gap-5">
      
      <iframe
        srcDoc={html}
        width="820px"
        height="700px"
        style={{ border: "1px solid #ccc" }}
      />
      
      <button className="p-3 bg-blue-500 text-xl  w-40 cursor-pointer rounded-xl hover:bg-blue-700 transition-all "
        onClick={handleGenratePdf}
      >
        Download Pdf
      </button>
    </div>
  );
};

export default IframeRender;