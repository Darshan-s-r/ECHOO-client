'use client';
import React, {useMemo, useState, useEffect} from 'react'
import axios from 'axios'
import {ProfileUser} from '@/interface/User'
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import Posts from '@/components/Posts';

interface profileMenu {
  title: string,
  link: string,
}
export default function MiddlePart({id}:{id:string}) {
  const [user, setUser] = useState<ProfileUser>();

  ////////////////////user profile menu//
  const profileMenu : profileMenu[] = useMemo(() => [
    {
      title: "Posts",
        link: `http://localhost:3000/${user?.email}`,
    },
    {
      title: "Replies",
        link: `http://localhost:3000/${user?.email}`,
    },
    {
      title: "Highlights",
        link: `http://localhost:3000/${user?.email}`,
    },
    {
      title: "Articles",
        link: `http://localhost:3000/${user?.email}`,
    },
    {
      title: "Media",
        link: `http://localhost:3000/${user?.email}`,
    },
    {
      title: "Likes",
        link: `http://localhost:3000/${user?.email}`,
    }
  
  ], []);  

  /////////////////////
    useEffect(()=>{
      const fetchUser = async()=>{
        try {
          if (typeof window !== 'undefined') {
            console.log("we are in client")
            const token = localStorage.getItem("twitter_cloan_token");
            if (!token) {
              console.log("token not found in local storage");
              throw new Error("You need to login to proceed");
            }
            const response = await axios.get(`http://localhost:8080/user?id=${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            console.log("responce /user",response)
            setUser(response.data);
          }
          console.log("we are in server")
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      }
      fetchUser();
      
    },[])
  return (
    <div className='relative flex-1 max-lg:min-w-[50%] border-x-2 border-custom-profile-bg h-screen overflow-y-scroll no-scrollbar'>
  <div className='sticky top-0 left-0 right-0 bg-black'>
  <div className='flex'>
      <Link className=' text-xl mx-6 mt-6' href={'/home'}>
        <span><FaArrowLeft /></span>
      </Link>
      <p className='ml-8 mt-1 text-2xl font-bold text-custom-white'>Darshan s r</p>
    </div>
    <p className='ml-24 pl-1 -mt-2 mb-2 text-custom-grey'>15 posts</p>
  </div>
  <div className='h-64 w-full bg-custom-profile-bg'>
  <img className='h-64 w-full' src='/IMG20231228165231.jpg' alt='profile background img'></img>
  </div>
  <img className='object-cover bg-custom-profile-bg border-black border-2 rounded-full h-48 w-48 ml-5 -mt-24' src='/darshan.jpg'></img>
   <div className='flex flex-row justify-end'>
   <button className='border border-custom-profile-bg font-bold text-xl px-4 py-2 rounded-3xl'>Edit profile</button>
   </div>
    
    <p className='ml-4 text-2xl font-bold text-custom-white'>Darshan S R</p>
    <p className='ml-4 text-xl text-custom-grey'>@darshanrangegowda19</p>
    <div className='flex flex-row mt-4'>
    <FaRegCalendarAlt className='ml-4 mt-2 text-xl text-custom-grey'></FaRegCalendarAlt>
    <p className='ml-2 text-xl text-custom-grey'>joined january 2024</p>
    </div>
    <div className='flex flex-row mt-3'>
    <Link className='hover:underline' href={`http://localhost:3000/${user?.email}/following`}><span className='ml-4 text-lg text-custom-white font-bold'>38</span><span className='text-lg text-custom-grey'>Following</span> </Link>
    <Link className='hover:underline' href={`http://localhost:3000/${user?.email}/followers`}><span className='ml-4 text-lg text-custom-white font-bold'>2</span><span className='text-lg text-custom-grey'>Followers</span></Link>
    </div>
    <div className='border-b-2 border-custom-profile-bg'>
    <ul className='flex flex-row justify-between mx-8 mt-10 mb-5'>
      {profileMenu.map((menu, index)=>(
        <li key={index}>  
          <Link className='text-xl font-semibold text-custom-grey active:underline  hover:underline' href={menu.link}>{menu.title}</Link>
          </li>
      ))}
    </ul>
    </div>
    {
      user?.posts.map((tweet)=>(
        <Posts tweet={tweet} key={tweet.postId}></Posts>
      )

      )
    }
    
    </div>

  )
}
