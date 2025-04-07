import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useChartData = () => {
    
    const {data: chartData = []}= useQuery({
        queryKey: [],
        queryFn: async () => {
            const {data} = await axios.get("http://localhost:3000/deshboard/deshboardComponents/Chart/api/orderStats")
            console.log(data)
        }
    })

    return [chartData]
};

export default useChartData;