/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Arvo } from "next/font/google";
import { MdSearch } from "react-icons/md";
import AllCraftRequests from "../AllCraftRequests/AllCraftRequests";
import { useState } from "react";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
const header = Arvo({ weight: ["400", "700"], subsets: ["latin"] })
const page = () => {

    const [searchTerm, setSearchTerm,] = useState("")


    const { data: craftsRequests = [], refetch, isLoading } = useQuery({
        queryKey: ["craftsRequests", searchTerm],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/craftRequests/api/allCraftRequests?search=${searchTerm}`)
            console.log(res.data)
            return res.data
        }
    })

    const handleCraftRequtsSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div>
            <div className="pt-20">
                <div className="w-[95%] md:w-[82%] mx-auto flex flex-col md:flex-row gap-5 my-6">
                    {/* search bar */}
                    <form onClick={handleCraftRequtsSearch} className="flex w-full">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search here"
                            className="input text-black rounded-sm input-bordered w-full"
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn bg-primary text-white rounded-sm">
                            <MdSearch className="text-xl" />
                            Search
                        </button>
                    </form>
                    {/* account search button   */}
                    <button className="btn bg-primary text-white rounded-sm" onClick={() => {
                        (window as any)[`account_search_modal`].showModal();
                    }}>
                        <MdSearch className="text-xl" />
                        <span className="font-thin	text-sm">Search Accounts</span>
                    </button>
                    <dialog id="account_search_modal" className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-700">✕</button>
                            </form>
                            <SearchAccounts />
                        </div>
                    </dialog>
                </div>
            </div>
            {/* banner */}
            {searchTerm === "" && (
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
            )}
            <div>

                {isLoading ? (
                    <div className="mt-40 mb-20 flex justify-center items-center">
                        <progress className="progress w-56"></progress>
                    </div>
                ) : craftsRequests.length === 0 ? (
                    <>
                        <div className="mt-14 flex flex-col justify-center items-center">
                            <img className="w-40" src="https://i.ibb.co/BVBvTvX/no-search-result-illustration-download-in-svg-png-gif-file-formats-results-empty-matches-found-zero.webp" alt="" />
                            <p className="text-center text-gray-500">Not found</p>
                        </div>
                    </>
                ) : (<AllCraftRequests craftsRequests={craftsRequests} />)
                }
            </div>
        </div>
    );
};

export default page;