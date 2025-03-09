/* eslint-disable @next/next/no-img-element */
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiChartLineUp } from "react-icons/pi";

const AdminStats = () => {
    return (
        <div className="my-8">
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                <div className="rounded-md p-6 lg:p-7 w-full bg-red-400 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p>Revenue</p>
                        <PiChartLineUp className="text-2xl" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold text-nowrap">1000 TK</p>
                        <img className="w-16 h-16 hidden" src="/image/balls-image.png" alt="" />
                    </div>
                </div>


                <div className="rounded-md p-6 lg:p-7 w-full bg-blue-400 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p>Products</p>
                        <BsBoxSeam className="text-2xl" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">1000</p>
                        <img className="w-16 h-16 hidden"  src="/image/balls-image.png" alt="" />
                    </div>
                </div>

                <div className="rounded-md p-6 lg:p-7 w-full bg-emerald-400 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p>Customers</p>
                        <HiOutlineUsers className="text-2xl" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">1000</p>
                        <img className="w-16 h-16 hidden"  src="/image/balls-image.png" alt="" />
                    </div>
                </div>

                <div className="rounded-md p-6 lg:p-7 w-full bg-purple-400 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p>Orders</p>
                        <IoBookmarkOutline className="text-2xl" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">1000</p>
                        <img className="w-16 h-16 hidden"  src="/image/balls-image.png" alt="" />
                    </div>
                </div>
            </div> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                <div className="relative w-full">
                    <div className="bg-gradient-to-r from-red-400 to-red-200 p-6 lg:p-7 rounded-lg relative w-full h-full">
                    <div className="absolute w-28 h-28 rounded-full bg-white bg-opacity-20 top-0 right-6"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-white bg-opacity-20 top-1/2 right-0"></div>

                        <div className="flex items-center justify-between mb-3">
                            <p>Revenue</p>
                            <PiChartLineUp className="text-2xl" />
                        </div>
                        <p className="text-2xl font-semibold text-nowrap">1000 TK</p>
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-200 p-6 lg:p-7 rounded-lg relative w-full h-full">
                    <div className="absolute w-28 h-28 rounded-full bg-white bg-opacity-20 top-0 right-6"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-white bg-opacity-20 top-1/2 right-0"></div>

                        <div className="flex items-center justify-between mb-3">
                            <p>Products</p>
                            <BsBoxSeam className="text-2xl" />
                        </div>
                        <p className="text-2xl font-semibold text-nowrap">1000</p>
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-200 p-6 lg:p-7 rounded-lg relative w-full h-full">
                    <div className="absolute w-28 h-28 rounded-full bg-white bg-opacity-20 top-0 right-6"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-white bg-opacity-20 top-1/2 right-0"></div>

                        <div className="flex items-center justify-between mb-3">
                            <p>Customers</p>
                            <HiOutlineUsers className="text-2xl" />
                        </div>
                        <p className="text-2xl font-semibold text-nowrap">1000</p>
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="bg-gradient-to-r from-violet-400 to-violet-200 p-6 lg:p-7 rounded-lg relative w-full h-full">
                    <div className="absolute w-28 h-28 rounded-full bg-white bg-opacity-20 top-0 right-6"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-white bg-opacity-20 top-1/2 right-0"></div>

                        <div className="flex items-center justify-between mb-3">
                            <p>Orders</p>
                            <IoBookmarkOutline className="text-2xl" />
                        </div>
                        <p className="text-2xl font-semibold text-nowrap">1000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;