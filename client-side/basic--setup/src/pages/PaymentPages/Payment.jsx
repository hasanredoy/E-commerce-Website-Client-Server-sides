import { loadStripe } from "@stripe/stripe-js";
import { Elements,
} from '@stripe/react-stripe-js';
import CheckOutForm from "./CheckOutForm";
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";


const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

  return (
    <div>
      <DynamicPageTitle dynamicTitle={"Payment | Dashboard"}></DynamicPageTitle>
      <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>

      </Elements>
    </div>
  );
};

export default Payment;
