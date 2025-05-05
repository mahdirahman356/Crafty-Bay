'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSellers = () => {

    const { data: sellers } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/sellers/api/sellers`)
            console.log(data)
            return data
        }   
    })

    return [sellers]
};

export default useSellers;