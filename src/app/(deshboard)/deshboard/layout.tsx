/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";
import { LayoutProps } from "../../../../.next/types/app/api/auth/[...nextauth]/route";
import AddPost from "@/app/AddPost/AddPost";
import { RiHome2Line, RiMenu2Fill, RiShoppingCartLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { BiMessageRounded } from "react-icons/bi";
import { PiUsers } from "react-icons/pi";

interface UserWithRole {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
}

const layout: React.FC<LayoutProps> = ({ children }) => {

    const { data: session } = useSession()
    const userWithRole = session?.user as UserWithRole | undefined;
    return (
        <div className={`lg:flex`}>
            <div className="drawer lg:drawer-open w-72 z-30">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="p-4 pb-0 drawer-button lg:hidden">
                        <RiMenu2Fill className="text-xl text-black" />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu min-h-full w-60 p-7 fixed bg-primary text-white">
                        <li>
                            <Link
                                className={`text-xl rounded-3xl font-semibold mb-3`}
                                href={"/deshboard/profile"}>
                                <LuUser2 className="text-xl" />
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`text-xl rounded-3xl font-semibold mb-3`}
                                href={"/deshboard/myCart"}>
                                <RiShoppingCartLine className="text-xl" />
                                My Cart
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`text-xl rounded-3xl font-semibold mb-3`}
                                href={"/deshboard/friends/allFriends"}>
                                <PiUsers className="text-xl" />
                                Friends
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`text-xl rounded-3xl font-semibold mb-3`}
                                href={"/messages/messagePage"}>
                                <BiMessageRounded className="text-xl" />
                                Messages
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`text-xl rounded-3xl font-semibold mb-3`}
                                href={"/"}>
                                <RiHome2Line className="text-xl" />
                                Home
                            </Link>
                        </li>

                        {/* post button  */}
                        <button className="btn rounded-3xl" onClick={() => {
                            (window as any)[`my_modal_add_posts`].showModal();
                        }}><span className="text-xl text-primary">Post</span></button>
                        <dialog id="my_modal_add_posts" className="modal">
                            <div className={`modal-box w-full ${userWithRole?.role === "seller" && "max-w-3xl"}`}>
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                </form>
                                <AddPost></AddPost>
                            </div>
                        </dialog>
                    </ul>

                </div>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default layout;