'use client';
import { rejects } from 'assert';
import { error } from 'console';
import { resolve } from 'path';
import React, { useState, useEffect, useRef, ReactEventHandler } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { SlPicture } from "react-icons/sl";
import axios from 'axios';

interface FileState {
  myFile: string | null;
}

export default function WritePost() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [maxHeight, setMaxHeight] = useState(0);
  const [postImage, setPostImage] = useState<FileState>({myFile:""})
  useEffect(() => {
    if (textareaRef.current) {
      const originalHeight = textareaRef.current.scrollHeight;
      setMaxHeight(originalHeight * 10);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [text, maxHeight]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const createPost = async (text:string, postImage:FileState)=>{
    const url = process.env.SERVER_URL;
    try{
        const token = localStorage.getItem("twitter_cloan_token");
        if(!token){
          throw new Error("you need to login to proced")
        }
        const responce = await axios.post("http://localhost:8080/post",
        {content:text, image:postImage},
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          } 
    });
    console.log("responce for post tweet",responce);
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    createPost(text, postImage);
    setText("");
    setPostImage({myFile:""})
  }

  const handleFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const base64 = await convertToBase64(file) as string;
      if(base64){
        setPostImage({myFile:base64});

      }
    }
   
  };

  return (
    <div className='relative'>
      <div className='sticky top-0 left-0 right-0 flex border-b-2 border-custom-profile-bg bg-black'>
        <button className='text-2xl font-bold flex-1 hover:text-custom-grey'>For you</button>
        <button className='text-2xl font-bold flex-1 hover:text-custom-grey active:underline'>Following</button>
        <button className='text-2xl p-5 hover:bg-slate-400'><IoSettingsOutline /></button>
      </div>
      <div className='flex p-5 border-b-2 border-custom-profile-bg w-full'> 
        <img className='w-14 mr-4 mt-5 h-14 object-cover rounded-full' src='https://pbs.twimg.com/profile_images/1761058966292119552/aqGsGdNE_400x400.jpg' alt='profile image' />
        <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder='What is happening?'
          maxLength={280}
          className='border-none text-2xl pl-5 pt-3 resize-none overflow-y-scroll no-scrollbar bg-black w-full '  //resize-none overflow-hidden
          style={{ height: textareaHeight }}
        />
        <div className='flex'>
        <label htmlFor="image-upload" className='flex ml-4 mt-4'>
          <span className='text-2xl text-blue-500'><SlPicture /></span>
        </label>
        <input className='hidden'
        type="file"  
        name="myFile"
        id="image-upload"
        accept='.jpeg, .png, .jpg'
        onChange={handleFileUpload}
        />
        <button type='submit' className='flex justify-end bg-blue-500 text-xl px-5 py-3 rounded-full ml-auto active:bg-cyan-500'>Post</button>
        </div>
        
        </form>
        
      </div>
    </div>
  );
}

function convertToBase64(file:File){
  return new Promise((resolve, rejects)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) =>{
      rejects(error)
    }
  })
}



// import React from 'react'
// import { IoSettingsOutline } from "react-icons/io5";

// export default function WritePost() {
//   return (
//     <div className=''>
//       <div className='flex border-b-2 border-slate-500'>
//         <button className='text-2xl flex-1 hover:bg-slate-400'>Foryou</button>
//         <button className='text-2xl flex-1 hover:bg-slate-400'>Following</button>
//         <button className='text-2xl p-5 hover:bg-slate-400'><IoSettingsOutline></IoSettingsOutline></button>
//       </div>
//       {/* --------------------------------- */}
//       <div className='flex p-y-10 px-5 border-b-2 border-slate-500'>
//         <img className='w-14 mt-5 h-14 object-cover rounded-full' src='https://pbs.twimg.com/profile_images/1761058966292119552/aqGsGdNE_400x400.jpg' alt='profile image' />
//         <textarea
//           typeof='text'
//           placeholder='What is happening?'
//           maxLength={280}
//           className='border-none border-0 text-3xl pl-5 pt-5 bg-black  w-full'
//         />
//       </div>
//     </div>
//   )
// }