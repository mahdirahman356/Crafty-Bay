/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useComments from '@/app/Hooks/useComments';
import useFormatDate from '@/app/Hooks/useFormatDate';
import useProfile from '@/app/Hooks/useProfile';
import axios from 'axios';
import Link from 'next/link';
import React, { Key, useState } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import CommentMenuModal from '../CommentMenuModal/CommentMenuModal';

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

type Comment = {
    _id: string,
    commentData: {
        userData: {
            userId: string,
            email: string,
            name: string,
            image: string
        },
        comment: string,
        date: string

    }
}


const CraftComment = ({ crafts }: { crafts: Crafts }) => {

    const [comment, setComment] = useState("")
    const [sending, setSending] = useState(false)
    const { formatDateTime } = useFormatDate()


    const [profile] = useProfile()
    const { _id, image, name, email } = profile || {}

    const [comments, commentRefetch, isLoadingComments] = useComments(crafts._id)

    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSending(true)

        const commentData = {
            postId: crafts._id,
            commentData: {
                userData: {
                    userId: _id,
                    email: email,
                    name: name,
                    image: image
                },
                comment: comment,
                date: new Date()
            },
        }

        try {

            const res = await axios.post('http://localhost:3000/components/CraftComment/api/addComment', commentData)
            console.log(res.data)
            setComment("")
            commentRefetch()
            setSending(false)


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
                    <div className="overflow-y-auto max-h-60">
                        {isLoadingComments
                            ? <div className="h-60 flex justify-center items-center">
                                <progress className="progress w-56"></progress>
                            </div>
                            : <>
                                {comments && comments.length > 0
                                    ? <>
                                        {comments.map((comment: Comment, index: Key | null | undefined) => <div key={index} className="chat chat-start mb-4 mx-2">
                                            <Link href={`/usersProfile/${comment.commentData.userData.email}`}>
                                                <div className="w-10 rounded-full">
                                                    <img
                                                        className='w-10 h-10 object-cover rounded-full'
                                                        alt="user"
                                                        src={comment.commentData.userData.image} />
                                                </div>
                                            </Link>
                                            <div>
                                                <p className="text-xs opacity-50">{formatDateTime(comment.commentData.date)}</p>
                                                <CommentMenuModal comment={comment} commentRefetch={commentRefetch} />
                                            </div>
                                        </div>)}
                                    </>
                                    : <p className='text-sm flex flex-col items-center text-gray-500 mb-12 md:mb-16'>
                                        <FaRegComments className='text-4xl' />
                                        No Comments
                                    </p>}

                            </>}
                    </div>
                    <form onSubmit={handleComment} className='w-full'>
                        <label className="w-full input input-sm md:input-md bg-gray-200 rounded-3xl flex items-center gap-2">
                            <input
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                type="text"
                                className="grow w-full"
                                placeholder="Comment"
                                required />
                            <button type="submit" className="md:btn md:btn-sm md:btn-circle btn-primary">
                                {sending
                                    ? <span className="loading loading-dots loading-sm text-white"></span>
                                    : <IoIosSend className="text-xl text-primary md:text-white" />
                                }
                            </button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CraftComment;