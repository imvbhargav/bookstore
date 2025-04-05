function OrderCard({ book = null, quantity, status }) {

  if (!book) {
    console.error("Please pass a reference to the book to render!");
    return;
  }

  const roundedTotalPrice = () => {
    return parseFloat((quantity * book.price).toFixed(2));
  }

  return (
    <div className="bg-amber-200 rounded-md border-2 border-black/50 px-2 py-1 sm:px-4 sm:py-2 flex flex-col justify-between">
      <div className="text-xs font-bold flex justify-between p-2 rounded-md bg-green-200 border-2 border-green-600 mb-2">
        <p>Status:</p>
        <p>{status.toUpperCase()}</p>
      </div>
      <div className="aspect-video w-full object-contain bg-white rounded-md border-2 border-amber-500">
        <img className="aspect-video object-contain w-full" src={book.image} alt="" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between text-xs">
          <p>{book.genre}</p>
          <p>Order Qty: {quantity}</p>
        </div>
        <p className="font-bold text-lg">{book.title}</p>
      </div>
      <p className="px-2 mb-4 text-sm">Written by <span className="underline">{book.author}</span></p>
      <div className="flex justify-between gap-4 px-2 text-xs text-center font-medium">
        <p className="text-black/50">
          Current Price: &#8377; {book.price}
        </p>
      </div>
      <div className="flex justify-between items-center pl-2 rounded-xl mr-2 bg-black/25 text-sm">
        <p className="font-bold">&#8377; {book.price}</p>
        <p className="text-green-500 font-bold rounded-xl p-2 bg-black">Total: &#8377; {roundedTotalPrice()}</p>
      </div>
    </div>
  );
};

export default OrderCard;