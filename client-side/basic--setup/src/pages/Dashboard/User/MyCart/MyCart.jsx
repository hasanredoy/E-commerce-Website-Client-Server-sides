import useCart from "../../../../useCart/useCart";

const MyCart = () => {
  const [data,]=useCart()
  console.log(data);
  return (
    <div>
      
    </div>
  );
};

export default MyCart;