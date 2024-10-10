"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialSignIn = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter();
    const [loading, setLoading] = useState(false); 



    const handleSocialSignIn = async(provider: string) => {
        setLoading(true); // Start loading
        try {
            await signIn(provider, { redirect: false });
        } finally {
            setLoading(false); // Stop loading once the sign-in process is done
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            const email = session.user?.email;
                axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${email}`)
                .then(res => {
                    const userRole = res.data.role;
                    if(userRole){
                        router.push("/");
                        Swal.fire({
                            title: 'Welcome to CraftyBay!',
                            text: 'You have successfully logged in. Enjoy exploring the world of crafts!',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            customClass: {
                                confirmButton: 'btn btn-primary rounded-sm text-white ', 
                              },
                          });
                    } else{
                        Swal.fire({
                            title: 'Select Your Role',
                            text: "Please choose whether you want to proceed as a seller or a buyer.",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Become a Seller',
                            cancelButtonText: 'Shop as a Buyer',
                            reverseButtons: true,
                            customClass: {
                                confirmButton: 'btn btn-primary rounded-sm text-white ',
                                cancelButton: 'btn btn-secondary rounded-sm text-white '
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Handle role selection as Seller
                                const selection = {
                                    email: session.user?.email,
                                    updatedData: { role: "seller" }
                                }
                                axios.put('http://localhost:3000/role/api/setRole', selection)
                                    .then( async () => {
                                        if(res.data){
                                            await update({
                                                ...session,
                                                user: {
                                                  ...session?.user,
                                                  role:"seller"
                                                },
                                              });
                                            router.push("/");
                                        }
                                    })
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                // Handle role selection as Buyer
                                const selection = {
                                    email: session.user?.email,
                                    updatedData: { role: "buyer" }
                                }
                                axios.put('http://localhost:3000/role/api/setRole', selection)
                                    .then( async () => {
                                        if(res.data){
                                            await update({
                                                ...session,
                                                user: {
                                                  ...session?.user,
                                                  role:"buyer"
                                                },
                                              });
                                            router.push("/");
                                        }
                                    })
                            }
                        });
                    }
                })
           
        }
    },[router,  status])

   
   

    return (
        <div className="flex justify-center">
            <button  disabled={loading} onClick={() => handleSocialSignIn("google")} className={`btn btn-outline rounded-3xl border-gray-400 ${loading ? 'opacity-50' : ''}`}>
                <FcGoogle className="text-2xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialSignIn;
