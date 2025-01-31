"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineNotifications } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import Notifications from "../Notifications/Notifications";

const Navbar = () => {
    const pathName = usePathname()
    const session = useSession()
    console.log(session)

    const navItem: { title: string; path: string }[] = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Crafts",
            path: "/crafts"
        },
        {
            title: "Crafts Requests",
            path: "/craftRequests"
        },
        {
            title: "Profile",
            path: "/deshboard/profile"
        },
    ]
    return (
        <div className={`${pathName.includes('deshboard') || pathName.includes('/login') || pathName.includes('/signup') || pathName.includes('/messages') ? 'hidden' : ""} relative z-10 w-full bg-transparent`}>
            <div className="navbar absolute w-[99%] md:w-[85%] mx-auto py-4" style={{ left: "50%", transform: "translateX(-50%)" }} >
                <div className="navbar-start">
                    <a className="font-bold text-nowrap ml-3 text-2xl md:text-4xl">Crafty Bay<span className="text-primary">.</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {navItem.map((item, index) =>
                            <li key={index}><Link prefetch={true} href={item.path}>{item.title}</Link></li>)}

                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center gap-3 md:gap-6">
                        <div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-circle">
                                    <MdOutlineNotifications className="text-2xl" />
                                </div>
                                <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] overflow-auto w-[calc(16rem-7px)] md:w-72 max-h-80 shadow">
                                    <div>
                                        <Notifications />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-circle">
                                <Link href={"/messages/messagePage"}>
                                    <RiMessengerLine className="text-2xl" />
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;