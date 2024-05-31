'use client';
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react' 
import { FaArrowLeft } from "react-icons/fa";
import Card from '../../../components/Card';
import axios from 'axios';
import { follower } from '@/interface/Followers';
import { useUserContext } from '@/context/UserContext';

interface HisDetail {
  firstName: string;
  email: string;
}

export default function MiddlePart({ id }: { id: string }) {
  const [followers, setFollowers] = useState<follower[]>([]);
  const [hisDetail, setHisDetail] = useState<HisDetail | null>(null);
  const { user, setUser } = useUserContext();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const fetchFollowers = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        console.log("we are in client");
        const token = localStorage.getItem("twitter_cloan_token");
        if (!token) {
          console.log("token not found in local storage");
          throw new Error("You need to login to proceed");
        }
        const response = await axios.get(`http://localhost:8080/followers_you_know/users?id1=${user?.email}&id2=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data.message === "user not found") {
          setUserNotFound(true);
          return;
        }
        setFollowers(response.data?.followersDetails);
        setHisDetail(response.data?.hisDetail);
        
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [id]);

  useEffect(() => {
    const localUser = localStorage.getItem('User');
    if (localUser) {
      const parsedLocalUser = JSON.parse(localUser);
      setUser(parsedLocalUser);
    }
  }, [setUser]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  if (userNotFound) {
    return (
      <div className='font-bold text-2xl text-custom-white'>User not found</div>
    );
  }


  return (
    <div className='relative flex-1 max-lg:min-w-[50%] border-x-2 border-custom-profile-bg h-screen overflow-y-scroll no-scrollbar'>
      <div className='sticky top-0 left-0 right-0 bg-black border-b border-custom-profile-bg'>
        <div className='flex'>
          <Link className='text-xl mx-6 mt-6' href={'/home'}>
            <span><FaArrowLeft /></span>
          </Link>
          <div>
            <p className='ml-8 mt-1 text-2xl font-bold text-custom-white'>{hisDetail?.firstName}</p>
            <p className='ml-8 mt-0 text-lg text-custom-grey'>
              @{hisDetail?.email ? hisDetail.email.split('@')[0] : ''}
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-between mx-20 text-xl text-custom-grey font-semibold my-5'>
        <Link href={`/${hisDetail?.email}/verified_followers`}><p className='active:underline hover:underline'>Verified Followers</p></Link>
       {
        hisDetail?.email !== user?.email && <Link href={`/${hisDetail?.email}/followers_you_know`}><p className='font bold text-custom-white'>Followers you know</p></Link>
       }
        <Link href={`/${hisDetail?.email}/followers`}><p className='active:underline hover:underline'>Followers</p></Link>
        <Link href={`/${hisDetail?.email}/following`}><p className='active:underline hover:underline'>Following</p></Link>
        </div>
      </div>
      {followers?.map((follow, index) => (
        <Card key={index} follow={follow} />
      ))}
    </div>
  );
}
