"use client"
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
type Users = {
    _id: string
    name: string,
    image: string
}

const UserList = ({ users }: { users: Users }) => {

    const [receiverMessages] = useReceiverMessages(users._id)
    const [senderMessages] = useSenderMessages(users._id)

    const allMessages = [...receiverMessages, ...senderMessages]
    const lastMessage = [...allMessages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

    const isSender = senderMessages.some((msg: { _id: string; }) => msg._id === lastMessage?._id)

    return (
        <div>
            <Link href={`/messages/conversation/${users._id}`}>
                <div className="flex items-center gap-4">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        alt="user-image"
                        src={users.image ? users.image : "/image/user.avif"} />
                    <div>
                        <p className="font-semibold">{users.name}</p>
                        <p className="text-xs font-thin text-gray-500">
                            { lastMessage ? (isSender ? "Sent a message" : lastMessage.body) : "Message"}
                        </p>
                    </div>
                </div>
            </Link>


        </div>
    );
};

export default UserList;