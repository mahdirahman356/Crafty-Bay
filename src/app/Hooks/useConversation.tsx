import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import axios from "axios";

const useConversation = () => {
    
    const [profile,] = useProfile();

    const { _id } = profile || {}

    const { data: conversation = [] } = useQuery({
        queryKey: ["conversation", _id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/messagesApi/api/getConversation?id=${_id}`)
            console.log(data)
            return data
        }
    })

    return [conversation]
};

export default useConversation;