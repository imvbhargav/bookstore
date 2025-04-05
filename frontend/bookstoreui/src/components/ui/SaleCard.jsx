function SaleCard({ sale = null, updateStatus }) {

  if (!sale) {
    console.error("Please pass a reference to the sale to render!");
    return;
  }

  const roundedTotalPrice = () => {
    return parseFloat((sale.quantity * sale.book.price).toFixed(2));
  }

  const updateSaleStatus = (e) => {
    updateStatus(e.target.value, sale._id, sale.book.slug);
  }

  return (
    <div className="bg-amber-200 rounded-md border-2 border-black/50 p-2 flex flex-col justify-between">
      <div className="aspect-video w-full object-contain bg-white rounded-md border-2 border-amber-500 flex flex-col justify-between p-2">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-sm">{sale.book.genre}</p>
            <p className="text-sm">Order Qty: {sale.quantity}</p>
          </div>
          <p className="font-bold text-md sm:text-xl">{sale.book.title}</p>
        </div>
        <p className="mb-4">Written by <span className="underline">{sale.book.author}</span></p>
        <div className="flex justify-between gap-4 text-sm text-center font-medium">
          <p className="text-black/50">
            Current Price: &#8377; {sale.book.price}
          </p>
          <p className="">Status: {sale.status}</p>
        </div>
        <div className="flex justify-between items-center pl-2 rounded-xl bg-black/25">
          <p className="font-bold">&#8377; {sale.book.price}</p>
          <p className="text-green-500 font-bold rounded-xl p-2 bg-black">
            Total: &#8377; {roundedTotalPrice()}
          </p>
        </div>
      </div>
      <div className="text-xs font-medium py-4">
        <h2 className="text-base font-medium underline">Delivery details</h2>
        <div className="flex justify-between">
          <p className="flex-1">Name: </p>
          <p className="flex-1">{sale.delivery.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1">Address: </p>
          <p className="flex-1">{sale.delivery.address}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1">Contact No.: </p>
          <p className="flex-1">{sale.delivery.contactno}</p>
        </div>
      </div>
      <select
        value={sale.status}
        className="bg-white rounded-xl p-2 border-2 border-black font-medium"
        onChange={updateSaleStatus}
      >
        <option value={'ordered'}>Ordered</option>
        <option value={'shipped'}>Shipped</option>
        <option value={'delivered'}>Delivered</option>
      </select>
    </div>
  );
};

export default SaleCard;