"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import {Arvo} from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AllCrafts from "../AllCrafts/AllCrafts";
const header = Arvo({ weight:["400", "700"], subsets:["latin"]})
const page = () => {
      
    const { data: crafts = [] } = useQuery({
        queryKey: ["crafts"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/crafts/api/allCrafts`)
            console.log(res.data)
            return res.data
        }
    })


    return (
        <div className="text-black">
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
                    <p className="bg-gray-200 p-4 rounded-full">
                        <HiOutlineShoppingBag className="text-2xl text-primary" />
                    </p>
                    </div>
                </div>
            </div>

            <div
                className="hero"
                style={{
                    backgroundImage: "url(https://i.ibb.co/R0XfdSx/istockphoto-1301417264-2048x2048.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-neutral-content text-center py-20">
                    <div className="max-w-md">
                        <h1 className={`${header.className} mb-5 text-4xl md:text-5xl font-bold text-white`}>Explore Unique Crafts</h1>
                    </div>
                </div>
            </div>

            <div>
                <AllCrafts crafts={crafts}/>
            </div>
        </div>
    );
};

export default page;