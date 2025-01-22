/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import { Arvo } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AllCrafts from "../AllCrafts/AllCrafts";
import { useState } from "react";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
const header = Arvo({ weight: ["400", "700"], subsets: ["latin"] })
const page = () => {

    const [searchTerm, setSearchTerm,] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    console.log(searchTerm,)

    const { data: crafts = [], refetch, isLoading } = useQuery({
        queryKey: ["crafts", searchTerm, sortOrder],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/crafts/api/allCrafts?search=${searchTerm}&sort=${sortOrder}`)
            console.log(res.data)
            return res.data
        },
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch() 
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setSortOrder(e.target.value)
        refetch()
    }


    return (
        <div className="text-black">
            <div className="pt-20">
                <div className="w-[95%] md:w-[85%] flex flex-col md:flex-row gap-5 mx-auto my-6">
                    {/* search bar */}
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search here"
                            className="input rounded-sm input-bordered w-full"
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn bg-primary text-white rounded-sm">
                            <MdSearch className="text-xl" />
                            Search
                        </button>
                    </form>

                    {/* account search bar */}

                    <button className="btn bg-primary text-white rounded-sm" onClick={() => {
                        (window as any)[`account_search_modal`].showModal();
                    }}>
                        <MdSearch className="text-xl" />
                        <span className="font-thin	text-sm">Search Accounts</span>
                    </button>
                    <dialog id="account_search_modal" className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <SearchAccounts />
                        </div>
                    </dialog>

                    {/* sort */}
                    <div className="flex gap-5 w-full">
                        <select
                            className="select font-thin	text-sm rounded-sm select-bordered w-full max-w-xs bg-primary text-white"
                            value={sortOrder}
                            onChange={handleSortChange}>
                            <option value="" disabled selected>Sort By Price</option>
                            <option value="priceLowHigh">Product Price: Low to High</option>
                            <option value="priceHighLow">Product Price: High to Low</option>
                        </select>
                        <p className="bg-gray-200 p-4 rounded-full">
                            <HiOutlineShoppingBag className="text-2xl text-primary" />
                        </p>
                    </div>
                </div>
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
                        <div className="mt-14 flex flex-col justify-center items-center">
                            <img className="w-40" src="https://i.ibb.co/BVBvTvX/no-search-result-illustration-download-in-svg-png-gif-file-formats-results-empty-matches-found-zero.webp" alt="" />
                            <p className="text-center text-gray-500">Not found</p>
                        </div>
                    </>
                ) : (<AllCrafts crafts={crafts} />)
                }

            </div>
        </div>
    );
};

export default page;