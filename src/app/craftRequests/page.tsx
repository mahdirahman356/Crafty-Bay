"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Arvo } from "next/font/google";
import { MdSearch } from "react-icons/md";
import AllCraftRequests from "../AllCraftRequests/AllCraftRequests";
const header = Arvo({ weight: ["400", "700"], subsets: ["latin"] })
const page = () => {
    
    const { data: craftsRequests = [] } = useQuery({
        queryKey: ["craftsRequests"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/craftRequests/api/allCraftRequests`)
            console.log(res.data)
            return res.data
        }
    })

    return (
        <div>
            <div className="pt-20">
                <div className="w-[95%] md:w-[85%] flex flex-col md:flex-row gap-5 mx-auto my-6">
                    <form className="flex w-full">
                        <input type="text" name="search" placeholder="Search here" className="input rounded-sm input-bordered w-full" />
                        <button className="btn bg-primary text-white rounded-sm">
                            <MdSearch className="text-xl" />
                            Search
                        </button>
                    </form>

                    <div className="flex gap-5 w-full">
                        <select className="select rounded-sm select-bordered w-full max-w-xs bg-primary text-white">
                            <option value="" disabled selected>Shot By Price</option>
                            <option value="priceLowHigh">Product Price: Low to High</option>
                            <option value="priceHighLow">Product Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="hero text-black">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="https://i.ibb.co/23JNGK4/kishore-ragav-ganesh-kumar-a-Pii-A0-DUj-M-unsplash.jpg"
                        alt="A description of the img"
                        width={400}
                        height={300}
                        className='hidden lg:grid'
                    />

                    <div className=''>
                        <h1 className={`${header.className} text-5xl md:text-7xl font-semibold mb-4`}><span className='text-secondary'>Craft</span> Requests</h1>
                        <div className="hero lg:-ml-28">
                            <div className="hero-content flex-col md:flex-row gap-10">
                                <img
                                    src="https://i.ibb.co/vDP4gWm/sofia-maksymovych-Ee9-ied-SYYA-unsplash.jpg"  // Corrected URL
                                    alt="A description of the img"
                                    width={300}
                                    height={200}
                                />
                                <div>
                                    <p className="py-6 text-sm text-gray-600">
                                        Looking for something special? Browse through custom craft requests from our community, or post your own. Whether you’re searching for a unique handmade piece or have a specific creation in mind, this is the place to connect with talented artisans ready to bring your vision to life
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div>
                <AllCraftRequests craftsRequests={craftsRequests}/>
             </div>
        </div>
    );
};

export default page;