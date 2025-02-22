import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import axios from "axios";

const useReceiverMessages = (conversationId?: string) => {
    
    const [profile] = useProfile();

    const { _id } = profile || {}

    const { data: receiverMessages = [], refetch: refetchReceiverMessages, isLoading: isLoadingReceiverMessages } = useQuery({
        queryKey: ["ReceiverMessages", conversationId, _id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/messagesApi/api/getMessages?senderId=${conversationId}&receiverId=${_id}`)
            console.log(data)
            return data
        }
    })


    return [receiverMessages, refetchReceiverMessages, isLoadingReceiverMessages]
};

export default useReceiverMessages;