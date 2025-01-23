"use client"
import useCartData from "@/app/Hooks/useCartData";
import PostDetails from "@/app/postDetails/PostDetails";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Key } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiDeleteBin6Line, RiShoppingCartLine } from "react-icons/ri";
import Swal from "sweetalert2";

type CartData = {
    _id: string
    userEmail: string,
    sellerData: {
        email: string,
        name: string,
    },
    orderData: {
        orderId: string,
        craftName: string,
        craftImage: string,
        price: string,
        quantity: number,
        location: string,
    }
}

const page = () => {

    const { data: session } = useSession()

    const [cartData, refetch, isLoading] = useCartData()

    const { data: userProfile = [] } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const { name, email, location, contactNumber } = userProfile || {}

    const handleQuantityAddition = async (_id: string, quantity: number) => {
        console.log(_id, quantity)
        const res = await axios.patch('http://localhost:3000/deshboard/myCart/api/updateQuantity', { orderId: _id, UpdateQuantity: quantity + 1 })
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }

    const handleQuantitySubtraction = async (_id: string, quantity: number) => {
        console.log(_id, quantity)
        const res = await axios.patch('http://localhost:3000/deshboard/myCart/api/updateQuantity', { orderId: _id, UpdateQuantity: quantity - 1 })
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }

    const handleDeleteItem = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to remove this item from your cart? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            customClass: {
                confirmButton: 'btn btn-primary rounded-sm text-white ',
                cancelButton: 'btn btn-secondary rounded-sm text-white '
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deshboard/myCart/api/deleteOrderItems/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `This item has been deleted from your shopping cart.`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    const handlePaymentSystem = async (price: string, craftName: string, quantity: number) => {
        const res = await axios.post('http://localhost:3000/deshboard/myCart/api/createPayment', {
            amount: price,
            cus_name: name,
            cus_email: email,
            cus_add: location,
            cus_phone: contactNumber,
            quantity: quantity,
            product_name: craftName,

        })
        console.log(res.data)
        const redirectUrl = res.data
        if (redirectUrl) {
            window.location.replace(redirectUrl)
        }

    }

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>;
    }

    return (
        <div className="text-black">
            {cartData.length === 0
                ? <div className="flex h-screen flex-col gap-4 justify-center items-center">
                    <MdOutlineShoppingBag className='text-8xl text-gray-800' />
                    <div className="text-center">
                        <Link href={"/crafts"}>
                        <button className="text-blue-500">
                            Start Shopping
                        </button>
                        </Link>
                        <p className="text-gray-600">You have not placed an order yet</p>
                    </div>
                </div>
                : <div className="w-[95%] mx-auto">
                    <div className="text-3xl flex justify-center items-center gap-2 font-bold text-center mt-10 lg:mt-24 mb-10">
                        <RiShoppingCartLine className="text-3xl" />
                        <h3>My Cart</h3>
                    </div>
                    {/* table */}
                    <div className="overflow-x-auto rounded-t-xl mb-8">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th></th>
                                    <th>Craft Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Details</th>
                                    <th>Payment</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {cartData.map((cartData: CartData, index: Key | null | undefined) => <tr key={index}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={cartData.orderData.craftImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cartData.orderData.craftName}
                                    </td>
                                    <td>{cartData.orderData.price} TK</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {cartData.orderData.quantity === 1 ?
                                                <button className="text-xl">-</button> :
                                                <button onClick={() => handleQuantitySubtraction(cartData._id, cartData.orderData.quantity)} className="text-xl">-</button>}
                                            <div className="">
                                                {cartData.orderData.quantity}
                                            </div>
                                            <button onClick={() => handleQuantityAddition(cartData._id, cartData.orderData.quantity)} className="text-xl">+</button>
                                        </div>
                                    </td>
                                    <td>{cartData.orderData.location}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs font-sans"
                                            onClick={() => {
                                                const dialogElement = document.getElementById(`my_modal_my_post_${cartData.orderData.orderId}`) as HTMLDialogElement;
                                                dialogElement.showModal();
                                            }}>
                                            details
                                        </button>
                                        <dialog id={`my_modal_my_post_${cartData.orderData.orderId}`} className="modal">
                                            <div className="modal-box w-full max-w-3xl">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                                </form>
                                                <PostDetails id={cartData.orderData.orderId} />
                                            </div>
                                        </dialog>
                                    </th>
                                    <td>
                                        <button onClick={() => handlePaymentSystem(cartData.orderData.price, cartData.orderData.craftName, cartData.orderData.quantity)} className="btn btn-xs font-sans text-primary">Payment</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost">
                                            <RiDeleteBin6Line onClick={() => handleDeleteItem(cartData._id)} className="text-xl text-red-500" />
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>


                </div>}

        </div>
    );
};

export default page;