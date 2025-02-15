/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";


interface PostDetailsProps {
    id: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ id }) => {
    const { data: postDetails = [], isLoading } = useQuery({
        queryKey: ["postDetails", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/components/PostDetails/api/${id}`)
            console.log(data)
            return data
        }
    })

    const { craftName, title, description, price, location, date, image } = postDetails.postData || {}
    const { userImage, name } = postDetails.userData || {}

    return (
        <div>
            {isLoading
                ? <div className="my-16 flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div className="hero">
                    <div className="hero-content flex-col md:flex-row gap-7">
                        <div className="md:w-1/2">
                            <div className="rounded-sm">
                                <div className="flex items-center gap-4 mt-2 mb-6">

                                    <img className="w-10 h-10 rounded-full"
                                        alt="user-img"
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
                            <img
                                src={image}
                                alt="post"
                                className="object-cover rounded-lg shadow-2xl" />
                        </div>
                        <div className="md:w-1/2">
                            <p className="uppercase text-secondary mb-2 text-sm">{craftName}</p>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
                            <p className="flex items-center gap-3">
                                <p className="bg-gray-300 p-2 rounded-full">
                                    <IoLocationOutline className="text-xl text-secondary" />
                                </p>
                                <p className="text-gray-700">{location}</p>
                            </p>
                            <p className="py-6 text-gray-700 text-sm md:text-base">
                                {description}
                            </p>
                            <h1 className=" text-end text-4xl font-bold text-primary">{price}TK</h1>

                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default PostDetails;