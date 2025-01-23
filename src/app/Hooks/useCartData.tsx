import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useCartData = () => {
    
    const { data: session } = useSession()


    const { data: cartData = [], isLoading, refetch } = useQuery({
        queryKey: ["cartData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/myCart/api/cartData?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })


    return [cartData, refetch, isLoading]
};

export default useCartData;