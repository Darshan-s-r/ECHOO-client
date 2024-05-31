'use client';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ProfileUser } from '@/interface/User';
import Link from 'next/link';
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import Posts from '@/components/Posts';
import { useUserContext } from '@/context/UserContext';
import { IoLocationOutline } from "react-icons/io5";
import { TiAttachmentOutline } from "react-icons/ti";

interface profileMenu {
  title: string,
  link: string,
}

export default function MiddlePart({ id }: { id: string }) {
  const { user, setUser } = useUserContext();
  const [profileUser, setProfileUser] = useState<ProfileUser>();
  const [hisProfile, setHisProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        console.log("we are in client");
        const token = localStorage.getItem("twitter_cloan_token");
        if (!token) {
          console.log("token not found in local storage");
          throw new Error("You need to login to proceed");
        }
        const response = await axios.get(`http://localhost:8080/user?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data.message === "user not found") {
          setUserNotFound(true);
          return;
        }

        console.log("response /user", response);
        setProfileUser(response.data);

        const localuser = localStorage.getItem('User');
        if (localuser) {
          const parsedUser = JSON.parse(localuser);
          setUser(parsedUser);

          if (parsedUser.email === response.data.email) {
            setHisProfile(true);
          }
          if (parsedUser.following.includes(response.data.email)) {
            setIsFollowing(true);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [id, setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function handleEditProfile(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log('editProfile clicked');
  }

  function handleUnfollow(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log('UnFollow clicked');
  }

  const handleFollow = useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      const token = localStorage.getItem("twitter_cloan_token");
      if (!token) {
        throw new Error("you need to login to proceed");
      }
      const response = await axios.post("http://localhost:8080/follow",
        { follower: user?.email, following: profileUser?.email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data.message === "user not found") {
          setUserNotFound(true);
          return;
        }
      const { followers, following } = response.data;
      setUser((prevUser) => ({
        ...prevUser,
        following: followers,
      }));

      localStorage.setItem('User', JSON.stringify({
        ...user,
        following: followers,
      }));

      setProfileUser((prevProfileUser) => ({
        ...prevProfileUser,
        followers : following,
      }));
      setIsFollowing(true);
      console.log('response from /follow');
    } catch (err) {
      console.log(err);
    }
  }, [user, profileUser, setUser]);

  const profileMenu: profileMenu[] = useMemo(() => [
    { title: "Posts", link: `http://localhost:3000/${profileUser?.email}` },
    { title: "Replies", link: `http://localhost:3000/${profileUser?.email}` },
    { title: "Highlights", link: `http://localhost:3000/${profileUser?.email}` },
    { title: "Articles", link: `http://localhost:3000/${profileUser?.email}` },
    { title: "Media", link: `http://localhost:3000/${profileUser?.email}` },
    { title: "Likes", link: `http://localhost:3000/${profileUser?.email}` }
  ], [profileUser?.email]);

  if (userNotFound) {
    return (
      <div className='font-bold text-2xl text-custom-white'>User not found</div>
    );
  }
     return (<>
        <div className='relative flex-1 max-lg:min-w-[50%] border-x-2 border-custom-profile-bg h-screen overflow-y-scroll no-scrollbar'>
      <div className='sticky top-0 left-0 right-0 bg-black'>
        <div className='flex'>
          <Link className=' text-xl mx-6 mt-6' href={'/home'}>
            <span><FaArrowLeft /></span>
          </Link>
          <p className='ml-8 mt-1 text-2xl font-bold text-custom-white'>{profileUser?.firstName}</p>
        </div>
        <p className='ml-24 pl-1 -mt-2 mb-2 text-custom-grey'>{profileUser?.posts?.length} posts</p>
      </div>
      <img className='h-64 w-full object-cover bg-custom-profile-bg' src={profileUser?.coverPhoto} alt=''></img>
      <img className='object-cover bg-custom-profile-bg border-black border-4 rounded-full h-48 w-48 ml-5 -mt-24' src={profileUser?.profileImageURL}></img>
      <div className='flex flex-row justify-end'>
        {
          hisProfile ? <button onClick={handleEditProfile} className='border border-custom-profile-bg font-bold text-xl px-4 py-2 rounded-3xl'>Edit profile</button> : (
            isFollowing ? <button onClick={handleUnfollow} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`border border-custom-profile-bg font-bold text-xl px-4 py-2 rounded-3xl ${isHovered ? 'bg-blackish-red' : ''}`}>{isHovered ? 'unFollow' : 'Following'}</button> :
              <button onClick={handleFollow}
                className='border text-custom-profile-bg border-custom-profile-bg bg-custom-white text-lg px-4 py-2 rounded-3xl'>Follow</button>)
        }
      </div>
      <p className='ml-4 text-2xl font-bold text-custom-white'>{profileUser?.firstName}</p>
      <p className='ml-4 text-xl text-custom-grey'>@{profileUser?.email?.split('@')[0]}</p>
      <p className='ml-4 text-xl font-bold text-custom-white'>{profileUser?.bio}</p>
      <div className='flex flex-row mt-4'>
        {profileUser?.location && <><IoLocationOutline className='ml-4 mt-2 text-xl text-custom-grey' /><p className='ml-2 text-xl text-custom-grey'>{profileUser?.location}</p></>}
        {profileUser?.website && <><TiAttachmentOutline className='ml-4 mt-2 text-xl text-custom-grey' /><p className='ml-2 text-xl text-custom-grey'>{profileUser?.website}</p></>}
        <FaRegCalendarAlt className='ml-4 mt-2 text-xl text-custom-grey' />
        <p className='ml-2 text-xl text-custom-grey'>joined {profileUser?.createdAt?.split('T')[0]}</p>
      </div>
      <div className='flex flex-row mt-3'>
        <Link className='hover:underline' href={`http://localhost:3000/${profileUser?.email}/following`}>
          <span className='ml-4 text-lg text-custom-white font-bold'>{profileUser?.following?.length}</span><span className='text-lg text-custom-grey'> Following</span>
        </Link>
        <Link className='hover:underline' href={`http://localhost:3000/${profileUser?.email}/followers`}>
          <span className='ml-4 text-lg text-custom-white font-bold'>{profileUser?.followers?.length}</span><span className='text-lg text-custom-grey'> Followers</span>
        </Link>
      </div>
      <div className='border-b-2 border-custom-profile-bg'>
        <ul className='flex flex-row justify-between mx-8 mt-10 mb-5'>
          {profileMenu.map((menu, index) => (
            <li key={index}>
              <Link className='text-xl font-semibold text-custom-grey active:underline  hover:underline' href={menu.link}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
          {profileUser?.posts?.map((tweet) => (
            <Posts tweet={tweet} key={tweet.postId}></Posts>
          ))}
        </div>
        </>)
      
    }
    
      
    