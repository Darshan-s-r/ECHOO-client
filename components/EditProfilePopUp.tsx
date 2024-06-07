import React, { useState } from 'react';
import { SlPicture } from 'react-icons/sl';

interface EditProfilePopupProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}
interface FileState {
  myFile: string | null;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ isOpen, onClose }) => {
  const [coverImage, setCoverImage] = useState<FileState>({myFile:""})
  const [image, setImage] = useState<FileState>({myFile:""})

  const handleCoverFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const base64 = await convertToBase64(file) as string;
      if(base64){
        setCoverImage({myFile:base64});
  
      }
    }
   
  };
  const handleFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const base64 = await convertToBase64(file) as string;
      if(base64){
        setImage({myFile:base64});
  
      }
    }
   
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => onClose(e as any)}>
      <div className="bg-black rounded-lg shadow-lg w-[800px] relative mx-10" onClick={(e) => e.stopPropagation()}>
        <div className='mx-4 mb-5'>
        <button className="text-4xl text-custom-white inline-block hover:text-custom-red" onClick={onClose}>x</button>
        <h2 className="text-2xl text-custom-white ml-14 inline-block">Edit Profile</h2>
        <button className='border text-custom-profile-bg border-custom-profile-bg bg-custom-white text-lg px-4 py-2 rounded-3xl ml-auto -mt-8 block hover:bg-custom-btn-hvr'>Save</button>
        </div>
        <img className='w-full h-[275px]' src={coverImage?.myFile ? coverImage.myFile : ''} alt=''></img>
        <label htmlFor="cover-image-upload" className='flex ml-4 mt-4'>
          <span className='text-2xl mr-96 -mt-[150px] '><SlPicture /></span>
        </label>
        <input className='hidden'
        type="file"  
        name="myFile"
        id="cover-image-upload"
        accept='.jpeg, .png, .jpg'
        onChange={handleCoverFileUpload}
        />
          <img className='w-44 h-44 rounded-full -mt-24 mr-5' src={image?.myFile ? image.myFile : ''} alt=''></img>
        <label htmlFor="image-upload" className='flex ml-4 mt-4'>
          <span className='text-2xl mr-24 -mt-24 '><SlPicture /></span>
        </label>
        <input className='hidden'
        type="file"  
        name="myFile"
        id="image-upload"
        accept='.jpeg, .png, .jpg'
        onChange={handleFileUpload}
        />
        <form>
          <div className="mb-4 ">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;

function convertToBase64(file:File){
  return new Promise((resolve, rejects)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) =>{
      rejects(error)
    }
  })
}