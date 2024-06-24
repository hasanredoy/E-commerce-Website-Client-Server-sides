//  previous page controller 
 export const handlePrev = (currentPage,setCurrentPage) => {
  console.log(currentPage,setCurrentPage);
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};
// next page controller 
 export const handleNext = (currentPage,setCurrentPage,totalPage) => {
  if (currentPage < totalPage - 1) {
    setCurrentPage(currentPage + 1);
  }
};

