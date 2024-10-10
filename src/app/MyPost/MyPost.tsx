/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Key } from "react";
import Image from 'next/image';

type Post = {
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

const MyPost = () => {
    const { data: session } = useSession()
    const { data: myPost = [] } = useQuery({
        queryKey: ["myPost"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/myPost?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {myPost.map((post: Post, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-sm">
                <div className="rounded-sm">
                        <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                            <Image className="w-10 h-10 rounded-full"
                                alt="user-image"
                                width={400}
                                height={300}
                                src={post.userData.userImage ? post.userData.userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold ">{post.userData.name}</p>
                                <div className="flex gap-3">
                                    <p className="text-sm text-gray-500">{post.postData.date.split('T')[0]}</p>
                                    <p className="text-sm text-gray-500">{post.postData.date.split('T')[1].split('.')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figure>
                        <Image
                            src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                            alt="post"
                            width={400}
                            height={300}
                        />
                    </figure> 
                </div>)}
            </div>
        </div>
    );
};

export default MyPost;