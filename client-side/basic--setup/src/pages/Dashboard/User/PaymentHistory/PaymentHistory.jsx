import useGetAllPayments from "../../../../hooks/useGetAllPayments";

const PaymentHistory = () => {
  const [payments,] = useGetAllPayments()
  console.log(payments);
  return (
    <div>
      <h1>All Payments History</h1>
    </div>
  );
};

export default PaymentHistory;