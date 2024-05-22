'use client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import axios from 'axios';
export default function GoogleSignInButton() {
  const handleLoginWithUser = useCallback(async (credentialResponse: CredentialResponse) => {
    try {
      alert("Clicked sign-in with Google");
      console.log("This is credentials:", credentialResponse);
  
      if (!credentialResponse || !credentialResponse.credential) {
        console.error("Invalid credential response", credentialResponse);
        return;
      }
  
      const response = await axios.post("http://localhost:8080/", {
        token: credentialResponse.credential
      });
      const token = response.data.token;
      const user = response.data.user;
      console.log("Response from server:", token , user);
      localStorage.setItem("twitter_cloan_token", token);
    } catch (err) {
      console.error("Error from the server:", err);
      alert("Failed to log in. Please try again.");
    }
  }, []);

  return (

  <div className='p-5  rounded-lg bg-slate-600'>
    <h1 className='text-2xl'>New to twitter</h1>
    <GoogleLogin onSuccess={handleLoginWithUser} />
     
  </div>

  )
}
   