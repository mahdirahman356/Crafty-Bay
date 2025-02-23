/* eslint-disable @next/next/no-img-element */

import PostDetails from "@/app/components/PostDetails/PostDetails";
import Link from "next/link";


type Craft = {
    _id: string,
    email: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        craftName: string,
        title: string,
        description: string,
        price: string,
        location: string,
        image: string,
        date: string,
    };
}

const Craft = ({ craft }: { craft: Craft }) => {

    const { _id, email, userData, postData } = craft || {}
    console.log(postData.title)


    return (
        <div>
            <div className="flex justify-between items-start">

                {/* user profile */}

                <Link href={`/usersProfile/${email}`}>
                    <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                        <img
                            className="object-cover w-10 h-10 rounded-full"
                            alt="user-image"
                            src={userData.userImage ? userData.userImage : "/image/user.avif"} />
                        <div>
                            <p className="font-semibold text-start">{userData.name}</p>
                            <div className="flex gap-2 text-nowrap">
                                <p className="text-sm text-gray-500 text-nowrap">{postData.date.split('T')[0]}</p>
                                <p className="text-sm text-gray-500 text-nowrap">{postData.date.split('T')[1].split('.')[0]}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <button className="" onClick={() => {
                const dialogElement = document.getElementById(`my_modal_my_post_${_id}`) as HTMLDialogElement;
                dialogElement.showModal();
            }}><span className="">
                    <figure>
                        <img
                            src={postData.image}
                            alt="post"
                            className="w-52 md:w-72 object-cover h-56 rounded-xl"
                        />
                    </figure>
                </span></button>
            <dialog id={`my_modal_my_post_${_id}`} className="modal">
                <div className="modal-box w-full max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    </form>
                    <PostDetails id={_id} />
                </div>
            </dialog>
        </div>
    );
};

export default Craft;