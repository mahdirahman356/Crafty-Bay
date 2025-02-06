import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import axios from "axios";

const useConversationFromUsers = () => {
    
    const [profile,] = useProfile();

    const { _id } = profile || {}

    const { data: conversationFromUsers = [], refetch: refetchConversationFromUsers } = useQuery({
        queryKey: ["conversationFromUsers", _id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/messagesApi/api/getConversation?conversationId=${_id}`)
            console.log(data)
            return data
        }
    })

    return [conversationFromUsers, refetchConversationFromUsers]
};

export default useConversationFromUsers;