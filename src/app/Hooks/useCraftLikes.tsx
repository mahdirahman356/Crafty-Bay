import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCraftLikes = (postId: string) => {
    
    const { data: likes = [], refetch: likesRefetch, isLoading: isLoadinglikes } = useQuery({
        queryKey: ["likes", postId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/components/CraftLikes/api/getCraftLikes?postId=${postId}`)
            console.log(data)
            return data
        }
    })

    return [likes, likesRefetch, isLoadinglikes]
};

export default useCraftLikes;