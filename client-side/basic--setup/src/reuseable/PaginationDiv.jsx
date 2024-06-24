import { FaGreaterThan, FaLessThan } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PaginationDiv = ({numberOfPages,setCurrentPage,currentPage,totalPage}) => {
  //  previous page controller 
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  // next page controller 
  const handleNext = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className=" min-w-full flex justify-center gap-5 my-5 bg-slate-500 p-5">
        <button onClick={handlePrev} className=" btn">
          <FaLessThan></FaLessThan>
        </button>
        {/* eslint-disable-next-line react/prop-types */}
          {numberOfPages?.map((page) => (
            <button
            onClick={() => setCurrentPage(page)}
            className={` btn ${
              currentPage === page && "btn-warning text-white font-bold "
            } `}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNext} className=" btn">
          <FaGreaterThan></FaGreaterThan>
        </button>
        </div>
  );
};

export default PaginationDiv;