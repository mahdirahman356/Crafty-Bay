import useSellerStats from "@/app/Hooks/useSellerStats";
import { BsBoxSeam } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiChartLineUp } from "react-icons/pi";

const SellerStats = () => {
    const [sellerState] = useSellerStats()
    console.log(sellerState)
    return (
        <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-4 mb-3">
                <div className="btn btn-circle">
                  <PiChartLineUp className="text-xl"/>
                </div>
                <div>
                    <p className="text-sm md:text-base font-semibold text-start text-nowrap">{sellerState.revenue} TK</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="btn btn-circle">
                  <BsBoxSeam className="text-xl"/>
                </div>
                <div>
                    <p className="text-sm md:text-base font-semibold text-start text-nowrap">{sellerState.products}</p>
                    <p className="text-sm text-gray-500">Products</p>
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="btn btn-circle">
                  <IoBookmarkOutline className="text-xl"/>
                </div>
                <div>
                    <p className="text-sm md:text-base font-semibold text-start text-nowrap">{sellerState.orders}</p>
                    <p className="text-sm text-gray-500">Orders</p>
                </div>
            </div>
        </div>
    );
};

export default SellerStats;