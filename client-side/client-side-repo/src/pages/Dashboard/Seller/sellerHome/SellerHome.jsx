import Heading from "../../../../reuseable/Heading";
import gadgetsLogo from "../../../../assets/wellness-gadget-technology-device-equipment-innovation-electronic-svgrepo-com.svg";
import { FaStar } from "react-icons/fa";
import useFetch from "../../../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";



const SellerHome = () => {
  const axiosHook = useFetch()

  const {user}= useAuth()
  const {data:loadSellerStats={}}=useQuery({
    queryKey:['seller stats',user],
    queryFn:async()=>{
      const{data} = await axiosHook.get(`/seller-stats/${user?.email}`)
      console.log(data);
      return data
    }
  })

  const stats ={
    totalListedItem:loadSellerStats?.items,
    totalSell: loadSellerStats?.sell,
    totalReview:3,
  }
  return (
    <main>
      <Heading description={'Hello There'} title={'Welcome Back'}></Heading>
         {/* stats  */}
         <div>
        <section className="p-4 mb-5 md:p-8  ">
          <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 lg:grid-cols-2">
      
{/* payment stat  */}
            <div className="bg-slate-200 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5  ">
              <div className="flex items-center justify-center px-4  ">
                <FaStar className=" text-6xl text-green-600"></FaStar>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" text-lg font-bold">Total Reviews</p>
                <p className="text-2xl font-semibold">{stats?.totalReview}</p>
              </div>
            </div>
            {/* Earnings stats  */}
            <div className="bg-green-200 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5 ">
              <div className="flex items-center justify-center px-4  ">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="55px"
                  width="55px"
                  className=" text-yellow-400"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                  <path d="M14 11h-2.5a1.5 1.5 0 000 3h1a1.5 1.5 0 010 3H10M12 17v1m0-8v1" />
                </svg>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" font-bold text-lg">Total Sell</p>
                <p className="text-2xl font-semibold">
                  {stats?.totalSell} $
                </p>
              </div>
            </div>
            {/* gadgets stats  */}
            <div className="bg-stone-200 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5 ">
              <div className="flex items-center justify-center px-4  ">
                <img src={gadgetsLogo} className=" h-14 w-14" alt="gadgets logo" />
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" font-bold text-lg">Total Added Item</p>
                <p className="text-2xl font-semibold">
                  {stats?.totalListedItem} 
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SellerHome;