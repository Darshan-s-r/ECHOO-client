import predict_toxicity from '@/mlModel/toxicity_model';
import axios from 'axios';
import React, { useState } from 'react'

interface AddCommentProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  postId:string;
}

export default function AddComments({ isOpen, onClose, setTweet, postId }:{isOpen:AddCommentProps["isOpen"], onClose:AddCommentProps["onClose"], postId:AddCommentProps["postId"]}){
  const [text, setText] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
      try{
        const isToxic:boolean = await predict_toxicity(text);
        if(isToxic){
          return alert('Toxic content detected You can not post this content')
        }
        const token = localStorage.getItem("twitter_cloan_token");
        if(!token){
          throw new Error("you need to login to proced")
        }
        const responce = await axios.post("http://localhost:8080/comments",
        { id:postId,comment:text},
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          } 
    });
    if (responce.status === 200) {
      setTweet((prevTweet: { comments: number; }) => ({
        ...prevTweet,
        comments: prevTweet.comments + 1 // Increment likes count
      }));
      setText('');
    alert('content is clean')
    onclose
    } else {
      throw new Error('Failed to comment a post');
    }
    }catch(err){
      console.log(err)
    }
    
  
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => onClose(e as any)}>
      <div className="bg-black rounded-lg shadow-lg w-[800px] relative m-10" onClick={(e) => e.stopPropagation()}>
        <div className='mx-4 mb-5'>
        <button className="text-4xl text-custom-white inline-block hover:text-custom-red" onClick={onClose}>x</button>
        </div>
    
        <form className='m-10' onSubmit={handleSubmit}>
          <textarea placeholder='Post your reply' onChange={handleChange} value={text} className='w-11/12 bg-black text-xl'></textarea>
          <button type='submit' className='border text-custom-white border-custom-profile-bg bg-custom-blue text-lg px-4 py-2 rounded-3xl ml-auto block'>Save</button>
          </form>
      </div>
    </div>
  );
};
