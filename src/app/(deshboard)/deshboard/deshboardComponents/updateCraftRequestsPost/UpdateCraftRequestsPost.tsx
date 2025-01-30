/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { TbBrandCraft } from "react-icons/tb";

interface UpdateCraftRequestsPostsProps {
    id: string;
}

const UpdateCraftRequestsPost: React.FC<UpdateCraftRequestsPostsProps> = ({id}) => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false);

    const { data: postDetails = [] } = useQuery({
        queryKey: ["postDetails", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/craftRequestsPostDetails/api/${id}`)
            console.log(data)
            return data
        }
    })

    const { craftName, title, description, location, date } = postDetails.postData || {}
    const { userImage } = postDetails.userData || {}


    const handleUpdateCraftRequestsPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        const form = e.target as HTMLFormElement
        const craftName = (form.elements.namedItem("craftName") as HTMLInputElement).value;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLInputElement).value;
        const location = (form.elements.namedItem("location") as HTMLInputElement).value;
        
        const postUpdate = {
            postId: postDetails._id,
            updatedData: {
                craftName: craftName,
                title: title,
                description: description,
                location: location,
                date: date
            }
        }
        console.log(postUpdate)

        try {

            const res = await axios.put('http://localhost:3000/deshboard/deshboardComponents/updateCraftRequestsPost/api/update', postUpdate)
            console.log(res)
            if (res.data) {
                window.location.reload()
            }

        } catch (error) {
            console.error('Error updating profile', error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="text-black">
            <h2 className='text-2xl font-bold text-center text-primary mb-5'>Create new post</h2>
            <form onSubmit={handleUpdateCraftRequestsPost} className="flex flex-col md:flex-row gap-7">
                <div className={`md:w-full md:p-6 p-3`}>
                    <div className='flex items-center gap-2 mb-4'>
                        <img
                            src={session?.user?.image || userImage  ?  session?.user?.image || userImage : "/image/user.avif"} alt="profile"
                            width={400}
                            height={300}
                            className='object-cover h-10 w-10 rounded-full'
                        />
                        <p className='text-[16px] text-gray-500 font-semibold'>{session?.user?.name}</p>
                    </div>
                    {/* description */}
                    <textarea
                        name="description"
                        rows={4}
                        cols={50}
                        defaultValue={description}
                        className="grow w-full text-[16px]  bg-gray-100 p-3 mb-6 rounded-md text-black border-gray-300 pb-2 focus:border-blue-500 outline-none"
                        placeholder="Write Something About Your Post"
                    />
                    {/* Craft Name */}
                    <div className="flex items-center mb-4 w-full text-gray-700 ">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <TbBrandCraft className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="craftName"
                            defaultValue={craftName}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Craft Name"
                        />
                    </div>

                    {/* title */}
                    <div className="flex items-center mb-4 w-full text-gray-700 ">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <LiaCommentSolid className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="title"
                            defaultValue={title}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Add Title"
                        />
                    </div>

                    {/* location */}
                    <div className="flex items-center mb-6 w-full text-gray-700 ">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <IoLocationOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="location"
                            defaultValue={location}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Add Location"
                        />
                    </div>

                    <button type='submit' className='btn btn-primary text-white w-full rounded-sm'>
                    {loading ? <span className="loading loading-spinner text-white"></span> : "Update"}
                    </button>

                </div>
            </form >
        </div >
    );
};

export default UpdateCraftRequestsPost;