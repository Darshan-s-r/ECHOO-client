'use client';
import LeftSideBar from '@/components/LeftSideBar'
import React, { useEffect } from 'react'
import MiddlePart from './MiddlePart'

export default function page({params}:{params:{id:string}}) {

  return (
    <div className='flex overflow-hidden'>
  <LeftSideBar></LeftSideBar>
  <MiddlePart id={params.id}></MiddlePart>
  <div className=' flex-1 max-w-[530px] max-xl:hidden p-5'>
    
  </div>
</div>
  )
}

