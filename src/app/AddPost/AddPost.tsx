/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { useRef, useState } from 'react';
import { imageUplode } from '../imageAPI';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { IoLocationOutline, IoPricetagsOutline } from 'react-icons/io5';
import { LiaCommentSolid } from 'react-icons/lia';

const AddPost = () => {
    const { data: session } = useSession()
    const [selectedImg, setSelectedImg] = useState<string | null>(null)
    const imgRef = useRef<HTMLInputElement | null>(null);

    const { data: userData = [] } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const { image, location } = userData || {}


    const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLInputElement).value;
        const price = (form.elements.namedItem("price") as HTMLInputElement).value;
        const image = (form.elements.namedItem("img") as HTMLInputElement)?.files?.[0];
        const location = (form.elements.namedItem("location") as HTMLInputElement).value;
        let url;
        if (image) {
            const uploadResult = await imageUplode(image);
            url = uploadResult;
        }

        console.log(title, description, price, location, url)


    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = imgRef.current 
        const file = fileInput?.files?.[0] 
        if (file) {
            setSelectedImg(URL.createObjectURL(file));
        } else {
            console.error('No file selected');
        }
    };


    console.log(selectedImg)

    return (
        <div className="text-black">
            <h2 className='text-2xl font-bold text-center text-primary mb-5'>Create new post</h2>
            <form onSubmit={handleAddPost} className="flex flex-col md:flex-row gap-7">
                <div className='md:w-1/2 flex justify-center items-center'>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center text-center bg-white">
                        <div>
                            <Image
                                src={selectedImg ? selectedImg : "/image/add-image.png"} alt="profile"
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
                            ref={imgRef}
                            onChange={handleImageChange}
                        />
                    </label>
                </div>


                <div className='md:w-1/2 md:p-6 p-3'>

                    <div className='flex items-center gap-2 mb-4'>
                        <Image
                            src={session?.user?.image || image ? session?.user?.image || image : "/image/user.avif"} alt="profile"
                            width={400}
                            height={300}
                            className='object-cover h-10 w-10 rounded-full'
                        />
                        <p className='text-[16px] text-gray-500 font-semibold'>{session?.user?.name}</p>
                    </div>

                    <textarea
                        name="description"
                        rows={4}
                        cols={50}
                        className="grow w-full text-[16px]  bg-gray-100 p-3 mb-6 rounded-md text-black border-gray-300 pb-2 focus:border-blue-500 outline-none"
                        placeholder="Write Something About Your Post"
                    />

                    <div className="flex items-center mb-4 w-full text-gray-700 ">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <LiaCommentSolid className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="title"
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Add Title"
                        />
                    </div>


                    <div className="flex items-center mb-4 w-full text-gray-700 ">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <IoPricetagsOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="price"
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Add Price"
                        />
                    </div>

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

                    <button type='submit' className='btn btn-primary text-white w-full rounded-sm'>Post</button>

                </div>
            </form >
        </div >
    );
};

export default AddPost;