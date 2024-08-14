
// eslint-disable-next-line react/prop-types
const Discount = ({discount}) => {
  return (
    <div className="">
      <div className=" text-center">
        <p className="font-bold mb-5 ">---- Hurry Up! ---</p>
         <h1 className=" text-xl text-center  lg:text-3xl font-bold">Get Upto <span className=" text-[#029f82]">{discount}%</span> OFF  On Your First Order </h1>
      </div>
      
    </div>
  );
};

export default Discount;