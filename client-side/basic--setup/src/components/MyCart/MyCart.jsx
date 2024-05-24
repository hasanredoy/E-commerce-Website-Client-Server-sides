import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { MainContext } from "../auth-provider/AuthProvider";

const MyCart = () => {
  const {user} = useContext(MainContext)
  const axiosHook = useFetch()
const [myCartData , setMyCartData] = useState([])
useEffect(()=>{
  // axiosHook.get(`/carts?email=${user?.email}`)
  axiosHook.get(`/carts?email=heloo@gmail.com`)
  .then(res=>{
    setMyCartData(res.data)
  })
},[axiosHook , user])
console.log(myCartData);
  return (
    <div>
      <div>
        {myCartData?.map(card => <div key={card._id} className="card card-side bg-base-100 shadow-xl h-96 w-[90%] my-5">
  <figure><img src={card?.cart?.image} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div>)}
      </div>
    </div>
  );
};

export default MyCart;