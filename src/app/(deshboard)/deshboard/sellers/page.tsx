/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import useSellers from '@/app/Hooks/useSellers';
import { Key } from 'react';


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
        <div>
            <div className=''>
                <div className='flex'>
                    <div className="w-[33%]">

                    

                        <div className=' h-[100vh]  overflow-x-auto'>
                            {sellers && sellers.map((seller: Sellers, index: Key | null | undefined) =>
                                <div key={index} className='flex gap-2 p-4'>
                                    <div>
                                        <img className='w-12 h-12 rounded-full object-cover border' src={seller.user.image ? seller.user.image : "/image/user.avif"} alt="" />
                                    </div>
                                    <div className=''>
                                        <h4 className='font-semibold'>{seller.user.name}</h4>
                                        <p className='text-sm text-gray-500'>{seller.user.email}</p>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                    <div className='flex-1 min-w-screen text-center flex justify-center items-center'>
                        <p>hello world</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;