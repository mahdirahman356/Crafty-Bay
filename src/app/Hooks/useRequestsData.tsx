import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useRequestsData = () => {
    
    const { data: session } = useSession()

    const { data: requestsData = [], refetch: refetchRequests, isLoading } = useQuery({
        queryKey: ["requestsData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/requests/api/getRequests?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [requestsData, refetchRequests, isLoading]
};

export default useRequestsData;