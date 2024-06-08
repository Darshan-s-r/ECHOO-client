'use client';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import UserMSGCard from './UserMSGCard'
import axios from 'axios';
import SearchCard from './SearchCard';

interface searchResult{
  email:string,
  firstName:string,
  profileImageURL:string
}

export default function Middle() {
  const[input, setInput] = useState('');
  const[searchActive, setSearchActive] = useState(false);
  const[searchResult, setSearchResult] = useState<searchResult[]>([]);
  const [receivers, setReceivers] = useState<searchResult[]>([]);

async function fetchReceivers(){
    try{
      const token = localStorage.getItem("twitter_cloan_token");
      if(!token){
        throw new Error("you need to login to proced")
      }
      const responce = await axios.get('http://localhost:8080/messages',
      {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        } 
  });
  setReceivers(responce.data);
  console.log("reponce from receivvers array",responce.data);
  }catch(err){
    console.log(err)
  }
  }

  useEffect(()=>{
    fetchReceivers();
  },[])

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    setSearchActive(true)
    const newValue = event.target.value;
    setInput(newValue);
    if (newValue.trim() === '') {
      setSearchActive(false);
      setSearchResult([]);
      return;
    }
    try{
      const token = localStorage.getItem("twitter_cloan_token");
      if(!token){
        throw new Error("you need to login to proced")
      }
      const responce = await axios.get(`http://localhost:8080/searchUser/user?string=${newValue}`,
      {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        } 
  });
  setSearchResult(responce.data);
  console.log("responce for post tweet",responce);
  }catch(err){
    console.log(err)
  }
    }
    function handleInputBlur(): void {
      setTimeout(() => {
        setSearchActive(false);
        setInput('');
        setSearchResult([]);
      }, 1000);
    }

    function updateSearchReceiver(user: any){
      const temp = receivers;
      temp.unshift(user);
      setReceivers(temp);
    }

  return (
    <div className='flex-1 max-lg:hidden border-x-2 border-custom-profile-bg h-screen overflow-y-scroll no-scrollbar'>
      <div className='sticky top-0 left-0 right-0 bg-black'>
      <p className='ml-4 mt-5 mb-8 text-custom-white font-bold text-2xl'>Messages</p>
        <div className='flex border border-custom-profile-bg bg-black  w-11/12 h-12 rounded-3xl text-lg ml-4 mb-3'>
        <CiSearch className='text-2xl mt-3 ml-4 text-custom-grey'/>
        <input className='bg-black text-custom-grey pl-3 ml-2 w-full rounded-3xl' placeholder='Search'
        value={input}
        onChange={handleOnChange}
        onBlur={handleInputBlur}
        onClick={()=>setSearchActive(true)}></input>
        <button className="text-xl text-custom-white pl-4 mr-5 hover:text-custom-red" onClick={(e)=>{e.preventDefault(); setInput(''); setSearchActive(false); setSearchResult([]);}}>x</button>

        </div>
       </div>
        
        {
          !searchActive ? 
          (receivers.map((receiver)=>(
            <UserMSGCard receiver={receiver} />
          ))) 
          : (
              searchResult.map((user)=>(
                <SearchCard user={user} helper={updateSearchReceiver} receiver={receivers} />
              ))
          )
        }
        
    </div>
  )
}
