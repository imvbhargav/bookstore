function ProcessPayment({ totalPrice }) {
  return (
    <div className="bg-amber-200 p-10 rounded-md w-[99%] md:w-2/4 flex flex-col justify-center items-center">
      <div className="aspect-square w-32 md:w-40 rounded-full bg-linear-to-r from-transparent from-40% to-blue-500 flex justify-center items-center animate-spin">
        <div className="w-[90%] bg-amber-200 aspect-square rounded-full"></div>
      </div>
      <h1 className="text-green-800 font-medium mt-8">Processing Payment...</h1>
      <p className="font-medium mt-2 ">Amount Deductable: <span className="text-green-800 underline rounded-md">&#8377; {totalPrice}</span></p>
    </div>
  );
};

export default ProcessPayment;