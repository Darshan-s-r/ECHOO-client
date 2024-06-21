import React, { useEffect, useState } from 'react'
import { TbBrandMessenger } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoStatsChartOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { RiShare2Fill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { Tweet } from '@/interface/Tweets';
import Link from 'next/link';
import AddComments from './AddComments';
import axios from 'axios';

interface PostsProps {
  Tweet: Tweet;
}

  const Posts: React.FC<PostsProps>  = ({Tweet})=>{
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tweet, setTweet] = useState<Tweet>(Tweet)

    const openPopup = () => setIsPopupOpen(true);

    const closePopup: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      setIsPopupOpen(false);
    };

    useEffect(() => {
      const incrementView = async () => {
        try {
          const token = localStorage.getItem("twitter_cloan_token");
          if (!token) {
            throw new Error("You need to login to proceed");
          }
          const response = await axios.post(
            "http://localhost:8080/view",
            { id: tweet.postId },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.status === 200) {
            setTweet(prevTweet => ({
              ...prevTweet,
              views: prevTweet.views + 1
            }));
          } else {
            throw new Error('Failed to increment views');
          }
        } catch (err) {
          console.error('Error incrementing view:', err);
          alert('Failed to view post');
        }
      };
  
      incrementView();
    }, [tweet.postId]); 

    async function handleLike(event: { preventDefault: () => void }): Promise<void> {
      event.preventDefault();
  
      try {
        const token = localStorage.getItem("twitter_cloan_token");
        if (!token) {
          throw new Error("You need to login to proceed");
        }

        const response = await axios.post(
          "http://localhost:8080/like",
          { id: tweet.postId },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          setTweet(prevTweet => ({
            ...prevTweet,
            likes: prevTweet.likes + 1 // Increment likes count
          }));
          alert('You liked a post');
        } else {
          throw new Error('Failed to like post');
        }
      } catch (err) {
        console.error('Error liking post:', err);
        alert('Failed to like post');
      }
    }

  return (
    <div className='border-b-2 border-custom-profile-bg'>
        <div className='flex px-5'>
          <Link className='flex' href={`/${tweet.email}`}>
          <img className='w-14 mt-5 h-14 object-cover rounded-full' src={tweet.profileImageURL ? tweet.profileImageURL : ""} alt='' />
          <p className='mt-5 ml-5 text-xl text-custom-white font-bold hover:underline'>{tweet.firstName}</p>
          <p className='mt-5 ml-1 text-xl text-custom-grey'>@{tweet.email.split('@')[0]}</p>
          </Link>
          <p className='mt-5 ml-1 text-xl text-custom-grey'> . {tweet.postedAt.substring(0, 16).replace('T', ' ')}</p>
          <BsThreeDots className='text-2xl text-custom-grey mt-5 ml-auto hover:bg-blue-300 hover:rounded-full'></BsThreeDots>
          </div>
        <div className='ml-24 mr-5'>
        <Link href={`/${tweet.email}/${tweet.postId}`}>
        <p className='text-xl text-custom-white'>{tweet.content}</p>
        {
          tweet.image[0].myFile ? <img className='w-full mt-5 h-full object-cover rounded-3xl' src={tweet.image ? tweet.image[0].myFile : ''} alt='' /> : <></>

        }

        </Link>
        
        <div className='flex justify-between mt-4'>
          <div className='flex text-2xl'>
            <TbBrandMessenger onClick={openPopup} className='text-custom-grey hover:bg-blue-300 rounded-full'></TbBrandMessenger>
            <span className='text-custom-grey ml-3 text-xl'>{tweet.comments}</span>
           
          </div>
          {/* <div className='flex text-2xl text-custom-grey'>
            <BiRepost className=' hover:bg-blue-300 rounded-full'></BiRepost>
          <span className='ml-3 text-xl'>33</span>
          </div> */}
          <button onClick={handleLike} className='flex text-2xl text-custom-grey'>
            <CiHeart className=' hover:bg-blue-300 rounded-full'></CiHeart>
                      <span className='ml-3 text-xl'>{tweet.likes}</span>

          </button>
          <div className='flex text-2xl text-custom-grey'>
            <IoStatsChartOutline className=' hover:bg-blue-300 rounded-full'></IoStatsChartOutline>
                      <span className='ml-3 text-xl'>{tweet.views}</span>

          </div>
          <div className='flex text-2xl text-custom-grey'>
          <CiBookmark className=' hover:bg-blue-300 rounded-full'></CiBookmark>
          <RiShare2Fill className='ml-3 hover:bg-blue-300 rounded-full'></RiShare2Fill>

          </div>
        </div>
        <AddComments isOpen={isPopupOpen} setTweet={setTweet} postId={tweet.postId} onClose={closePopup}></AddComments>

        </div>
        </div>
  )
}


export default Posts;