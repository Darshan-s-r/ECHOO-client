'use client';
import React, { useState, useEffect, useRef } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { SlPicture } from "react-icons/sl";
import axios from 'axios';
import { IUser } from '@/interface/User';
import predict_toxicity from '@/mlModel/toxicity_model'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FileState {
  myFile: string | null;
}

export default function WritePost() {
  const router = useRouter();
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [maxHeight, setMaxHeight] = useState(0);
  const [postImage, setPostImage] = useState<FileState>({myFile:""})
  const [user, setUser] = useState<IUser |null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem('User');
    if (localUser) {
      const parsedLocalUser = JSON.parse(localUser);
      setUser(parsedLocalUser);
    }
  }, [setUser]);

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
          router.push("/");
        }
        const responce = await axios.post("http://localhost:8080/post",
        {content:text, image:postImage},
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          } 
    });
    toast.success('content is clean');
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const isToxic:boolean = await predict_toxicity(text);
    if(isToxic){
     return toast.error('Toxic content detected You can not post this content')
    }
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
        <button className='text-2xl p-5 hover:text-custom-grey'><IoSettingsOutline /></button>
      </div>
      <div className='flex p-5 border-b-2 border-custom-profile-bg w-full'> 
      <Link  href={`/${user?.email}`}>
        <img className='w-14 mr-4 mt-5 h-14 object-cover rounded-full' src={user?.profileImageURL} alt='profile image' />
        </Link>
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
        <button type='submit' className='flex justify-end bg-custom-blue text-xl px-5 py-3 rounded-full ml-auto active:bg-cyan-500'>Post</button>
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


