import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useReceivedRequests = () => {
    const { data: session } = useSession()

    const { data: recevedRequestsData = [], refetch: refetchRecevedRequests, isLoading: isLoadingRecevedRequests } = useQuery({
        queryKey: ["recevedRequestsData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/friends/api/receivedRequests?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [recevedRequestsData, refetchRecevedRequests, isLoadingRecevedRequests]
};

export default useReceivedRequests;