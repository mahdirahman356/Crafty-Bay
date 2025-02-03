/* eslint-disable react-hooks/rules-of-hooks */
"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RiMenu2Fill, RiMessengerLine } from 'react-icons/ri';
import UserList from './messageComponents/UserList/UserList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useProfile from '@/app/Hooks/useProfile';
import useConversation from '@/app/Hooks/useConversation';
import { TbMessages } from 'react-icons/tb';
interface LayoutProps {
    children: React.ReactNode;
}

type Users = {
    _id: string,
    name: string,
    image: string
}

const layout = ({ children }: LayoutProps) => {

    const [profile,] = useProfile();
    const { _id } = profile || {}
    const [conversation] = useConversation()

    const otherUserIds = conversation.flatMap((conversation: { userIds: string[]; }) =>
        conversation.userIds.filter((userId: string) => userId !== _id)
    );
    console.log(otherUserIds)

    const { data: users = [] } = useQuery({
        queryKey: ["users", otherUserIds],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/api/getUser?userIds=${otherUserIds}`)
            console.log(data)
            return data
        }
    })

    console.log(users)

    return (
        <div className={`lg:flex`}>
            <div className="drawer lg:drawer-open w-72 z-30">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="p-4 drawer-button lg:hidden fixed top-0 right-0">
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

                        {users.length === 0
                            ? <p className='flex flex-col justify-center items-center gap-2 h-[80vh]'>                
                            <TbMessages className="text-6xl" />
                                No Conversation
                            </p>
                            : <>
                                {users.map((users: Users, index: React.Key | null | undefined) => <li key={index}>
                                    <UserList users={users} />
                                </li>)}
                            </>}



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