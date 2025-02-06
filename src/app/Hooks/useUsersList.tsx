import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useConversation from "./useConversation";
import useConversationFromUsers from "./useConversationFromUsers";

interface Conversation {
    conversationId: string,
    senderId: string
}

const useUsersList = () => {

    const [conversation] = useConversation()
    const [conversationFromUsers] = useConversationFromUsers()

    const Conversations = conversation.map((convo: Conversation) => {
        return convo?.conversationId;
    });

    const ConversationFromUsers = conversationFromUsers.map((convo: Conversation) => {
        return convo?.senderId;
    });

   const conversationUsers = [...Conversations, ...ConversationFromUsers]

    const { data: userList = [],refetch: refetchUserList, isLoading: isLoadingUserList, } = useQuery({
        queryKey: ["users", conversationUsers],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/api/getUser?userIds=${conversationUsers}`)
            console.log(data)
            return data
        },
    })

    return [userList, refetchUserList, isLoadingUserList]
};

export default useUsersList;