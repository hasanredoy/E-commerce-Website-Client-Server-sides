import { Link } from "react-router-dom";
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";

const BecomeSeller = () => {
  return (
    <div className=" flex gap-5 justify-center min-h-screen items-center flex-col">
      <DynamicPageTitle dynamicTitle={"Become Seller"}></DynamicPageTitle>
      <h1 className=" text-3xl font-black text-center">
        Working on It 🛠⚒ , Please Co-Operate 💜💚..
      </h1>
      <Link to={'/'}>
        <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
          Home
        </button>
      </Link>
    </div>
  );
};

export default BecomeSeller;
