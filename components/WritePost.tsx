import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

export default function WritePost() {
  return (
    <div className=''>
      <div className='flex border-b-2 border-slate-500'>
        <button className='text-2xl flex-1 hover:bg-slate-400'>Foryou</button>
        <button className='text-2xl flex-1 hover:bg-slate-400'>Following</button>
        <button className='text-2xl p-5 hover:bg-slate-400'><IoSettingsOutline></IoSettingsOutline></button>
      </div>
      {/* --------------------------------- */}
      <div className='flex p-y-10 px-5 border-b-2 border-slate-500'>
        <img className='w-14 mt-5 h-14 object-cover rounded-full' src='https://pbs.twimg.com/profile_images/1761058966292119552/aqGsGdNE_400x400.jpg' alt='profile image' />
        <textarea
          typeof='text'
          placeholder='What is happening?'
          maxLength={280}
          className='border-none border-0 text-3xl pl-5 pt-5 bg-black  w-full'
        />
      </div>
    </div>
  )
}
