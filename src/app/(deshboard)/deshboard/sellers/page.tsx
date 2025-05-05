"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import useSellers from '@/app/Hooks/useSellers';
import React, { Key } from 'react';
import { MdOutlineSell } from 'react-icons/md';


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
            {sellers && sellers.map((seller: Sellers, index: Key | null | undefined) =>
                <div className='' key={index}>
                    its loop {seller.user.name}
                </div>
            )}
        </div>
    );
};

export default page;