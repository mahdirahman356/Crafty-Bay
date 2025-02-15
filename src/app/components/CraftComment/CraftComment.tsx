/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useProfile from '@/app/Hooks/useProfile';
import axios from 'axios';
import React, { useState } from 'react';
import { FaRegComments } from "react-icons/fa6";
import { IoIosSend } from 'react-icons/io';

type Crafts = {
    _id: string,
    email: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        craftName: string;
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

const CraftComment = ({ crafts }: { crafts: Crafts }) => {

    const [comment, setComment] = useState("")

    const [profile] = useProfile()
    const {image, name, email} = profile || {}


    const handleComment = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const commentData = {
            postId: crafts._id,
            commentData: [{
                userData: {
                    email: email,
                    name: name,
                    image: image
                },
                comment: comment,
                date: new Date()
            }],
        }

        try {

            const res = await axios.put('http://localhost:3000/components/CraftComment/api/addComment', commentData)
            console.log(res.data)
            setComment("")
            
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="hero">
            <div className="hero-content flex-col md:flex-row md:items-end gap-7">
                <div className="md:w-1/2">
                    <div className="rounded-sm">
                        <div className="flex items-center gap-4 mt-2 mb-6">
                            <img className="w-10 h-10 rounded-full"
                                alt="user-img"
                                width={400}
                                height={300}
                                src={crafts.userData.userImage ? crafts.userData.userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold text-start">{crafts.userData.name}</p>
                                <div className="flex gap-3">
                                    {crafts.postData.date ? (
                                        <>
                                            <p className="text-sm text-gray-500">{crafts.postData.date.split('T')[0]}</p>
                                            <p className="text-sm text-gray-500">{crafts.postData.date.split('T')[1]?.split('.')[0]}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">No date available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src={crafts.postData.image}
                        alt="post"
                        className="object-cover rounded-lg shadow-2xl" />
                </div>
                <div className="md:w-1/2">
                    <div className="">
                        <p className='text-sm flex flex-col items-center text-gray-500 mb-12 md:mb-16'>
                            <FaRegComments className='text-4xl' />
                            No Comments
                        </p>
                    </div>
                    <form onSubmit={handleComment} className='w-full'>
                        <label className="w-full input input-sm bg-gray-200 rounded-3xl flex items-center gap-2">
                            <input
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                type="text"
                                className="grow w-full"
                                placeholder="Comment"
                                required />
                            <button type="submit" className="">
                                <IoIosSend className="text-xl text-primary" />
                            </button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CraftComment;