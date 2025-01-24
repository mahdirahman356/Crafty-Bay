/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { LayoutProps } from '../../../../.next/types/app/layout';
import { RiMenu2Fill } from 'react-icons/ri';

const layout: React.FC<LayoutProps> = ({ children }) => {
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
                    <ul className="menu min-h-full w-72 p-7 fixed bg-primary text-white">
                        <li>
                            <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                                <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    alt="user-image"
                                    src="/image/user.avif" />
                                <div>
                                    <p className="font-semibold">Aryan Mahdi</p>
                                    <p className="text-xs font-thin">Message</p>
                                </div>
                            </div>
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