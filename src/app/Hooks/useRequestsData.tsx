import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useRequestsData = () => {
    
    const { data: session } = useSession()

    const { data: RequestsData = [], refetch, isLoading } = useQuery({
        queryKey: ["RequestsData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/requests/api/getSentRequest?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [RequestsData, refetch, isLoading]
};

export default useRequestsData;