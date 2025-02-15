/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import useCartData from "../Hooks/useCartData";
import { Arvo } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AllCrafts from "../components/AllCrafts/AllCrafts";
import CraftPageNavbar from "../components/CraftPageNavbar/CraftPageNavbar";
import SmallDeviceCraftNavbar from "../components/SmallDeviceCraftNavbar/SmallDeviceCraftNavbar";
const header = Arvo({ weight: ["400", "700"], subsets: ["latin"] })

const page = () => {

    const [searchTerm, setSearchTerm,] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [cartData] = useCartData()


    console.log(searchTerm,)

    const { data: crafts = [], refetch: craftsRefetch, isLoading } = useQuery({
        queryKey: ["crafts", searchTerm, sortOrder],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/crafts/api/allCrafts?search=${searchTerm}&sort=${sortOrder}`)
            console.log(res.data)
            return res.data
        },
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        craftsRefetch()
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setSortOrder(e.target.value)
        craftsRefetch()
    }


    return (
        <div className="text-black">
            <div className="hidden md:block">
                <CraftPageNavbar handleSearch={handleSearch} handleSortChange={handleSortChange} setSearchTerm={setSearchTerm} cartData={cartData} sortOrder={sortOrder} />
            </div>
            <div className="md:hidden">
                <SmallDeviceCraftNavbar handleSearch={handleSearch} handleSortChange={handleSortChange} setSearchTerm={setSearchTerm} cartData={cartData} sortOrder={sortOrder}/>
            </div>
            {/* banner */}
            {searchTerm === "" && sortOrder === "" && (
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                            src="https://i.ibb.co/M7kyMPw/hanna-shapovalova-Mu-RSNb-Zl-GU-unsplash.jpg"
                            alt="A description of the img"
                            width={400}
                            height={300}
                            className='hidden lg:grid'
                        />

                        <div className=''>
                            <h1 className={`${header.className} text-5xl md:text-7xl font-semibold mb-4`}>Explore <span className='text-secondary'>Crafts</span></h1>
                            <div className="hero lg:-ml-28">
                                <div className="hero-content flex-col md:flex-row gap-10">
                                    <img
                                        src="https://i.ibb.co/zsQQRfN/bettina-barth-HC1-Bgn-Vo-KD0-unsplash.jpg"  // Corrected URL
                                        alt="A description of the img"
                                        width={300}
                                        height={200}
                                    />
                                    <div>
                                        <p className="py-6 text-sm text-gray-600">
                                            Discover a wide range of handcrafted creations from skilled artisans. Whether you're looking for the perfect gift or something special for yourself, explore our collection of unique crafts and shop your favorites today.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

            <div>
                {isLoading ? (
                    <div className="mt-40 mb-20 flex justify-center items-center">
                        <progress className="progress w-56"></progress>
                    </div>
                ) : crafts.length === 0 ? (
                    <>
                        <div className="my-6 md:my-14 flex flex-col justify-center items-center">
                            <img className="w-40" src="https://i.ibb.co/BVBvTvX/no-search-result-illustration-download-in-svg-png-gif-file-formats-results-empty-matches-found-zero.webp" alt="" />
                            <p className="text-center text-gray-500">Not found</p>
                        </div>
                    </>
                ) : (
                    <AllCrafts crafts={crafts} />)
                }

            </div>
        </div>
    );
};

export default page;