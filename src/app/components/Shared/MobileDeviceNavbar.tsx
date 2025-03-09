"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiFlowerTulipLight } from "react-icons/pi";

const MobileDeviceNavbar = () => {
    
    const pathName = usePathname()

    return (
    <div className={`${pathName.includes('/messages') || pathName.includes('deshboard')  && "hidden"} lg:hidden fixed bottom-0 left-0 w-full bg-gray-100 py-2 shadow-md`}>
            <ul className="flex justify-around items-center">
                <li>
                    <Link href={"/"}>
                        <HiOutlineHome className={`${pathName === ('/') ? "text-secondary" : "text-gray-900"} text-xl`} />
                    </Link>
                </li>
                <li>
                    <div className="dropdown dropdown-top">
                        <div tabIndex={0} role="button" className="pt-2">
                            <PiFlowerTulipLight className={`${pathName.includes('/crafts') || pathName.includes('/craftRequests') ? "text-secondary" : "text-gray-900"} text-xl`} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-3 shadow">
                            <li>
                                <Link href={"/crafts"}>
                                    <PiFlowerTulipLight className={`${pathName.includes('/crafts') ? "text-secondary" : "text-gray-900"} text-xl`} />
                                    Craft
                                </Link>
                            </li>
                            <li>
                                <Link href={"/craftRequests"}>
                                    <PiFlowerTulipLight className={`${pathName.includes('/craftRequests') ? "text-secondary" : "text-gray-900"} text-xl`} />
                                    Craft Request
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link href={"/deshboard/friends/allFriends"}>
                        <HiOutlineUsers className={`${pathName.includes('/deshboard/friends/allFriends') ? "text-secondary" : "text-gray-900"} text-xl`} />
                    </Link>
                </li>
                <li>
                    <Link href={"/deshboard/profile"}>
                        <HiOutlineUser className={`${pathName.includes('/deshboard/profile') ? "text-secondary" : "text-gray-900"} text-xl`} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MobileDeviceNavbar;