"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiUserFollowLine, RiUserSharedLine } from "react-icons/ri";
import { LayoutProps } from "../../../../../../.next/types/app/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const layout: React.FC<LayoutProps> = ({ children }) => {

    const pathName = usePathname()

    return (
        <div className="md:w-[95%] mx-auto">
            {/* navbar */}
            <div className="navbar text-gray-900 py-0">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold pl-3">Friends</h3>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 bg-none">
                        <li>
                            <details>
                                <summary className={`${pathName.includes("/deshboard/friends/friendRequests") || pathName.includes("/deshboard/friends/sentRequests") ? "text-primary" : ""}`}>Requests</summary>
                                <ul className="rounded-t-none bg-none  p-2">
                                    <li>
                                        <span>
                                            <Link href={"/deshboard/friends/friendRequests"}
                                                className={`${pathName.includes("/deshboard/friends/friendRequests") ? "text-primary" : ""} text-nowrap flex items-center gap-2`}>
                                                <RiUserFollowLine className="text-xl" />
                                                Friend requests
                                            </Link>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <Link href={"/deshboard/friends/sentRequests"}
                                                className={`${pathName.includes("/deshboard/friends/sentRequests") ? "text-primary" : ""} text-nowrap flex items-center gap-2`}>
                                                <RiUserSharedLine className="text-xl" />
                                                View sent request
                                            </Link>
                                        </span>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <span>
                            <Link
                                className={`${pathName.includes("/deshboard/friends/allFriends") ? "text-primary" : ""}`}
                                href={"/deshboard/friends/allFriends"}>
                                Friends
                            </Link>
                            </span>
                        </li>
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