/* eslint-disable @next/next/no-img-element */
"use client"
import useConversation from "@/app/Hooks/useConversation";
import useProfile from "@/app/Hooks/useProfile";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import useUsersList from "@/app/Hooks/useUsersList";
import { imageUplode } from "@/app/imageAPI";
import axios from "axios";
import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
interface Params {
    id: string
}
const MessageForm = ({ params }: { params: Params }) => {

    const [sending, setSending] = useState(false)
    const [message, setMessage] = useState("")
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const imageRef = useRef<HTMLInputElement | null>(null)

    const [, refetchSenderMessages] = useSenderMessages(params.id)
    const [, refetchUserList] = useUsersList()
    const [, refetchConversation] = useConversation()
    const [, refetchReceiverMessages] = useReceiverMessages()
    const [profile] = useProfile()
    const { _id } = profile || {}

    const handleMessageForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSending(true)
        console.log(message)
        const form = e.target as HTMLFormElement
        const img = (form.elements.namedItem("img") as HTMLInputElement)?.files?.[0];
        let imageUrl;
        if (img) {
            const uploadResult = await imageUplode(img);
            imageUrl = uploadResult;
        }
        
        try {
            if (message) {
                const messageData = {
                    body: message,
                    createdAt: new Date(),
                    conversationId: params.id,
                    senderId: _id,
                    seenIds: [_id]
                };
                await axios.post("http://localhost:3000/messagesApi/api/sendMessage", messageData);
                setSending(false)
                console.log("Message sent:", messageData);
            }
    
            if (imageUrl) {
                const messageData = {
                    image: imageUrl,
                    createdAt: new Date(),
                    conversationId: params.id,
                    senderId: _id,
                    seenIds: [_id]
                };
                await axios.post("http://localhost:3000/messagesApi/api/sendMessage", messageData);
                setSending(false)
                console.log("Image sent:", messageData);
            }
    
            await refetchConversation();
            await refetchUserList();
            await refetchSenderMessages();
            await refetchReceiverMessages()
    
            setMessage("");
            setSelectedImg(null);
            if (imageRef.current) {
                imageRef.current.value = "";
            }
        } catch (error) {
            console.log("message sending error", error)
        }
    }

    const handleimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = imageRef.current
        const file = fileInput?.files?.[0]
        if (file) {
            setSelectedImg(URL.createObjectURL(file))
        } else {
            console.error('No file selected');
        }
    }

    const handleCancelSelectedImg = () => {
        setSelectedImg(null)
        if (imageRef.current) {
            imageRef.current.value = "";
        }
    }

    return (
        <div className="">
            <div className="fixed bottom-0 right-0 left-0 lg:left-60 bg-white p-4 lg:pl-16">
                {selectedImg &&
                    <div className="relative mb-3 ml-2">
                        <button onClick={handleCancelSelectedImg} className="btn btn-xs btn-circle absolute left-[85px] bottom-[85px]">
                            <RxCross2 />
                        </button>
                        <img
                            src={selectedImg && selectedImg} alt="profile"
                            width={400}
                            height={300}
                            className='object-cover rounded-lg w-24 h-24'
                        />
                    </div>
                }
                <form 
                    onSubmit={handleMessageForm}>
                    <label className="w-full input input-sm md:input-md input-bordered bg-gray-200 border-none flex justify-between items-center gap-2 rounded-3xl">
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            type="text"
                            name="message"
                            className="w-full text-sm md:text-base"
                            placeholder="Message..."
                            required={!selectedImg}
                        />
                    <div className="flex justify-center items-center gap-2 md:gap-4">
                        <label>
                            <div>
                                <IoImageOutline className="text-xl md:text-3xl lg:text-4xl text-primary" />
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="img"
                                accept="image/*"
                                ref={imageRef}
                                onChange={handleimageChange}
                            />
                        </label>
                        <button type="submit" className="md:btn md:btn-sm md:btn-circle btn-primary">
                            {sending
                                ? <span className="loading loading-dots loading-sm text-white"></span>
                                : <IoIosSend className="text-xl text-primary md:text-white" />
                            }
                        </button>
                    </div>
                    </label>
                </form>
            </div>
        </div >
    );
};

export default MessageForm;