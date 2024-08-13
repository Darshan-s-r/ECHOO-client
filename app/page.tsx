import Image from "next/image";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Home() {
  return (
   <div className="">
    <div className="w-96 h-96 mx-auto">
    <GoogleSignInButton></GoogleSignInButton>
    </div>
    
   </div>
  );
}
