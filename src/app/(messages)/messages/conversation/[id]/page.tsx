/* eslint-disable @next/next/no-img-element */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface Params {
    id: string
}

const page = ({ params }: { params: Params }) => {

    const { data: user = [] } = useQuery({
        queryKey: ["sentRequestsData"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/api/getUser?id=${params.id}`)
            console.log(data)
            return data
        }
    })

    const { name, image, email } = user || {}

    return (
        <div>
            <div className="flex items-center gap-4 p-4 border-b-2 border-gray-200">
                <img
                    className="object-cover w-10 h-10 rounded-full border"
                    alt="user-image"
                    src={image ? image : "/image/user.avif"} />
                <div>
                    <p className="font-semibold">{name}</p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 my-5 md:my-8">
                <div className="w-28 h-28 md:w-36 md:h-36">
                    <img
                        src={image ? image : "/image/user.avif"}
                        alt="profile"
                        width={400}
                        height={300}
                        className="object-cover object-center w-full h-full border rounded-full"
                    />
                </div>
                <h2 className="text-gray-800 font-semibold text-xl md:text-2xl">{name}</h2>
                    <button className="btn btn-sm">
                        <Link href={`/usersProfile/${email}`}>
                            View Profile
                        </Link>
                    </button>
            </div>

        </div>
    );
};

export default page;