
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdSearch } from "react-icons/md";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
import Link from "next/link";

interface SmallDeviceCraftNavbarProps {
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setSearchTerm: (value: string) => void;
    cartData: any[];
    sortOrder: string

}

const SmallDeviceCraftNavbar: React.FC<SmallDeviceCraftNavbarProps> = ({
    handleSearch,
    handleSortChange,
    setSearchTerm,
    cartData,
    sortOrder = ""
}) => {

    return (
        <div className="pt-14">
            <div className="w-[95%] flex flex-col md:flex-row gap-3 mx-auto my-6">
                {/* search bar */}
                <form onSubmit={handleSearch}>
                    <label className="input input-sm bg-gray-200 rounded-3xl flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </form>

                <div className="flex items-center gap-3 w-full">
                    {/* account search bar */}
                    <div>
                        <button className="" onClick={() => {
                            (window as any)[`small_device_account_search_modal`].showModal();
                        }}>
                            <MdSearch className="text-xl text-gray-600" />
                        </button>
                        <dialog id="small_device_account_search_modal" className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <SearchAccounts />
                            </div>
                        </dialog>
                    </div>
                    {/* sort */}
                    <select
                        className="select select-sm bg-gray-200 font-thin text-sm text-gray-500 rounded-3xl w-full max-w-xs "
                        value={sortOrder}
                        onChange={handleSortChange}>
                        <option value="" disabled selected>Sort By Price</option>
                        <option value="priceLowHigh">Product Price: Low to High</option>
                        <option value="priceHighLow">Product Price: High to Low</option>
                    </select>
                    {/* shop count */}
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

export default SmallDeviceCraftNavbar;