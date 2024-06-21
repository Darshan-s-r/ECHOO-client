'use client';
import React, { useMemo } from 'react'
import { BsTwitterX } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { TiMessageTyping } from "react-icons/ti";
import { FaRegListAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { FaPenNib } from "react-icons/fa6";
import Link from 'next/link';

export default function LeftSideBar() {
    
  interface twitterSidebarIcons {
    title:string,
    icon:React.ReactNode,
    link:string,
  }

  const sidebarIcons:twitterSidebarIcons []= useMemo(()=> [
    {
      title:"",
      icon: <BsTwitterX></BsTwitterX>,
      link: '/home',
    },
    {
      title:"Home",
      icon: <FaHome></FaHome>,
      link: '/home',
    },
    // {
    //   title:"Explore",
    //   icon: <FiSearch></FiSearch>,
    //   link: '/',
    // },
    // {
    //   title:"Notifications",
    //   icon: <IoIosNotificationsOutline></IoIosNotificationsOutline>,
    //   link: '/',
    // },
    {
      title:"Messages",
      icon: <FiMessageSquare></FiMessageSquare>,
      link: '/messages',
    },
    // {
    //   title:"Grok",
    //   icon: <TiMessageTyping></TiMessageTyping>,
    //   link: '/',
    // },
    // {
    //   title:"Lists",
    //   icon: <FaRegListAlt></FaRegListAlt>,
    //   link: '/',
    // },
    {
      title:"Profile",
      icon: <CgProfile></CgProfile>,
      link: 'darshanrangegowda19@gmail.com',
    },
    {
      title:"More",
      icon: <CgMoreO></CgMoreO>,
      link: '/',
    },
  ],[]);  

  return (
    <div className='flex-1 max-w-[450px] max-2xl:max-w-[90px]'>
      <div className='flex'>
        <div className='hidden 2xl:block min-w-36'></div>
        <div className="text-2xl  flex flex-col h-screen ">
      <div>
        {sidebarIcons.map((item, index) =>(
          <p key={index}>
            <Link className='flex justify-start items-center mx-7 mt-5 hover:bg-custom-profile-bg rounded' href={item.link}>
              <span className=''>{item.icon}</span>
            <samp className='text-custom-white hidden 2xl:block hover:bg-custom-profile-bg rounded-full pl-5'>{item.title}</samp>
            </Link>
            
            
          </p>
        ))}
        <div className='flex ml-7 mt-5 '>
        <FaPenNib className='mt-4 mr-5'></FaPenNib>
        <button className="hidden 2xl:block bg-blue-500 text-2xl px-8 py-4 rounded-full"> Post</button>

        </div>
      </div>
</div>
      </div>
   
  </div>
  )
}
