/* eslint-disable react-hooks/rules-of-hooks */
"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RiMenu2Fill, RiMessengerLine } from 'react-icons/ri';
import UserList from './messageComponents/UserList/UserList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useConversation from '@/app/Hooks/useConversation';
interface LayoutProps {
    children: React.ReactNode;
}

interface Conversation {
    userIds:{
        myId: string,
        conversationId: string
    }
}

type Users = {
    _id: string,
    name: string,
    image: string
}

const layout = ({ children }: LayoutProps) => {

    const [conversation] = useConversation()


    
    const conversationUsers = conversation.map((convo: Conversation) => {
        return convo?.userIds?.conversationId;
    });
        
    const { data: users = [], isLoading: isLoadingUserList } = useQuery({
        queryKey: ["users", conversationUsers],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/api/getUser?userIds=${conversationUsers}`)
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
                    <ul className="menu min-h-full w-72 p-7 fixed bg-gray-200">
                        <p className='flex items-center gap-1 px-4 font-semibold text-center text-xl mb-4'>
                            <RiMessengerLine className="text-2xl" />
                            Messages
                        </p>

                        {isLoadingUserList
                            ? <>
                                <li>
                                    <div className="flex w-48 flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                                            <div className="flex flex-col gap-4">
                                                <div className="skeleton h-3 w-16"></div>
                                                <div className="skeleton h-3 w-24"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </>
                            : <>{users.length === 0
                                ? <p className='flex flex-col justify-center items-center gap-2 h-[80vh]'>
                                    <span className=''>No messages found</span>
                                </p>
                                : <>
                                    {users.map((users: Users, index: React.Key | null | undefined) => <li key={index}>
                                        <UserList users={users} />
                                    </li>)}
                                </>}
                            </>}
                    </ul>
                </div>
            </div>
            <div className="w-full lg:ml-14">
                {children}
            </div>
        </div>
    );
};

export default layout;