import { Link } from "react-router-dom";

function CheckoutFail({ failure }) {
  return (
    <div className="bg-red-200 p-5 py-10 sm:p-10 rounded-md w-[99%] md:w-2/4 flex flex-col justify-center items-center border-2 border-red-400">
      <div className="aspect-square w-32 md:w-40 rounded-full bg-red-500 flex justify-center items-center">
        <div className="grow_box bg-red-200 aspect-square rounded-full overflow-hidden flex items-center p-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fb2c36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkmark">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        </div>
      </div>
      <div className="w-full sm:w-2/3 flex flex-col items-center justify-center">
        <h1 className="text-red-800 font-medium mt-8">Checkout Failed</h1>
        <p className="font-medium text-red-800">{failure?.reason}</p>
      </div>
      <Link to={"/cart"} className="bg-blue-500 p-2 rounded-md mt-4 font-medium hover:bg-blue-600" >
        Back To Cart
      </Link>
    </div>
  );
};

export default CheckoutFail;