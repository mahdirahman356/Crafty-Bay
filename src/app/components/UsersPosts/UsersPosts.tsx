/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { GoDuplicate } from "react-icons/go";
import PostDetails from "../PostDetails/PostDetails";

type Posts = {
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

const UsersPosts = ({ userEmail }: { userEmail: string }) => {


    const { data: session } = useSession()


    console.log(userEmail)
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["posts", userEmail],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/myPost?email=${userEmail}`)
            console.log(data)
            return data
        }
    })

    const handleAddToCart = async (productId: string, craftName: string, craftImage: string, price: string, location: string, sellerEmail: string, sellerName: string, sellerImage: string) => {
        const order = {
            userEmail: session?.user?.email,
            sellerData: {
                email: sellerEmail,
                name: sellerName,
                image: sellerImage
            },
            orderData: {
                productId: productId,
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
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>

            {isLoading ?
                <div className="mt-20 flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div> :

                <div>
                    {posts.length === 0 ?
                        <div className="flex flex-col gap-4 mt-16 mb-10 justify-center items-center">
                            <GoDuplicate className='text-8xl' />
                            <div className="text-center">
                                <p className="text-gray-500">No Posts Yet</p>
                            </div>
                        </div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-5">
                            {posts.map((posts: Posts, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-xl">
                                <div className="flex justify-between items-start">

                                    {/* user profile */}
                                    <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                                        <img className="w-10 h-10 rounded-full"
                                            alt="user-image"
                                            src={posts.userData.userImage ? posts.userData.userImage : "/image/user.avif"} />
                                        <div>
                                            <p className="font-semibold text-start">{posts.userData.name}</p>
                                            <div className="flex gap-2 text-nowrap">
                                                <p className="text-sm text-gray-500 text-nowrap">{posts.postData.date.split('T')[0]}</p>
                                                <p className="text-sm text-gray-500 text-nowrap">{posts.postData.date.split('T')[1].split('.')[0]}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <button className="" onClick={() => {
                                    const dialogElement = document.getElementById(`my_modal_my_post_${posts._id}`) as HTMLDialogElement;
                                    dialogElement.showModal();
                                }}><span className="">

                                        <figure>
                                            <img
                                                src={posts.postData.image}
                                                alt="post"
                                                className="w-full object-cover h-56 rounded-xl"
                                            />
                                        </figure>
                                    </span></button>
                                <dialog id={`my_modal_my_post_${posts._id}`} className="modal">
                                    <div className="modal-box w-full max-w-3xl">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                        </form>
                                        <PostDetails id={posts._id} />
                                    </div>
                                </dialog>
                                <div className="flex justify-center">
                                    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
                                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">{posts.postData.craftName}</h3>

                                        <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
                                            <span className="font-bold text-gray-800">{posts.postData.price} TK</span>
                                            <button onClick={() => handleAddToCart(posts._id, posts.postData.craftName, posts.postData.image, posts.postData.price, posts.postData.location, posts.email, posts.userData.name, posts.userData.userImage)}
                                                className="btn btn-sm rounded-sm border-none text-xs font-semibold text-white uppercase bg-primary">
                                                <HiOutlineShoppingCart className="text-xl" />
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>}
                </div>}


        </div>
    );
};

export default UsersPosts;