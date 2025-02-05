
const useFormatDate = () => {
    
    const formatDateTime = (dateString: string) => {
       const date = new Date(dateString)
       return date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "short",
            year: "numeric",
        }) 
    }

    return {formatDateTime}
};

export default useFormatDate;