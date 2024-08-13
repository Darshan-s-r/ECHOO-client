'use client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GoogleSignInButton() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const handleLoginWithUser = useCallback(async (credentialResponse: CredentialResponse) => {
    try {
  
      if (!credentialResponse || !credentialResponse.credential) {
        console.error("Invalid credential response", credentialResponse);
        return;
      }
  
      const response = await axios.post("http://localhost:8080/", {
        token: credentialResponse.credential
      });
      const token = response.data.token;
      const User = response.data.user;
      setUser(User);
 
      console.log("Response from server:", token , User);
      localStorage.setItem("twitter_cloan_token", token);
      localStorage.setItem('User', JSON.stringify(User));
      router.push("/home");
    } catch (err) {
      console.error("Error from the server:", err);
      toast.error("Failed to log in. Please try again.")
    }
  }, []);

  return (

  <div className='mt-96 ml-16'>
    <h1 className='text-2xl pb-4'>LogIn to echo</h1>
    <GoogleLogin onSuccess={handleLoginWithUser} />
     <p>{user?.email}</p>
  </div>

  )
}
   