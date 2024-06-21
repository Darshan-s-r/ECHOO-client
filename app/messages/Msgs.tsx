'use client';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { RiSendPlaneLine } from "react-icons/ri";
import { SlPicture } from "react-icons/sl";
import { io } from "socket.io-client";

const socket = io('http://localhost:8080', { autoConnect: false });

interface FileState {
  myFile: string | null;
}

export default function Msgs() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [maxHeight, setMaxHeight] = useState(0);
  const [postImage, setPostImage] = useState<FileState>({myFile:""})

  socket.onAny((event, args)=>{
    console.log(event, args);
  })

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


  const sendMsg = async (text:string, postImage:FileState)=>{
    const url = process.env.SERVER_URL;
    try{
        const token = localStorage.getItem("twitter_cloan_token");
        if(!token){
          throw new Error("you need to login to proced")
        }
        const responce = await axios.post("http://localhost:8080/",
        {content:text, image:postImage},
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          } 
    });
    console.log("msg",responce);
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    sendMsg(text, postImage);
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
    <div>
     <p className='sticky top-0 left-0 right-0 ml-4 mt-5 mb-5 text-custom-white font-bold text-2xl'>Bharath GS</p>
      <Link href={'http://localhost:3000/Bharath@gmail.com '}>
      <div className='flex flex-col items-center pb-20 mb-5 border-b-2 border-custom-profile-bg hover:bg-custom-profile-bg'>
        <img className='w-24 h-24 rounded-full' src="Twitter-symbol-500x408.webp" alt="" />
        <p className='text-lg text-custom-white font-bold'>Bharath GS</p>
        <p className='text-lg text-custom-grey'>@Bharath_GS_</p>  
        <p className='mt-5 text-lg text-custom-grey'>Joined July 2023 . 6 Followers</p>   
        </div>
      </Link>
      <div className=''>
      <div className='flex flex-col items-end'>
      <p className='py-3 px-4 bg-custom-blue text-xl rounded-3xl'>Hello</p>
      <p className='text-lg text-custom-grey'>@Bharath_GS_</p>  
      </div>

      <div className='flex flex-col items-start'>
      <p className='py-3 px-4 bg-custom-blue text-xl rounded-3xl'>Hello</p>
      <p className='text-lg text-custom-grey'>@Bharath_GS_</p>  
      </div>
      </div>
     
      <div className='sticky bottom-0 left-0 right-0 bg-custom-profile-bg px-2 rounded-full'>
  <form onSubmit={handleSubmit} className='flex items-center w-full'>
    <label htmlFor="image-upload" className='flex items-center'>
      <span className='text-2xl text-blue-500'><SlPicture /></span>
    </label>
    <input
      className='hidden'
      type="file"
      name="myFile"
      id="image-upload"
      accept='.jpeg, .png, .jpg'
      onChange={handleFileUpload}
    />
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      placeholder='Start a new message'
      maxLength={280}
      className='bg-custom-profile-bg text-custom-white pl-3 pt-3 ml-2 rounded-3xl border-none text-xl resize-none overflow-y-scroll no-scrollbar flex-grow'
      style={{ height: textareaHeight }}
    />
    <button type='submit' className='flex items-center text-xl text-custom-blue rounded-full ml-2 p-2 active:bg-cyan-500'>
      <RiSendPlaneLine />
    </button>
  </form>
</div>

    </div>
  )
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