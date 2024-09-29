"use client"
import Link from "next/link";
import { LayoutProps } from "../../../../.next/types/app/layout";
import { LuUser2 } from "react-icons/lu";

const layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={`lg:flex`}>
            <div className="drawer lg:drawer-open w-[25%]">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu min-h-full w-72 p-7 fixed bg-primary text-white">
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
                                href={"/deshboard/allUsers"}>
                                <LuUser2 className="text-xl" />
                                All Users
                            </Link>
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