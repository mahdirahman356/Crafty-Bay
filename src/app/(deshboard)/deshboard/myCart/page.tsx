"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Key } from "react";
import { RiDeleteBin6Line, RiShoppingCartLine } from "react-icons/ri";

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
        location: string,
    }
}

const page = () => {

    const { data: session } = useSession()

    const { data: cartData, isLoading } = useQuery({
        queryKey: ["cartData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/myCart/api/cartData?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>;
    }

    return (
        <div className="text-black w-[95%] mx-auto">
            <div className="text-3xl flex justify-center items-center gap-2 font-bold text-center mt-10 lg:mt-24 mb-10">
                <RiShoppingCartLine className="text-3xl" />
                <h3>My Cart</h3>
            </div>
            {/* table */}
            <div className="overflow-x-auto rounded-t-xl">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th></th>
                            <th>Craft Name</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Details</th>
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
                            <td>{cartData.orderData.location}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                            <td>
                                <button className="btn btn-sm btn-ghost">
                                <RiDeleteBin6Line className="text-xl text-red-500" />
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default page;