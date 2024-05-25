import { FaStar } from "react-icons/fa6";

const ReviewsPage = () => {
  const handleRating=(e)=>{
    e.preventDefault()

  }
  return (
    <div>
      <div>hellowo gfijklsf</div>
      <div>
        <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 ">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-semibold text-center">
              Your opinion matters!
            </h2>
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-center">How was your experience?</span>
            </div>
            <form onSubmit={handleRating} className="flex flex-col w-full">
              <details className="dropdown">
                <summary className="m-1 btn">Star</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li>
                    <a><FaStar></FaStar></a>
                  </li>
                  <li>
                  <a><FaStar></FaStar><FaStar></FaStar></a>
                  </li>
                  <li>
                  <a className=" flex "><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar></a>
                  </li>
                  <li>
                  <a className="flex"><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar></a>
                  </li>
                  <li>
                  <a className="flex"><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar></a>
                  </li>
                </ul>
              </details>
              <textarea
              name="review"
                rows="3"
                placeholder="Message..."
                className="p-4 rounded-md resize-none "
              ></textarea>
              <button
                type="button"
                className="py-4 my-8 font-semibold rounded-md text-gray-900 bg-violet-400"
              >
                Leave feedback
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm text-gray-400"
            >
              Maybe later
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
