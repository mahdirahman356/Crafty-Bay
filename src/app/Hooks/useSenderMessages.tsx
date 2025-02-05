import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import axios from "axios";

const  useSenderMessages = (conversationId?: string) => {
    const [profile] = useProfile();

    const { _id } = profile || {}

    const { data: senderMessages = [], refetch: refetchSenderMessages } = useQuery({
        queryKey: ["senderMessages", _id, conversationId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/messagesApi/api/getSenderMessages?id=${_id}&conversationId=${conversationId}`)
            console.log(data)
            return data
        }
    })

    return [senderMessages, refetchSenderMessages]
};

export default useSenderMessages;