import Link from 'next/link';
import React from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { PiExclamationMark } from 'react-icons/pi';
import { RiHome2Line } from 'react-icons/ri';

const page = () => {
    return (
        <div className='w-[85%] md:w-[80%] mx-auto mt-10 md:mt-24'>
            <div className='text-center'>
                <div className='flex justify-center mb-4'>
                    <div className='p-3 border-2 border-amber-500 rounded-full'>
                        <PiExclamationMark className='text-5xl text-amber-500' />
                    </div>
                </div>
                <h2 className='text-3xl md:text-4xl font-semibold mb-2'>Payment Canceled</h2>
                <p className='mb-6 text-sm md:text-base'>
                    You have canceled your payment. No charges have been made.
                </p>
                <div className='flex flex-col md:flex-row justify-center items-start md:items-center gap-4'>
                    <p className='flex gap-1 items-center'>
                        <RiHome2Line className='text-xl' />
                        <span className='text-blue-500 text-sm md:text-base text-nowrap'>
                            <Link href={"/"}>
                                Go to homepage
                            </Link>
                        </span>
                    </p>

                    <p className='flex gap-1 items-center'>
                        <MdOutlineShoppingBag className='text-xl' />
                        <span className='text-blue-500 text-sm md:text-base text-nowrap'>
                            <Link href={"/crafts"}>
                                Continue shopping
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;