"use client"
import { router } from 'next/client';
import Image from 'next/image'


import React from 'react'

const TemplateSelection = () => {
  return (
    <div className="w-full bg-[rgb(243,237,255)] p-3 h-[calc(100vh-4rem)]">
      <div className=" flex flex-col gap-10  rounded-2xl p-2 h-full">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold ">Choose a Template to get Started -</h1>
            <p> select a Resume template of your liking and show your value to world </p>
        </div>
          
          <Card  />
      </div>


    </div>
  )
}




const Card = ()=>{
  
  const handleOnclick = ()=>{
      router.push(`/${id}`)
  }
  return (
    <div className="border rounded-md hover:scale-101 transition-all duration-300 overflow-hidden w-[350px]  "
      onClick={
        handleOnclick
      }
    
    
    >
       <Image
        className="w-full h-auto object-contain"
        src="/image.png"
        width={300}
        height={600}
        alt="a photo"
      />
    </div>
  )
}

export default TemplateSelection