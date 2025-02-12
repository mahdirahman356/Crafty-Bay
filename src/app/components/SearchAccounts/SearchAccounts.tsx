"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SearchAccounts = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [accountSearch, setAccountSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { data: allUsers = [], refetch, isLoading } = useQuery({
    queryKey: ["allUsers", accountSearch],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/users/api/allUsers?search=${accountSearch}`
      );
      return res.data;
    },
    enabled: !!accountSearch, // Prevents unnecessary fetches when search is empty
  });

  const handleAccountSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAll(false);
    refetch();
  };

  const usersToShow = showAll ? allUsers : allUsers.slice(0, 4);

  const handleRedirectMessagePage = (_id: string) => {
    router.push(`/messages/conversation/${_id}`);
    const modal = document.getElementById(
      "account_search_modal"
    ) as HTMLDialogElement;
    modal?.close();
  };

  return (
    <div>
        {pathName.includes("message") 
        && <h3 className="text-center text-2xl font-semibold text-gray-700 my-2">Search For Chat</h3>} 
      <form onSubmit={handleAccountSearch} className="mt-5">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow text-black"
            placeholder="Search"
            value={accountSearch}
            onChange={(e) => setAccountSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 text-gray-600"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>

      {accountSearch === "" ? (
        <div className="my-8 flex flex-col gap-2 justify-center items-center text-center">
          <img
            className="w-28"
            src="https://i.ibb.co/Yhj9rP1/search-image.png"
            alt="Search illustration"
          />
          <p className="text-gray-500">Search Accounts</p>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="my-24 flex justify-center items-center">
              <progress className="progress w-56"></progress>
            </div>
          ) : allUsers.length === 0 ? (
            <div className="my-8 flex flex-col gap-2 justify-center items-center">
              <img
                className="w-28"
                src="https://i.ibb.co/BVBvTvX/no-search-result-illustration-download-in-svg-png-gif-file-formats-results-empty-matches-found-zero.webp"
                alt="No results found"
              />
              <p className="text-center text-gray-500">Not found</p>
            </div>
          ) : (
            <div>
              {usersToShow.map((user: any) => (
                <div key={user._id} className="flex justify-between items-center p-3 hover:bg-gray-100">
                  <Link href={`/usersProfile/${user.email}`} prefetch={true}>
                    <div className="flex items-center gap-4">
                      <img
                        className="object-cover border w-10 h-10 rounded-full"
                        alt="user-image"
                        src={user.image ? user.image : "/image/user.avif"}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-start">{user.name}</p>
                        <p className="text-sm text-start text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  </Link>
                      {pathName.includes("messages") && (
                        <button
                          className="btn btn-sm text-xs text-primary"
                          onClick={() => handleRedirectMessagePage(user._id)}
                        >
                          Message
                        </button>
                      )}
                </div>
              ))}

              {allUsers.length > 4 && !showAll && (
                <div className="text-center mt-4">
                  <button onClick={() => setShowAll(true)}>
                    <span className="flex items-center font-thin text-sm text-blue-500 my-2">
                      see more
                      <LuChevronDown className="text-[18px] pt-1" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAccounts;
