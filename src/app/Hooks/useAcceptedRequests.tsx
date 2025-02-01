import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useAcceptedRequests = () => {
    const { data: session } = useSession()

    const { data: acceptedRequests = [], refetch: refetchAcceptedRequest, isLoading: isLoadingAcceptedRequest } = useQuery({
        queryKey: ["acceptedRequests", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/friends/api/acceptedRequests?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [acceptedRequests, refetchAcceptedRequest, isLoadingAcceptedRequest]
};

export default useAcceptedRequests;