/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";

interface CraftRequestsPostProps {
    id: string;
}

const CraftRequestsPostDetails: React.FC<CraftRequestsPostProps> = ({id}) => {
     
    const { data: CraftRequestsPostDetails = [] } = useQuery({
        queryKey: ["CraftRequestsPostDetails", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/craftRequestsPostDetails/api/${id}`)
            console.log(data)
            return data
        }
    })

    const { craftName, title, description, location, date, } = CraftRequestsPostDetails.postData || {}
    const { userImage, name } = CraftRequestsPostDetails.userData || {}


    return (
        <div className="hero flex flex-col items-start">
                <div className="hero-content flex-col items-start gap-7">
                   <div className="">
                        <div className="flex items-center gap-4 mt-2 mb-6">
                            <img className="w-10 h-10 rounded-full object-cover"
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
                    <div className="">
                        <p className="uppercase text-secondary mb-2 text-sm">{craftName}</p>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
                        <p className="flex items-center gap-3">
                            <p className="bg-gray-300 p-2 rounded-full">
                                <IoLocationOutline className="text-xl text-secondary" />
                            </p>
                            <p className="text-gray-700">{location}</p>
                        </p>
                        <p className="py-6 text-sm md:text-base text-gray-700">
                            {description}
                        </p>

                    </div>
                </div>
            </div>
    );
};

export default CraftRequestsPostDetails;