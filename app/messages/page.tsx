import LeftSideBar from '@/components/LeftSideBar'
import React from 'react'
import Middle from './Middle'
import Last from './Last'

export default function page() {
  return (
    <div className='flex '>
    <LeftSideBar></LeftSideBar>
    <Middle />
    <Last></Last>
    </div>
  )
}
