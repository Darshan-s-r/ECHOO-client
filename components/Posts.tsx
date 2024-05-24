import React from 'react'
import { TbBrandMessenger } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoStatsChartOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { RiShare2Fill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { Tweet } from '@/interface/Tweets';

interface PostsProps {
  tweet: Tweet;
}

// export default function Posts({tweet}) {
  const Posts: React.FC<PostsProps>  = ({tweet})=>{
  return (
    <div className='border-b-2 border-custom-profile-bg'>
        <div className='flex px-5'>
        <img className='w-14 mt-5 h-14 object-cover rounded-full' src={tweet.profileImageURL ? tweet.profileImageURL : ""} alt='profile image' />
          <p className='mt-5 ml-5 text-xl text-custom-white font-bold'>{tweet.firstName}</p>
          <p className='mt-5 ml-1 text-xl text-custom-grey'>@{tweet.email.split('@')[0]}</p>
          <p className='mt-5 ml-1 text-xl text-custom-grey'> . {tweet.postedAt.substring(0, 16)}</p>
          <BsThreeDots className='text-2xl text-custom-grey mt-5 ml-auto hover:bg-blue-300 hover:rounded-full'></BsThreeDots>
          </div>
        <div className='ml-24 mr-5'>
        <p className='text-xl text-custom-white'>{tweet.content}</p>

        <img className='w-full mt-5 h-full object-cover rounded-3xl' src={tweet.image ? tweet.image[0].myFile : ''} alt='post image' />

        <div className='flex justify-between mt-4'>
          <div className='flex text-2xl'>
            <TbBrandMessenger className='text-custom-grey hover:bg-blue-300 rounded-full'></TbBrandMessenger>
            <span className='text-custom-grey ml-3 text-xl'>74</span>
           
          </div>
          <div className='flex text-2xl text-custom-grey'>
            <BiRepost className=' hover:bg-blue-300 rounded-full'></BiRepost>
          <span className='ml-3 text-xl'>33</span>
          </div>
          <div className='flex text-2xl text-custom-grey'>
            <CiHeart className=' hover:bg-blue-300 rounded-full'></CiHeart>
                      <span className='ml-3 text-xl'>9</span>

          </div>
          <div className='flex text-2xl text-custom-grey'>
            <IoStatsChartOutline className=' hover:bg-blue-300 rounded-full'></IoStatsChartOutline>
                      <span className='ml-3 text-xl'>74</span>

          </div>
          <div className='flex text-2xl text-custom-grey'>
          <CiBookmark className=' hover:bg-blue-300 rounded-full'></CiBookmark>
          <RiShare2Fill className='ml-3 hover:bg-blue-300 rounded-full'></RiShare2Fill>

          </div>
        </div>
        </div>
        </div>
  )
}


export default Posts;