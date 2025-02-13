/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdSearch } from "react-icons/md";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
import Link from "next/link";

interface CraftNavbarProps {
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setSearchTerm: (value: string) => void;
    cartData: any[];
    sortOrder: string

}

const CraftPageNavbar: React.FC<CraftNavbarProps> = ({
    handleSearch,
    handleSortChange,
    setSearchTerm,
    cartData,
    sortOrder = ""
}) => {
    return (
        <div className="pt-20">
        <div className="w-[95%] md:w-[82%] flex flex-col md:flex-row gap-5 mx-auto my-6">
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
                <div className="flex justify-center items-start">
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-gray-200">
                                <div className="indicator text-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm bg-gray-200 indicator-item text-primary">{cartData.length}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">{cartData.length} Items</span>
                                    <div className="card-actions">
                                        <Link href={"/deshboard/myCart"} className="w-full" prefetch={true}>
                                            <button className="btn btn-primary btn-block font-thin text-sm text-white rounded-sm">View cart</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
    );
};

export default CraftPageNavbar;