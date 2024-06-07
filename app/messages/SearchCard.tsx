import axios from 'axios';
import React from 'react';

interface SearchResult {
  email: string;
  firstName: string;
  profileImageURL: string;
}

interface SeachCardProps {
  user: SearchResult;
  helper: (user: SearchResult) => void;
  receiver: SearchResult[];
}

export default function SeachCard({ user, helper, receiver }: SeachCardProps) {
  async function handleOnClick() {
    console.log('on click visited from /searchCard');
    try {
      const token = localStorage.getItem("twitter_cloan_token");
      if (!token) {
        throw new Error("You need to log in to proceed");
      }

      const response = await axios.post(
        "http://localhost:8080/messages/addUser",
        { receiverEmail: user.email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const responseUser: SearchResult = response.data;
      const isAlreadyReceiver = receiver.some(r => r.email === responseUser.email);

      if (!isAlreadyReceiver) {
        helper(responseUser);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='hover:bg-custom-hover' onClick={handleOnClick}>
      <div className='flex px-5'>
        <img
          className='w-14 mt-5 h-14 object-cover rounded-full'
          src={user?.profileImageURL || ''}
          alt=''
        />
        <p className='mt-5 ml-5 text-lg text-custom-white font-bold'>{user?.firstName}</p>
      </div>
      <p className='ml-24 -mt-6 text-lg text-custom-grey'>{user?.email}</p>
    </div>
  );
}
