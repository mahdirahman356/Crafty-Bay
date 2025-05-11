/* eslint-disable @next/next/no-img-element */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import useSellers from '@/app/Hooks/useSellers';
import React, { Key } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail, MdOutlineSell } from 'react-icons/md';


type Sellers = {
    user: {
        _id: string;
        name: string;
        email: string;
        image: string;
        location: string;
        contactNumber: string
        password: string;
        role: string
    };
    products: number;
    orders: number;
    revenue: number
}

const page = () => {
    const [sellers] = useSellers()
    console.log(sellers)
    return (
        <div className='w-[95%] mx-auto'>
            <div className="text-3xl flex justify-center items-center gap-2 font-bold text-center mt-10 lg:mt-24 mb-10">
                <MdOutlineSell className="text-3xl" />
                <h3>Sellers</h3>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {sellers && sellers.map((seller: Sellers, index: Key | null | undefined) =>
                    <div className='' key={index}>
                        <div className='container flex gap-4 border px-6 py-6 rounded-xl'>
                            <div>
                                <img className='w-16 h-16 object-cover rounded-full border' src={seller.user.image ? seller.user.image : "/image/user.avif"} alt="" />
                            </div>
                            <div>
                                <h4 className='font-semibold mb-1'>{seller.user.name}</h4>
                                <div className='flex items-center gap-1'>
                                    <MdEmail className='text-blue-500'/>
                                    <p className='text-sm text-gray-500'>{seller.user.email}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaLocationDot className='text-pink-500'/>
                                    <p className='text-sm text-gray-500'>{seller.user.location ? seller.user.location : <span className='text-gray-400 text-sm'>Location not added.</span>}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;