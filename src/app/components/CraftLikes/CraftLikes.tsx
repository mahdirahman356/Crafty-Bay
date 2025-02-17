import { FaHandHoldingHeart } from "react-icons/fa";




const CraftLikes = () => {
    return (
        <div>
            <h2 className="font-semibold text-center my-2 text-2xl">Likes</h2>
            <div className="my-16 flex gap-2 flex-col justify-center items-center">
                <FaHandHoldingHeart className="text-4xl"/>
                <p className="text-gray-500 text-center text-sm">No likes yet</p>
            </div>
        </div>
    );
};

export default CraftLikes;