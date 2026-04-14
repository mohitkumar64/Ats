"use client"
import IframeRender from '@/components/Iframe'

import React, { useEffect } from 'react'
import './resumebuilder.css'
import textFix from '@/utils/textfix'

const ResumeBuilder = () => {
  const templateMeta = {
  id: "modern_1",

  sections: [
          {
            key: "name",
            type: "text",
            required: true
          },
          {
            key: "email",
            type: "text",
            required: true
          },
          {
            key: "summary",
            type: "textarea",
            required: false
          },
          {
            key: "experience",
            type: "list",
            maxItems: 5,
            fields: [
              { key: "role", type: "text", required: true },
              { key: "company", type: "text", required: true },
              { key: "duration", type: "text" },
              { key: "description", type: "textarea" }
            ]
          },
          {
            key: "projects",
            type: "list",
            maxItems: 3,
            fields: [
              { key: "title", type: "text", required: true },
              { key: "link", type: "text" },
              { key: "description", type: "textarea" }
            ]
          },
          {
            key: "skills",
            type: "text"
          }
  ]
  };
  const [data , setData] = React.useState({
    name: "",
    email: "",
    summary: "",
    experience: [
      {
        role: "",
        company: "",
        duration: "",
        description: ""
      }
    ],
    projects: [
      {
        title: "",
        link: "",
        description: ""
      }
    ],
    skills: ""
  })

  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
    const handleListChange = (sectionKey : string, index : number, fieldKey : string, value : string) => {
  setData(prev => {
    const updatedList = [...prev[sectionKey]];

    updatedList[index] = {
      ...updatedList[index],
      [fieldKey]: value
    };

    return {
      ...prev,
      [sectionKey]: updatedList
    };
  });
};
    
    

  return (
    <div className='h-screen w-full flex p-5 gap-2  bg-white '>
        <div className=' flex-1 bg-white'>
            <IframeRender data = {data} />
        </div>

        {/* dynamic data entry here  */}
        <div className=' flex-2 border border-gray-600 rounded-2xl p-2' >
            <div className='w-full max-h-[85vh] text-2xl      overflow-y-auto text-black flex flex-col   py-3 '>
                  {
                    templateMeta.sections.map((t)=>{
                      return(
                          <div key={t.key} className=' text-black   py-2 flex flex-col gap-2  '>
                            {
                                t.type !== "list" && (
                                  t.type === "text" ? (
                                    <div className='flex gap-10 '>
                                      <label className='w-10 ' htmlFor={t.key}>{textFix(t.key)}</label>
                                      <input className='border border-gray-500' type="text" name={t.key}
                                        onChange={(e)=>{
                                          handleChange(e)
                                        }}
                                      
                                      />
                                    </div>
                                  ) : (
                                    <div className='flex flex-col gap-3 '>
                                      <label htmlFor={t.key}>{textFix(t.key)}:</label>
                                      <textarea  className='border border-black' name={t.key} onChange={(e)=>handleChange(e)} />
                                    </div>
                                  )
                                   ) 
                            }
                            {
                                t.type === "list" &&(
                                  <div>
                                    <h1>{textFix(t.key)}</h1>
                                     {
                                      [...Array(1)].map((_,i)=>{
                                        return(
                                          <div key={i} className='flex flex-col gap-1'>
                                            
                                            <div className='grid grid-cols-2 gap-3'>
                                                {
                                                t.fields ?.map((f)=>{
                                                  return (
                                                    <div key = {f.key + i} >
                                                      <div className='flex  flex-col   '>
                                                      <label htmlFor={f.key}>{f.key}</label>
                                                      {
                                                        f.type === "text" ? (
                                                          <input   className ='border border-black' type="text" name={f.key} onChange={(e)=>handleListChange(t.key, i, f.key, e.target.value)} />
                                                        ) : (
                                                          <textarea className='border  border-black' name={f.key+i} onChange={(e)=>handleListChange(t.key, i, f.key, e.target.value)} />
                                                        )
                                                      }
                                                    </div>
                                                    </div>
                                                  )
                                                })
                                              }
                                            </div>
                                              
                                          </div>
                                        )
                                         
                                      } )
                                     }

                                            
                                            

                                  </div>

                                 )


                              
                            }
                                
                                   
                                  
                            
                        </div> 
                         
                      )
                    })
                    
                  }
            </div>
        </div>


    </div>
  )
}

export default ResumeBuilder