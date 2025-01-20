/* eslint-disable @next/next/no-img-element */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { IoLocationOutline, IoPricetagsOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { TbBrandCraft } from "react-icons/tb";
import { imageUplode } from "../imageAPI";

interface UpdatePostsProps {
    id: string;
}

const UpdatePosts: React.FC<UpdatePostsProps> = ({ id }) => {
    const { data: session } = useSession()
    const [selectedImg, setSelectedImg] = useState<string | null>(null)
    const updateimgRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);


    const { data: postDetails = [] } = useQuery({
        queryKey: ["postDetails", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/postDetails/api/${id}`)
            console.log(data)
            return data
        }
    })

    const { craftName, title, description, price, location, image, date } = postDetails.postData || {}
    const { userImage } = postDetails.userData || {}

    const handleimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = updateimgRef.current
        const file = fileInput?.files?.[0]
        if (file) {
            setSelectedImg(URL.createObjectURL(file));
        } else {
            console.error('No file selected');
        }
    };


    const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        const form = e.target as HTMLFormElement
        const craftName = (form.elements.namedItem("craftName") as HTMLInputElement).value;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLInputElement).value;
        const price = (form.elements.namedItem("price") as HTMLInputElement).value;
        const img = (form.elements.namedItem("img") as HTMLInputElement)?.files?.[0];
        const location = (form.elements.namedItem("location") as HTMLInputElement).value;
        let url = image
        if (img) {
            const uploadResult = await imageUplode(img);
            url = uploadResult;
        }

        const postUpdate = {
            postId: postDetails._id,
            updatedData: {
                craftName: craftName,
                title: title,
                description: description,
                price: parseInt(price),
                image: url,
                location: location,
                date: date
            }
        }
        console.log(postUpdate)

        try {

            const res = await axios.put('http://localhost:3000/updatePosts/api/update', postUpdate)
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
        <div>
            <div className="text-black">
                <h2 className='text-2xl font-bold text-center text-primary mb-5'>Update your post</h2>
                <form onSubmit={handleUpdatePost} className="flex flex-col md:flex-row gap-7">
                    <div className='md:w-1/2 flex justify-center items-center'>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center text-center bg-white">
                            <div>
                                <img
                                    src={selectedImg ? selectedImg : image || "/image/add-image.png"} alt="profile"
                                    width={400}
                                    height={300}
                                    className='object-cover rounded-2xl'
                                />
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="img"
                                accept="image/*"
                                ref={updateimgRef}
                                onChange={handleimageChange}
                            />
                        </label>
                    </div>


                    <div className='md:w-1/2 md:p-6 p-3'>

                        <div className='flex items-center gap-2 mb-4'>
                            <img
                                src={session?.user?.image || userImage ? session?.user?.image || userImage : "/image/user.avif"} alt="profile"
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

                        {/* price */}
                        <div className="flex items-center mb-4 w-full text-gray-700 ">
                            <span className="pb-2 border-gray-300 border-b-2 ">
                                <IoPricetagsOutline className="text-gray-500 text-xl  mr-3" />
                            </span>
                            <input
                                type="text"
                                name="price"
                                defaultValue={price}
                                className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                                placeholder="Add Price"
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
        </div>
    );
};

export default UpdatePosts;