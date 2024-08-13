'use client';
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { follower } from '@/interface/Followers';
import { CiSearch } from "react-icons/ci";
import WhoTFcard from './WhoTFcard';
import { useRouter } from 'next/navigation';

export default function RightSide() {
  const router = useRouter();
  const [userToFollow, setUserToFollow] = useState<follower[]>([])
  const fetchWhoToFollow = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("twitter_cloan_token");
        if (!token) {
          router.push("/");
        }
        const response = await axios.get(`http://localhost:8080/who_to_follow`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
       
        setUserToFollow(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  useEffect(() => {
    fetchWhoToFollow();
  }, [fetchWhoToFollow]);

  return (
    <>
      <div className=' flex-1 max-w-[530px] max-xl:hidden p-5'>
        <div className='flex bg-custom-profile-bg  w-11/12 h-12 rounded-3xl text-lg ml-4'>
        <CiSearch className='text-2xl mt-3 ml-4 text-custom-grey'/>
        <input className='bg-custom-profile-bg text-custom-grey pl-3 ml-2' placeholder='Search'></input>
        </div>
        <div className='ml-4 mt-4 pb-4 mr-5 border border-custom-profile-bg rounded-3xl'>
          <p className='ml-4 mt-2 text-custom-white font-bold text-2xl'>Who to follow</p>
          {
      userToFollow?.map((follow, index)=>(
          <WhoTFcard follow={follow}></WhoTFcard>
      ))
      }
        </div>
    
     </div>
    </>
  )
}
