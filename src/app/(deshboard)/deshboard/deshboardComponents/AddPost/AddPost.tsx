/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { IoLocationOutline, IoPricetagsOutline } from 'react-icons/io5';
import { LiaCommentSolid } from 'react-icons/lia';
import { TbBrandCraft } from 'react-icons/tb';
import { imageUplode } from '@/app/imageAPI';
import { HiOutlineSelector } from 'react-icons/hi';

interface UserWithRole {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
}

const AddPost = () => {
    const { data: session } = useSession()
    const userWithRole = session?.user as UserWithRole;
    const [selectedImg, setSelectedImg] = useState<string | null>(null)
    const imgRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('')


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
        setLoading(true);
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const craftName = (form.elements.namedItem("craftName") as HTMLInputElement).value;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLInputElement).value;
        const price = (form.elements.namedItem("price") as HTMLInputElement).value;
        const img = (form.elements.namedItem("img") as HTMLInputElement)?.files?.[0];
        const location = (form.elements.namedItem("location") as HTMLInputElement).value;
        const categories = (form.elements.namedItem("categories") as HTMLInputElement).value;
        let url;
        if (img) {
            const uploadResult = await imageUplode(img);
            url = uploadResult;
        }

        if (userWithRole.role === "seller") {
            const post = {
                email: session?.user?.email,
                userData: {
                    name: session?.user?.name,
                    userImage: image,
                },
                postData: {
                    craftName: craftName,
                    categories: categories,
                    title: title,
                    description: description,
                    price: parseInt(price),
                    location: location,
                    image: url,
                    date: new Date()
                }
            }

            try {

                const res = await axios.post("http://localhost:3000/deshboard/deshboardComponents/AddPost/api/post", post)
                console.log(res.data)
                if (res.data.acknowledged === true) {
                    window.location.reload()
                }

            } catch (error) {
                console.error('Error', error);
            } finally {
                setLoading(false);
            }
        }

        if (userWithRole.role === "buyer") {
            const craftRequestsPost = {
                email: session?.user?.email,
                userData: {
                    name: session?.user?.name,
                    userImage: image,
                },
                postData: {
                    craftName: craftName,
                    title: title,
                    description: description,
                    location: location,
                    date: new Date()
                }
            }

            try {

                const res = await axios.post("http://localhost:3000/deshboard/deshboardComponents/AddPost/api/craftRequestsPost", craftRequestsPost)
                console.log(res.data)
                if (res.data.acknowledged === true) {
                    window.location.reload()
                }

            } catch (error) {
                console.error('Error', error);
            } finally {
                setLoading(false);
            }
        }





    }

    const handleimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = imgRef.current
        const file = fileInput?.files?.[0]
        if (file) {
            setSelectedImg(URL.createObjectURL(file));
        } else {
            console.error('No file selected');
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="text-black">
            <h2 className='text-2xl font-bold text-center text-primary mb-5'>Create new post</h2>
            <form onSubmit={handleAddPost} className="flex flex-col md:flex-row gap-7">
                <div className={`${userWithRole?.role === "buyer" && "hidden"} md:w-1/2 flex justify-center items-center`}>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center text-center bg-white">
                        <div>
                            <img
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
                            onChange={handleimageChange}
                        />
                    </label>
                </div>


                <div className={`${userWithRole?.role === "buyer" ? "md:w-full" : "md:w-1/2"} md:p-6 p-3`}>

                    <div className='flex items-center gap-2 mb-4'>
                        <img
                            src={session?.user?.image || image ? session?.user?.image || image : "/image/user.avif"} alt="profile"
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
                        className="grow resize-none w-full text-[16px]  bg-gray-100 p-3 mb-6 rounded-md text-black border-gray-300 pb-2 focus:border-blue-500 outline-none"
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
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Craft Name"
                        />
                    </div>

                    {/* categories */}
                    <div className="flex items-center mb-4 w-full">
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <HiOutlineSelector className="text-gray-500 text-xl" />
                        </span>
                        <select
                            onChange={handleSelectChange}
                            name="categories"
                            className={`grow ${selectedValue ? "text-black" : "text-gray-400"} border-b-2 pl-3 bg-white border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none custom-select`}>
                            <option className='text-gray-400' disabled selected value=''>
                                Categories
                            </option>
                            <option className='text-black' value="Knitting and Crochet">
                                Knitting and Crochet
                            </option>
                            <option className='text-black' value="Sewing and Quilting">
                                Sewing and Quilting
                            </option>
                            <option className='text-black' value="Dyeing and Batik">
                                Dyeing and Batik
                            </option>
                            <option className='text-black' value="Scrapbooking and Card Making">
                                Scrapbooking and Card Making
                            </option>
                            <option className='text-black' value="Paper Flowers">
                                Paper Craft
                            </option>
                            <option className='text-black' value="Wood Furniture">
                                Wood Furniture
                            </option>
                            <option className='text-black' value="Hand-Built Pottery">
                                Hand-Built Pottery
                            </option>
                            <option className='text-black' value="Leatherworking">
                                Leatherworking
                            </option>
                            <option className='text-black' value="Glasswork and Stained Glass">
                                Glasswork and Stained Glass
                            </option>
                            <option className='text-black' value="Art">
                                Art
                            </option>
                        </select>
                    </div>

                    {/* title */}
                    <div className="flex items-center mb-4 w-full text-gray-700">
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

                    {/* price */}
                    <div className={`${userWithRole?.role === "buyer" && "hidden"} flex items-center mb-4 w-full text-gray-700`}>
                        <span className="pb-2 border-gray-300 border-b-2 ">
                            <IoPricetagsOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="number"
                            name="price"
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
                        {loading ? <span className="loading loading-spinner text-white"></span> : "Post"}
                    </button>

                </div>
            </form >
        </div >
    );
};

export default AddPost;