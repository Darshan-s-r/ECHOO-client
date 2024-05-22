import React from 'react'
import WritePost from './WritePost'
import Posts from './Posts'

export default function MiddlePart() {
  return (
    <div className='flex-1 max-lg:min-w-[50%] border-x-2 border-slate-500 h-screen overflow-auto'>
   <WritePost></WritePost>
   <Posts></Posts>   
   <Posts></Posts>   
   <Posts></Posts>   
   <Posts></Posts>   
   <Posts></Posts>   
   <Posts></Posts>   
   <Posts></Posts>   
  </div>
  )
}
 