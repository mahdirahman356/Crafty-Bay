"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // For navigation and checking the current path
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialSignIn = () => {
    const session = useSession();
    const router = useRouter();
    

    const handleSocialSignIn = (provider: string) => {
        const res =  signIn(provider, {redirect: true});
        console.log(res);
    };
   useEffect(() => {
    if (session.status === "authenticated") {
        router.push("/"); 
        Swal.fire({
            title: 'Welcome to CraftyBay!',
            text: 'You have successfully logged in. Enjoy exploring the world of crafts!',
            icon: 'success',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'btn btn-primary rounded-sm text-white ', 
                cancelButton: 'btn btn-secondary' 
              }
          });
    }
   },[router, session.status])

    return (
        <div className="flex justify-center">
            <button onClick={() => handleSocialSignIn("google")} className="btn btn-outline rounded-3xl border-gray-400">
                <FcGoogle className="text-2xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialSignIn;
