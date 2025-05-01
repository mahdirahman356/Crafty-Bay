import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSellerStats = () => {
     
    const {data: sellerState} = useQuery({
        queryKey: ["sellerState"],
        queryFn: async () => {
            const { data} = await axios.get(`http://localhost:3000/deshboard/profile/api/sellerStats`)
            console.log(data)
            return data
        }
    })

    return [sellerState]
};

export default useSellerStats;