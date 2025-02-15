import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoHeartOutline } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import CraftComment from "../CraftComment/CraftComment";

type Crafts = {
    _id: string,
    email: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        craftName: string;
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

const PostActions = ({ crafts }: { crafts: Crafts }) => {

    return (
        <div className="flex justify-between text-gray-600 items-center px-4 py-2 border-t-[1px] border-gray-300">
            {/* like */}
            <button className="flex items-center gap-1">
                <IoHeartOutline className="text-2xl" />
                <p className="text-sm">100</p>
            </button>
            {/* comment */}
            <button className="flex items-center gap-1"
                onClick={() => {
                    const modal = document.getElementById(`craft_comment_modal_${crafts._id}`) as HTMLDialogElement;
                    modal?.showModal();
                }}>
                <HiOutlineChatBubbleOvalLeftEllipsis className="text-2xl" />
                <p className="text-sm">20</p>
            </button>
            <dialog id={`craft_comment_modal_${crafts._id}`} className="modal">
                <div className="modal-box w-full max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CraftComment crafts={crafts} />
                </div>
            </dialog>
            {/* share */}
            <button className="flex items-center gap-1">
                <PiShareFat className="text-2xl" />
                <p className="text-sm">5</p>
            </button>
        </div>
    );
};

export default PostActions;