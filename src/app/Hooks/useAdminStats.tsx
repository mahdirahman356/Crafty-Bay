import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdminStats = () => {
    
    const { data: adminStats, refetch: adminStatsRefetch, isLoading: adminStatsLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/adminStats`)
            console.log(data)
            return data
        }
    })

    return [adminStats, adminStatsRefetch, adminStatsLoading]
};

export default useAdminStats;