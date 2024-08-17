
// eslint-disable-next-line react/prop-types
const Heading = ({title,description}) => {
  return (
    <div className=" text-center my-10">
      <p className="text-[#1da98f] font-bold"><b className=" ">---</b> {description} <b className=" text-[#1da98f]">---</b></p>
      <h1 className=" font-bold text-xl md:text-3xl mt-4">{title}</h1>
    </div>
  );
};

export default Heading;