import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";


interface PostDetailsProps {
    id: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ id }) => {
    const { data: postDetails = [] } = useQuery({
        queryKey: ["postDetails", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/postDetails/api/${id}`)
            console.log(data)
            return data
        }
    })

    const { title, description, price, location, date } = postDetails.postData || {}
    const { userImage, name } = postDetails.userData || {}

    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col md:flex-row gap-7">
                   <div className="md:w-1/2">
                   <div className="rounded-sm">
                        <div className="flex items-center gap-4 mt-2 mb-6">
                            
                            <Image className="w-10 h-10 rounded-full"
                                alt="user-image"
                                width={400}
                                height={300}
                                src={userImage ? userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold text-start">{name}</p>
                                <div className="flex gap-3">
                                    {date ? (
                                        <>
                                            <p className="text-sm text-gray-500">{date.split('T')[0]}</p>
                                            <p className="text-sm text-gray-500">{date.split('T')[1]?.split('.')[0]}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">No date available</p>
                                    )}
                                </div>
                            </div>
                           
                        </div>
                    </div>
                   <Image
                        src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt="post"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-2xl" />
                   </div>
                    <div className="md:w-1/2">
                
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
                        <p className="flex items-center gap-3">
                            <p className="bg-gray-300 p-2 rounded-full">
                                <IoLocationOutline className="text-xl text-secondary" />
                            </p>
                            <p className="text-gray-700">{location}</p>
                        </p>
                        <p className="py-6 text-gray-700">
                            {description}
                        </p>
                        <h1 className=" text-end text-4xl font-bold text-primary">{price}TK</h1>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;