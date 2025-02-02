/* eslint-disable react-hooks/rules-of-hooks */
"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RiMenu2Fill, RiMessengerLine } from 'react-icons/ri';
import UserList from './messageComponents/UserList/UserList';
interface LayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {


    return (
        <div className={`lg:flex`}>
            <div className="drawer lg:drawer-open w-72 z-30">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="p-4 drawer-button lg:hidden">
                        <RiMenu2Fill className="text-xl text-black" />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu min-h-full w-60 p-7 fixed bg-primary text-white">
                        <p className='text-white flex items-center gap-1 px-4 font-semibold text-center text-xl mb-4'>
                            <RiMessengerLine className="text-2xl" />
                            Messages
                        </p>
                        <li>
                            <UserList />
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