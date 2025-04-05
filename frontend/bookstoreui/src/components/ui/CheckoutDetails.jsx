import { useSelector } from "react-redux";
import { selectCartTotalItems, selectCartTotalPrice } from "../../store/slices/cartSlices";

function CheckoutDetails() {

  const totalItems = useSelector(selectCartTotalItems);
  const totalItemsPrice = useSelector(selectCartTotalPrice);

  return (
    <div className="p-2 font-bold">
      <div className="flex justify-between">
        <p>Total items:</p>
        <p>{totalItems}</p>
      </div>
      <div className="flex justify-between">
        <p>Total amount payable:</p>
        <p>&#8377; {totalItemsPrice}</p>
      </div>
    </div>
  );
};

export default CheckoutDetails;