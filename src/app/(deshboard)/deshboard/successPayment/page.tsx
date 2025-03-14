import Link from 'next/link';
import React from 'react';
import { MdDone, MdOutlineShoppingBag } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

const page = () => {
    return (
        <div className='w-[85%] md:w-[80%] mx-auto mt-10 md:mt-24'>
            <div className='text-center'>
                <div className='flex justify-center mb-4'>
                    <div className='p-3 border-2 border-green-500 rounded-full'>
                        <MdDone className='text-5xl text-green-500' />
                    </div>
                </div>
                <h2 className='text-3xl md:text-4xl font-semibold mb-2'>Payment Successful!</h2>
                <p className='mb-6 text-sm md:text-base'>
                    Thank you for your purchase! Your payment has been processed successfully. <br />thank you for shopping with us!
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