"use client"
import PostDetails from "@/app/components/PostDetails/PostDetails";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import useCartData from "@/app/Hooks/useCartData";
import useFormatDate from "@/app/Hooks/useFormatDate";
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
        productId: string,
        craftName: string,
        category: string,
        craftImage: string,
        price: string,
        quantity: number,
        location: string,
    },
    date: string;
}

const page = () => {
 
    const { data: session } = useSession()

    const [cartData, refetch, isLoading] = useCartData()
        const { formatDateTime } = useFormatDate()

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
        const res = await axios.patch('http://localhost:3000/deshboard/myCart/api/updateQuantity', { productId: _id, UpdateQuantity: quantity + 1 })
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }

    const handleQuantitySubtraction = async (_id: string, quantity: number) => {
        console.log(_id, quantity)
        const res = await axios.patch('http://localhost:3000/deshboard/myCart/api/updateQuantity', { productId: _id, UpdateQuantity: quantity - 1 })
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

                            })
                        }
                    })

            }
        });
    }


    const handlePaymentSystem = async (cartId: string, productId: string, price: string, craftName: string, quantity: number, category: string) => {
        const res = await axios.post('http://localhost:3000/deshboard/myCart/api/createPayment', {
            amount: price,
            cus_name: name,
            cus_email: email,
            cus_add: location,
            cus_phone: contactNumber,
            quantity: quantity,
            cartId: cartId,
            productId: productId,
            product_name: craftName,
            category: category

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
        <div className="">
            {cartData.length === 0
                ? <div className="h-[80vh] md:h-screen text-gray-800 flex flex-col gap-4 justify-center items-center">
                    <MdOutlineShoppingBag className='text-8xl' />
                    <div className="text-center">
                        <Link href={"/crafts"} prefetch={true}>
                            <button className="text-blue-500">
                                Start Shopping
                            </button>
                        </Link>
                        <p className="text-gray-600 text-sm md:text-base">You have not placed an order yet</p>
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
                            <thead className="bg-gray-200">
                                <tr className="hidden md:table-row">
                                    <th>Crafts</th>
                                    <th>Price</th>
                                    <th>Time</th>
                                    <th>Quantity</th>
                                    <th>Details</th>
                                    <th>Payment</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {cartData.map((cartData: CartData, index: Key | null | undefined) => <tr key={index} className="text-nowrap hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={cartData.orderData.craftImage}
                                                        alt="Order image" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{cartData.orderData.craftName}</div>
                                                <div className="opacity-50 text-sm mt-1">{cartData.orderData.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-600">{cartData.orderData.price} TK</td>
                                    <td>
                                        <div className="flex gap-2 text-nowrap">
                                            <p className="text-sm text-gray-600 text-nowrap">{formatDateTime(cartData.date)}</p>
                                        </div>
                                    </td>
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
                                    <td className="text-wrap">
                                        <button className="btn btn-ghost btn-xs font-sans"
                                            onClick={() => {
                                                const dialogElement = document.getElementById(`my_modal_my_post_${cartData.orderData.productId}`) as HTMLDialogElement;
                                                dialogElement.showModal();
                                            }}>
                                            <span className="text-nowrap">View details</span>
                                        </button>
                                        <dialog id={`my_modal_my_post_${cartData.orderData.productId}`} className="modal">
                                            <div className="modal-box w-full max-w-3xl">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                                </form>
                                                <PostDetails id={cartData.orderData.productId} />
                                            </div>
                                        </dialog>
                                    </td>
                                    <td>
                                        <button onClick={() => handlePaymentSystem (cartData._id, cartData.orderData.productId ,cartData.orderData.price, cartData.orderData.craftName, cartData.orderData.quantity, cartData.orderData.category)} className="btn btn-xs font-sans text-primary">Payment</button>
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