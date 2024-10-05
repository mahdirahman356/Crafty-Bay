"use client"
import Link from "next/link";
import { LayoutProps } from "../../../../.next/types/app/layout";
import { LuUser2 } from "react-icons/lu";
import AddPost from "@/app/AddPost/AddPost";

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

                        {/* post button  */}
                        <button className="btn rounded-3xl" onClick={() => {
                                        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                        modal?.showModal();
                                    }}><span className="text-xl text-primary">Post</span></button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
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