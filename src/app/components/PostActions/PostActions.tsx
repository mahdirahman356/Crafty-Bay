import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import CraftComment from "../CraftComment/CraftComment";
import useComments from "@/app/Hooks/useComments";
import CraftLikes from "../CraftLikes/CraftLikes";
import useProfile from "@/app/Hooks/useProfile";
import axios from "axios";
import useCraftLikes from "@/app/Hooks/useCraftLikes";

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
    const [likes, likesRefetch] = useCraftLikes(crafts._id)
    const [profile] = useProfile()
    const { _id, name, email, image } = profile || {}

    const handleCraftLikes = async () => {

        const likesData = {
            postId: crafts._id,
            userData: {
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
            const res = await axios.post('http://localhost:3000/components/CraftLikes/api/likeCrafts', likesData)
            console.log(res.data)
            likesRefetch()
        } catch (error) {
          console.log("like error", error)
        }
    }

    const handleCraftUnlike = async(_id: string) =>{
          console.log(_id)
          try {
            const res = await axios.delete(`http://localhost:3000/components/CraftLikes/api/unLikeCrafts/${_id}`)
            console.log(res.data)
            likesRefetch()
          } catch (error) {
              console.log("unlike error" ,error)
          }
    }

    console.log(likes)

    const isLiked = likes.find((likes: { userData: { userId: string; }; }) => likes.userData.userId === _id)
    console.log("is liked", isLiked)

    return (
        <div className="flex justify-between text-gray-600 items-center px-4 py-2 bg-gray-100">
            {/* like */}
            <div className="flex items-center gap-1">
                {isLiked?.userData?.userId === _id
                    ? <button onClick={() => handleCraftUnlike(isLiked._id)}> 
                        <IoHeartSharp className="text-2xl text-red-500" />
                    </button>
                    : <button onClick={handleCraftLikes}>
                        <IoHeartOutline className="text-2xl" />
                    </button>}

                <button className="text-sm hover:underline"
                    onClick={() => {
                        const modal = document.getElementById(`craft_likes_modal_${crafts._id}`) as HTMLDialogElement;
                        modal?.showModal();
                    }}>
                    {likes.length}
                </button>
                <dialog id={`craft_likes_modal_${crafts._id}`} className="modal">
                    <div className="modal-box w-full max-w-3xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <CraftLikes crafts={crafts} />
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