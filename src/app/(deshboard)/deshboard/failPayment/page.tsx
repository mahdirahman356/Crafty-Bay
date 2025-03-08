"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowGoBackLine, RiHome2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const page = () => {
    const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

    return (
        <div>
            <div className='w-[85%] md:w-[80%] mx-auto mt-10 md:mt-24'>
                <div className='text-center'>
                    <div className='flex justify-center mb-4'>
                        <div className='p-3 border-2 border-red-500 rounded-full'>
                            <RxCross2 className='text-5xl text-red-500' />
                        </div>
                    </div>
                    <h2 className='text-3xl md:text-4xl font-semibold mb-2'>Payment Failed</h2>
                    <p className='mb-6 text-sm md:text-base'>
                        Oops! Something went wrong, and your payment could not be processed.
                        <br />Payment declined or an unexpected error occurred.
                    </p>
                    <div className='flex flex-col md:flex-row justify-center items-start md:items-center gap-4'>
                        <p className='flex gap-1 items-center'>
                            <RiArrowGoBackLine className='text-xl' />
                            <button onClick={handleGoBack} className='text-blue-500 text-sm md:text-base text-nowrap'>
                                Go back
                            </button>
                        </p>
                        <p className='flex gap-1 items-center'>
                            <RiHome2Line className='text-xl' />
                            <span className='text-blue-500 text-sm md:text-base text-nowrap'>
                                <Link href={"/"}>
                                    Go to homepage
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;