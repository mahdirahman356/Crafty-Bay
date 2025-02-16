import useComments from "@/app/Hooks/useComments";
import useFormatDate from "@/app/Hooks/useFormatDate";
import useProfile from "@/app/Hooks/useProfile";
import { QueryObserverResult } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuCopy, LuPenLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

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

type CommentRefetchType = () => Promise<QueryObserverResult<Comment, unknown>>;


const CommentMenuModal = ({ comment, commentRefetch }: { comment: Comment, commentRefetch: CommentRefetchType }) => {

    const [copied, setCopied] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { formatDateTime } = useFormatDate()
    const [profile] = useProfile()
    const { _id } = profile || {}



    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true)
            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {

            const res = await axios.delete(`http://localhost:3000/components/CraftComment/api/deleteComment/${commentId}`)
            console.log(res)
            commentRefetch()

        } catch (error) {
            console.error("error comment delete", error)
        }
    }


    return (
        <div>
            <button className=""
                onClick={() => {
                    const modal = document.getElementById(`comment_menu_${comment._id}`) as HTMLDialogElement;
                    modal?.showModal();
                }}>
                <div className="bg-gray-300 text-sm px-3 py-2  rounded-lg text-start">
                    {editMode
                        ? <>
                            <form>
                                <label className="input input-xs flex items-center rounded-sm gap-2">
                                    <input
                                        defaultValue={comment.commentData.comment}
                                        type="text"
                                        className="grow focus:outline-none focus:ring-0 bg-transparent"
                                        placeholder="Search" />
                                    <IoIosSend className="text-xl" />
                                </label>
                            </form>
                            <button onClick={() => setEditMode(false)} className="mt-1 text-sm text-blue-500 text-start">
                                close
                            </button>
                        </>
                        : <>
                            {comment.commentData.comment}
                        </>
                    }
                </div>
                <dialog id={`${editMode ? "" : `comment_menu_${comment._id}`}`} className="modal">
                    <div className="modal-box w-auto">
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 text-gray-600">
                            <p className="m-2 p-2 text-xs border-b-[1px] border-gray-400">{formatDateTime(comment.commentData.date)}</p>
                            <li>
                                <a onClick={() => handleCopy(comment.commentData.comment)} className="">
                                    {copied
                                        ? <>
                                            <IoCheckmarkDone className="text-xl" />
                                            Copied
                                        </>
                                        : <>
                                            <LuCopy className="text-xl" />
                                            Copy
                                        </>}
                                </a>
                            </li>
                            {comment.commentData.userData.userId === _id
                                && <>
                                    <li>
                                        <a>
                                            <form method="dialog">
                                                <button onClick={() => setEditMode(true)} className="flex gap-2">
                                                    <LuPenLine className="text-xl" />
                                                    Edit Comment
                                                </button>
                                            </form>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleDeleteComment(comment._id)} className="text-red-500">
                                            <RiDeleteBin5Line className="text-xl" />
                                            Delete Comment
                                        </a>
                                    </li>
                                </>}
                        </ul>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </button>
        </div>
    );
};

export default CommentMenuModal;