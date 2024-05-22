import React from 'react'
import { TbBrandMessenger } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoStatsChartOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { RiShare2Fill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

export default function Posts() {
  return (
    <div className='border-b-2 border-slate-500'>
        <div className='flex px-5'>
        <img className='w-14 mt-5 h-14 object-cover rounded-full' src='https://pbs.twimg.com/profile_images/1761058966292119552/aqGsGdNE_400x400.jpg' alt='profile image' />
          <p className='mt-5 ml-5 text-2xl'>Darshan</p>
          <p className='mt-5 ml-1 text-2xl'>@Darshan2002</p>
          <BsThreeDots className='text-3xl mt-5 ml-auto hover:bg-blue-300 hover:rounded-full'></BsThreeDots>
          </div>
        <div className='ml-24 mr-5'>
        <p className='text-2xl pt'>content  in the new line</p>
        <div className='flex justify-between mt-4'>
          <div className='flex text-2xl'>
            <TbBrandMessenger className=' hover:bg-blue-300 rounded-full'></TbBrandMessenger>
            <span className='ml-3 text-xl'>74</span>
           
          </div>
          <div className='flex text-2xl'>
            <BiRepost className=' hover:bg-blue-300 rounded-full'></BiRepost>
          <span className='ml-3 text-xl'>33</span>
          </div>
          <div className='flex text-2xl'>
            <CiHeart className=' hover:bg-blue-300 rounded-full'></CiHeart>
                      <span className='ml-3 text-xl'>9</span>

          </div>
          <div className='flex text-2xl'>
            <IoStatsChartOutline className=' hover:bg-blue-300 rounded-full'></IoStatsChartOutline>
                      <span className='ml-3 text-xl'>74</span>

          </div>
          <div className='flex text-2xl'>
          <CiBookmark className=' hover:bg-blue-300 rounded-full'></CiBookmark>
          <RiShare2Fill className='ml-3 hover:bg-blue-300 rounded-full'></RiShare2Fill>

          </div>
        </div>
        </div>
        </div>
  )
}
