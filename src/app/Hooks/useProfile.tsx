import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useProfile = () => {

        const { data: session } = useSession()
    
    
    const { data: profile = [], isLoading, refetch } = useQuery({
        queryKey: ["profile", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    return [profile, refetch, isLoading]
};

export default useProfile;