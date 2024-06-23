import { useQuery } from "@tanstack/react-query";
import useFetch from "../../../../hooks/useFetch";
import gadgetsLogo from "../../../../assets/wellness-gadget-technology-device-equipment-innovation-electronic-svgrepo-com.svg";
import { MdPayment } from "react-icons/md";

// import bar chart
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
// import pie chart
import { PieChart, Pie } from "recharts";

// bar chart color
const colors = ["yellow", "green", "#FFBB28", "#FF8042", "red", "pink"];

//pie chart color
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const axiosHook = useFetch();
  // get admin stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin stats"],
    queryFn: async () => {
      const res = await axiosHook.get("/admin-stats");
      // console.log(res.data);
      return await res.data;
    },
  });
  // get product stats
  const { data: orderStats = [] } = useQuery({
    queryKey: ["order  stats"],
    queryFn: async () => {
      const res = await axiosHook.get("/order-stats");
      // console.log(res.data);
      return await res.data;
    },
  });
  console.log(orderStats);

  // bar chart

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // pie chart
  const pieChartData = orderStats?.map((item) => {
    return { name: item?.category, quantity: item?.quantity };
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const w = orderStats?.length * 150;
  return (
    <div>
      {/* stats  */}
      <div>
        <section className="p-4 mb-5 md:p-8  ">
          <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 lg:grid-cols-2">
            {/* user stat  */}
            <div className="bg-sky-300 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5 ">
              <div className="flex items-center  justify-center px-4  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-14 h-14 text-yellow-600"
                >
                  <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
                  <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" text-lg font-bold"> Total Customers</p>
                <p className="text-2xl font-semibold">{stats?.customer}</p>
              </div>
            </div>
{/* payment stat  */}
            <div className="bg-slate-200 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5  ">
              <div className="flex items-center justify-center px-4  ">
                <MdPayment className=" text-6xl text-green-600"></MdPayment>
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" text-lg font-bold">Total Payments</p>
                <p className="text-2xl font-semibold">{stats?.payments}</p>
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
                <p className=" font-bold text-lg">Total Earnings</p>
                <p className="text-2xl font-semibold">
                  {stats?.totalPaidAmount} $
                </p>
              </div>
            </div>
            {/* gadgets stats  */}
            <div className="bg-stone-200 h-32 text-black flex overflow-hidden rounded-lg    flex-col p-5 ">
              <div className="flex items-center justify-center px-4  ">
                <img src={gadgetsLogo} className=" h-14 w-14" alt="gadgets logo" />
              </div>
              <div className="flex items-center justify-between flex-1 p-3">
                <p className=" font-bold text-lg">Total Gadgets</p>
                <p className="text-2xl font-semibold">
                  {stats?.gadgets} 
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/*bar chart  */}
      <div className=" flex flex-col lg:flex-row gap-10">
        <div className=" w-full lg:w-[58%] overflow-x-auto">
          <BarChart
            width={w}
            height={400}
            data={orderStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Legend></Legend>
            <Tooltip key={"revenue"}></Tooltip>
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {orderStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* pie chart  */}
        <div className=" w-full lg:w-[40%] overflow-x-auto">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="quantity"
            >
              {orderStats?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
            <Tooltip></Tooltip>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
