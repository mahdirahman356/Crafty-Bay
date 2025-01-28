import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useSentRequestsData = () => {
    
    const { data: session } = useSession()

    const { data: sentRequestsData = [], refetch: refetchSentRequests, isLoading: isLoadingSentRequest } = useQuery({
        queryKey: ["sentRequestsData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/requests/api/getSentRequest?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [sentRequestsData, refetchSentRequests, isLoadingSentRequest]
};

export default useSentRequestsData;