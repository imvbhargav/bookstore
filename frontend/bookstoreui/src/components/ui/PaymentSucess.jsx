import { Link } from "react-router-dom";

function PaymentSuccess({ totalItems, totalPrice, message }) {
  return (
    <div className="bg-green-200 p-5 py-10 sm:p-10 rounded-md w-[99%] md:w-2/4 flex flex-col justify-center items-center border-2 border-green-400">
      <div className="aspect-square w-32 md:w-40 rounded-full bg-green-500 flex justify-center items-center">
        <div className="grow_box bg-green-200 aspect-square rounded-full overflow-hidden flex items-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e" strokeWidth="3"
          className="checkmark"
        >
          <path
            d="M5 13L9 17L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </div>
      </div>
      <div className="w-full sm:w-2/3 flex flex-col items-center justify-center">
        <h1 className="text-green-800 font-medium mt-8">Payment Successful</h1>
        <div className="p-4 bg-white/75 w-full mt-6 rounded-md">
          <div className="w-full font-medium flex justify-between">
            <p>Items Ordered:</p>
            <p className="text-green-800 rounded-md">
              {totalItems}
            </p>
          </div>
          <div className="w-full font-medium flex justify-between">
            <p>Amount:</p>
            <p className="text-green-800 rounded-md">
              &#8377; {totalPrice}
            </p>
          </div>
          <div className="w-full font-medium flex justify-between">
            {message}
          </div>
        </div>
      </div>
      <Link to={"/orders"} className="bg-blue-500 p-2 rounded-md mt-4 font-medium hover:bg-blue-600" >
        Go To Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;