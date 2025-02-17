import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useComments = (postId: string) => {

    const { data: comments = [], refetch: commentRefetch, isLoading: isLoadingComments } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/components/CraftComment/api/getComment?postId=${postId}`)
            console.log(data)
            return data
        }
    })
    return [comments, commentRefetch, isLoadingComments]
};

export default useComments;