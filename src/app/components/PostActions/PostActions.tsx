import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoHeartOutline } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import CraftComment from "../CraftComment/CraftComment";
import useComments from "@/app/Hooks/useComments";
import CraftLikes from "../CraftLikes/CraftLikes";
import useProfile from "@/app/Hooks/useProfile";
import axios from "axios";

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

    const [comments] = useComments(crafts._id)
    const [profile] = useProfile()
    const {_id, name, email, image} = profile || {}

    const handleCraftLikes = async() => {

        const likesData = {
            postId: crafts._id,
            userData:{
               userId: _id,
               email: email,
               name: name,
               image: image
            },
            status: "like",
            date: new Date()
     }
     console.log(likesData)   

        try {
            const res = await axios.post('http://localhost:3000/components/CraftLikes/api/likeInCrafts', likesData )
            console.log(res.data)
        } catch (error) {
            
        }
    }

    return (
        <div className="flex justify-between text-gray-600 items-center px-4 py-2 bg-gray-100">
            {/* like */}
            <div className="flex items-center gap-1">
                <button onClick={handleCraftLikes}>
                <IoHeartOutline className="text-2xl" />
                </button>
                <button className="text-sm hover:underline"
                    onClick={() => {
                        const modal = document.getElementById(`craft_likes_modal_${crafts._id}`) as HTMLDialogElement;
                        modal?.showModal();
                    }}>100
                </button>
                <dialog id={`craft_likes_modal_${crafts._id}`} className="modal">
                    <div className="modal-box w-full max-w-3xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <CraftLikes/>
                    </div>
                </dialog>
            </div>
            {/* comment */}
            <button className="flex items-center gap-1"
                onClick={() => {
                    const modal = document.getElementById(`craft_comment_modal_${crafts._id}`) as HTMLDialogElement;
                    modal?.showModal();
                }}>
                <HiOutlineChatBubbleOvalLeftEllipsis className="text-2xl" />
                <p className="text-sm">{comments.length}</p>
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