'use client';
import React, { useState, useEffect } from 'react';
import WritePost from './WritePost';
import Posts from './Posts';
import axios from 'axios';
import { Tweet } from '@/interface/Tweets';

export default function MiddlePart() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        if (typeof window !== 'undefined') {
          console.log("we are in client")
          const token = localStorage.getItem("twitter_cloan_token");
          if (!token) {
            console.log("token not found in local storage");
            throw new Error("You need to login to proceed");
          }
          const response = await axios.get("http://localhost:8080/tweets", {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log("responce for tweets",response)
          setTweets(response.data);
        }
        console.log("we are in server")
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
        <Posts key={index} tweet={tweet} />
      ))}
    </div>
  );
}
