import React from 'react'
interface searchResult{
  email:string,
  firstName:string,
  profileImageURL:string
}
export default function UserMSGCard({receiver}:{receiver : searchResult}) {
  return (
    <div className='hover:bg-custom-hover'>
    <div className='flex px-5 '>
           <img className='w-14 mt-5 h-14 object-cover rounded-full' src={receiver.profileImageURL} alt='' />
           <p className='mt-5 ml-5 text-lg text-custom-white font-bold'>{receiver.firstName}</p>
           <p className='mt-5 ml-2 text-lg text-custom-grey'>@{receiver.email.split('@')[0]}</p>
           <p className='mt-5 ml-2 text-lg text-custom-grey'>. 24m</p>
           </div>
           <p className='ml-24 -mt-6 text-lg text-custom-grey'>sisya whats app</p>  
    </div>
  )
}
