import axios from "axios";

let axiosCommon = axios.create({
    baseURL: 'http://localhost:3000'
})
const useAxiosCommon = () => {
    return axiosCommon
};

export default useAxiosCommon;  