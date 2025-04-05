import CardForm from "./CardForm";
import UserInput from "./UserInput";
import CheckoutDetails from "./CheckoutDetails";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { selectCartItems, selectCartTotalItems } from "../../store/slices/cartSlices";
import { BACKEND_URL } from "../../assets/options";
import { selectFullCartTotalPrice } from "../../store/slices/fullCartSlices";

function CheckoutForm({ failure, checkoutSuccess, paymentProcessing, handleFailure }) {

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalItemsPrice = useSelector(selectFullCartTotalPrice);

  const [ allowSubmit, setAllowSubmit ] = useState(false);
  const [ cardDetails, setCardDetails ] = useState({cardno: '', cvv: '', expiry: ''});
  const [ deliveryDetails, setDeliveryDetails ] = useState({name: '', address: '', contactno: ''});

  // Validate if all the values are properly provided.
  function validateInfo () {
    return (deliveryDetails.name.length > 1 && deliveryDetails.address.length &&
            deliveryDetails.contactno.length === 10 && cardDetails.cardno.length === 19 &&
            cardDetails.cvv.length === 3 && cardDetails.expiry.length === 7
    )
  }

  const updateCardDetails = useCallback((details) => {
    setCardDetails(details);
  }, [setCardDetails]);

  const handleDeliveryChange = (e) => {
    let { name, value } = e.target;

    function containsOnlyChars(str) {
      return  /^[a-zA-Z]+(?: [a-zA-Z]+){0,2} ?$/.test(str);
    }

    if (name === 'name') {
      if (value.length > 0) {
        if (value === ' ' || !containsOnlyChars(value)) return;
      }
    } else if (name === 'contactno') {
      if (value.length > 10) return;
    }

    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  }

  const handleSubmit = () => {

    // Check if all the information is valid.
    if (!validateInfo()) return;

    // Update status to processing.
    paymentProcessing(true);

    // Create items array with only slug and quantity .
    const items = [];
    cartItems.map(item => {
      const { slug, title, author, genre, image, price, seller, quantity } = item;
      const newItem = { slug, title, author, genre, image, price, seller: (seller ?? 'admin@mail.com'), quantity };
      items.push(newItem);
    });

    async function submitDetails() {
      const response = await fetch(`${BACKEND_URL}/api/order/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...cardDetails,
          ...deliveryDetails,
          items,
          total: totalItemsPrice
        })
      });

      const data = await response.json();
      if (!response.ok) {
        paymentProcessing(false);
        console.error(data.message);
        handleFailure(true, data.message, response.status !== 400);
        return;
      }
      handleFailure(false, data.message);
      checkoutSuccess(totalItems, totalItemsPrice);
    }

    submitDetails();
  }

  useEffect(() => {
    if (validateInfo()) setAllowSubmit(true);
    else setAllowSubmit(false);
  }, [deliveryDetails, cardDetails, setAllowSubmit]);

  if (totalItems < 1) return null;

  return (
    <div className="bg-amber-200 rounded-md w-[99%] md:w-2/4 p-2">
      <h1 className="text-md sm:text-2xl text-center border-b-2 border-black/50  font-bold">Checkout</h1>
      <CheckoutDetails />
      <div className="font-medium text-center mt-8">
        <p className="underline">Payment & delivery information</p>
        <div className="p-4 text-xs sm:text-base">
          <UserInput
            name={"name"} value={deliveryDetails.name}
            label={"Name"} onchange={handleDeliveryChange}
          />
          <CardForm details={cardDetails} updateCardDetails={updateCardDetails} />
          <UserInput
            name={"address"} value={deliveryDetails.address}
            label={"Address"} onchange={handleDeliveryChange}
          />
          <UserInput
            name={"contactno"} value={deliveryDetails.contactno}
            label={"Contact No."} onchange={handleDeliveryChange}
          />
        </div>
        <p className="text-sm text-red-600 font-medium h-8">{failure.reason}</p>
        <button
          className="mb-2 bg-green-500 rounded-md px-4 py-2 border-2 border-black hover:bg-green-600 disabled:bg-black disabled:hover:scale-100 disabled:cursor-auto transition-all hover:scale-105 cursor-pointer text-white"
          disabled={!allowSubmit && totalItemsPrice > 0}
          onClick={handleSubmit}
        >Process Payment</button>
      </div>
    </div>
  );
}

export default CheckoutForm;