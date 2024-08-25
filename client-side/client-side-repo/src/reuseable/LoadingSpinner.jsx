import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-[calc(100dvh-0px)]'>

  <ImSpinner9 className=" animate-spin text-2xl"/>
</div>
  );
};

export default LoadingSpinner;