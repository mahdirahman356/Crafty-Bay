/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { imageUplode } from "../../app/imageAPI";
import { useEffect, useRef, useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import axios from "axios";
import { reloadSession } from "../lib/funcs";

interface UpdateProfileProps {
    id: string;
    location: string;
    contactNumber: string;
    image: string;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ location, contactNumber, image, refetch }) => {

    const { data: session, update } = useSession()
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = inputRef.current as HTMLInputElement | null;
        const file = fileInput?.files?.[0] as File | undefined;
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        } else {
            console.error('No file selected');
        }
    };


    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        location: location || "",
        contactNumber: contactNumber || "",
        image: image
    });

    useEffect(() => {
        setFormData({
            name: session?.user?.name || "",
            location: location || "",
            contactNumber: contactNumber || "",
            image: image
        });
    }, [location, contactNumber, image]);



    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const location = (form.elements.namedItem("location") as HTMLInputElement).value;
        const contactNumber = (form.elements.namedItem("contactNumber") as HTMLInputElement).value;
        const image = (form.elements.namedItem("image") as HTMLInputElement)?.files?.[0];
        let url = session?.user?.image;
        if (image) {
            const uploadResult = await imageUplode(image);
            url = uploadResult;
        }

        const userData = {
            email: session?.user?.email,
            updatedData: {
                name: name,
                image: url,
                location: location,
                contactNumber: contactNumber
            }
        }

        console.log(userData)
        try {
            const res = await axios.put('http://localhost:3000/deshboard/profile/api/userUpdate', userData);
            console.log(res.data)
            if (res.data) {
                await update({
                  ...session,
                  user: {
                    ...session?.user,
                    name: name,
                    image: url,
                    location: location,
                    contactNumber: contactNumber,
                  },
                });
                reloadSession()
                refetch();
            }
        }
        catch (error) {
            console.error('Error updating profile', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <form onSubmit={handleUpdateProfile} className="w-full max-w-md text-gray-500">
                <div className="flex items-center justify-center mt-6 mb-7">
                    <a className="w-1/3 pb-4 font-medium text-center border-b-2 dark:border-[#1A2130]">
                        Edit Profile
                    </a>
                </div>
                <div>

                    <label htmlFor="dropzone-file" className="mb-12 flex flex-col w-36 h-36 items-center max-w-lg mx-auto mt-2 text-center bg-white  cursor-pointer rounded-full">
                        <Image
                            src={selectedImage ? selectedImage : session?.user?.image || formData.image || "/image/user.avif"}
                            alt="profile"
                            width={400}
                            height={300}
                            className='w-36 h-36 object-cover rounded-full border'
                        />

                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            name="image"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleImageSelect}
                        />
                    </label>
                </div>

                <div className="space-y-7 mb-11 md:w-[80%] mx-auto">
                    {/* Your Name */}
                    <div className="flex items-center w-full text-gray-700 ">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <LuUser2 className="text-gray-500 text-xl mr-3" />
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Username"
                        />
                    </div>
                    {/* Location */}
                    <div className="flex items-center w-full text-gray-700 ">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <IoLocationOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Location"
                        />
                    </div>
                    {/* Contact Number */}
                    <div className="relative flex items-center">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <IoCallOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                            className="grow border-b-2 bg-white text-black border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Contact Number"
                        />
                    </div>
                </div>
                <div className="md:w-[80%] mx-auto">
                    <button
                        className="btn text-white bg-primary w-full my-6 rounded-sm"
                        type="submit"
                    >
                        {loading ? <span className="loading loading-spinner text-white"></span> : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;