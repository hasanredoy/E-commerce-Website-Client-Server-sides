import { useQuery } from "@tanstack/react-query";
import useFetch from "../../../../hooks/useFetch";
import paymentLogo from "../../../../assets/online-shopping-credit-card-payment-svgrepo-com.svg"

const AdminHome = () => {
  const axiosHook = useFetch()
  // get admin stats 
  const {data:stats={}}=useQuery({
    queryKey:['admin stats'],
    queryFn:async ()=>{
      const res=await axiosHook.get("/admin-stats")
      // console.log(res.data);
      return await res.data 
    }
  })
  console.log(stats);
  return (
    <div>
      {/* stats  */}
      <div>
        <section className="p-4 my-6 md:p-8  ">
          <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
           
            <div className="bg-purple-200 text-black flex overflow-hidden rounded-lg    ">
              <div className="flex items-center justify-center px-4  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
                  <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p>Customers</p>
                <p className="text-2xl font-semibold">{stats?.customer}</p>
              </div>
            </div>

            <div className="flex overflow-hidden rounded-lg bg-slate-100 text-black    ">
              <div className="flex items-center justify-center px-4  ">
                <img className=" w-14 h-14" src={paymentLogo} alt="" />
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p>Total Payments</p> 
                <p className="text-2xl font-semibold">{stats?.payments}</p>
              </div>
            </div>
            <div className="flex overflow-hidden rounded-lg   bg-orange-200 text-black ">
              <div className="flex items-center justify-center px-4  ">
              <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="29px"
      width="25px"
    
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
      <path d="M14 11h-2.5a1.5 1.5 0 000 3h1a1.5 1.5 0 010 3H10M12 17v1m0-8v1" />
    </svg>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p>Earnings</p> 
                <p className="text-2xl font-semibold">{stats?.totalPaidAmount} {' '}$</p>
              </div>
            </div>
          
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
