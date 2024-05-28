import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { follower } from '@/interface/Followers';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';

export default function Card({ id, follow }: { id: string, follow: follower }) {
  const [URfollowing, setURfollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    console.log('follow.email', follow.email)
    const localUser = localStorage.getItem('User');
    if (localUser) {
      const parsedLocalUser = JSON.parse(localUser);
      if (parsedLocalUser.following && Array.isArray(parsedLocalUser.following) && parsedLocalUser.following.includes(follow.email)) {
        setURfollowing(true);
        setUser(parsedLocalUser);
      }
    }
  }, [follow.email, setUser]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleUnfollow = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log('UnFollow clicked');
  }, []);

  const handleFollow = useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      const token = localStorage.getItem("twitter_cloan_token");
      if (!token) {
        throw new Error("you need to login to proceed");
      }
      const response = await axios.post("http://localhost:8080/follow",
        { follower: user?.email, following: follow.email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      const { followers, following } = response.data;
      setUser((prevUser) => ({
        ...prevUser,
        following: following,
      }));

      localStorage.setItem('User', JSON.stringify({
        ...user,
        following: following,
      }));

      setURfollowing(true);
      console.log('response from /follow');
    } catch (err) {
      console.log(err);
    }
  }, [user, follow.email, setUser]);

  return (
    <>
     <div className='flex px-5'>
           <img className='w-14 mt-5 h-14 object-cover rounded-full' src={follow.profileImageURL} alt='' />
           <p className='mt-5 ml-5 text-xl text-custom-white font-bold hover:underline'>{follow.firstName}</p>
           </div>
           <div className='flex -mt-8 ml-16'>
           <p className='ml-8 text-xl text-custom-grey'>@{follow.email.split('@')[0]}</p>
           {
        follow.email !== user?.email && (
          URfollowing ? (
            <button 
              onClick={handleUnfollow} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
              className={`ml-auto mr-5 -mt-4 text-custom-grey border px-4 py-2 border-custom-profile-bg text-xl rounded-3xl ${isHovered ? 'bg-blackish-red' : ''}`}
            >
              {isHovered ? 'UnFollow' : 'Following'}
            </button>
          ) : (
            <button 
              onClick={handleFollow} 
              className='ml-auto mr-5 -mt-4 text-custom-grey border px-4 py-2 border-custom-profile-bg text-xl rounded-3xl bg-custom-white'
            >
              Follow
            </button>
          )
        )
      }
        
           </div>
           <p className='ml-24 text-xl text-custom-white mt-1 mr-5'>{follow.bio}</p>
           </>
  );
}
