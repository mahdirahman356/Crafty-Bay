/* eslint-disable react/no-string-refs */
/* eslint-disable @next/next/no-img-element */

import { Key } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useCartData from "../../Hooks/useCartData";
import PostDetails from "../PostDetails/PostDetails";

type Crafts = {
    _id: string,
    email: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        craftName: string;
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

type AllCraftsProps = {
    crafts: Crafts[];
};

const AllCrafts = ({ crafts }: AllCraftsProps) => {

    console.log(crafts)

    const { data: session } = useSession()
    const [, refetch] = useCartData()

    const handleAddToCart = async (orderId: string, craftName: string, craftImage: string, price: string, location: string, sellerEmail: string, sellerName: string, sellerImage: string) => {
        if(!session?.user?.email){
            Swal.fire({
                title: "You are not logged in!",
                text: "Please log in to continue.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                customClass: {
                    confirmButton: 'btn btn-primary rounded-sm text-white ',
                    cancelButton: 'btn btn-secondary rounded-sm text-white '
                },
            }).then((result) => {
                if (result.isConfirmed) {
                     window.location.href = "/login"
                }
            });
        }else if (session.user.email){
        const order = {
            userEmail: session?.user?.email,
            sellerData: {
                email: sellerEmail,
                name: sellerName,
                image: sellerImage
            },
            orderData: {
                orderId: orderId,
                craftName: craftName,
                craftImage: craftImage,
                price: price,
                quantity: 1,
                location: location
            },
            date: new Date()
        }
        console.log(order)
        try {

            const res = await axios.post("http://localhost:3000/crafts/api/addToCart", order)
            console.log(res.data)
            if (res.data.acknowledged === true) {
                Swal.fire({
                    text: `${craftName} added to your cart`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    customClass: {
                        confirmButton: 'btn btn-primary rounded-sm text-white ',
                    },
                });
                refetch()
            }


        } catch (error) {
            console.log(error)
        }
       }
    }

    return (
        <div>
            <div className="w-[95%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {crafts.map((crafts: Crafts, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-xl">
                    <div className="flex justify-between items-start">

                        {/* user profile */}

                        <Link href={`/usersProfile/${crafts.email}`}>
                            <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                                <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    alt="user-image"
                                    src={crafts.userData.userImage ? crafts.userData.userImage : "/image/user.avif"} />
                                <div>
                                    <p className="font-semibold text-start">{crafts.userData.name}</p>
                                    <div className="flex gap-2 text-nowrap">
                                        <p className="text-sm text-gray-500 text-nowrap">{crafts.postData.date.split('T')[0]}</p>
                                        <p className="text-sm text-gray-500 text-nowrap">{crafts.postData.date.split('T')[1].split('.')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                    </div>
                    <button className="" onClick={() => {
                        const dialogElement = document.getElementById(`my_modal_my_post_${crafts._id}`) as HTMLDialogElement;
                        dialogElement.showModal();
                    }}><span className="">

                            <figure>
                                <img
                                    src={crafts.postData.image}
                                    alt="post"
                                    className="w-full object-cover h-56 rounded-xl"
                                />
                            </figure>
                        </span></button>
                    <dialog id={`my_modal_my_post_${crafts._id}`} className="modal">
                        <div className="modal-box w-full max-w-3xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <PostDetails id={crafts._id} />
                        </div>
                    </dialog>
                    <div className="flex justify-center">
                        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
                            <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">{crafts.postData.craftName}</h3>

                            <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
                                <span className="font-bold text-gray-800">{crafts.postData.price} TK</span>
                                <button onClick={() => handleAddToCart(crafts._id, crafts.postData.craftName, crafts.postData.image, crafts.postData.price, crafts.postData.location, crafts.email, crafts.userData.name, crafts.userData.userImage)}
                                    className="btn btn-sm rounded-sm border-none text-xs font-semibold text-white uppercase bg-primary">
                                    <HiOutlineShoppingCart className="text-xl" />
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default AllCrafts;