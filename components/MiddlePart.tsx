'use client';
import React, { useState, useEffect } from 'react';
import WritePost from './WritePost';
import Posts from './Posts';
import axios from 'axios';
import { Tweet } from '@/interface/Tweets';
import { useRouter } from 'next/navigation';

export default function MiddlePart() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem("twitter_cloan_token");
          if (!token) {
            router.push("/");
          }
          const response = await axios.get("http://localhost:8080/tweets", {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setTweets(response.data);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []); 

  return (
    <div className='flex-1 max-lg:min-w-[50%] border-x-2 border-custom-profile-bg h-screen overflow-y-scroll no-scrollbar'>
      <WritePost />
      {tweets.map((tweet: Tweet, index: number) => (
        <Posts key={index} Tweet={tweet} />
      ))}
    </div>
  );
}
