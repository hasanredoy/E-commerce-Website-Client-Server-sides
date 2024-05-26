
// eslint-disable-next-line react/prop-types
const Discount = ({discount}) => {
  return (
    <div className=" relative w-full lg:w-1/2 my-10 mx-auto flex justify-between ">
      <div className=" text-center">
        <p className="font-bold mb-5 ">---- Hurry Up! ---</p>
         <h1 className=" text-3xl  lg:text-5xl font-bold">Get Upto <span className=" text-yellow-400">{discount}%</span> OFF  On Your First Order </h1>
      </div>
      
    </div>
  );
};

export default Discount;