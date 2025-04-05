import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalItems, setCart } from "../../store/slices/cartSlices";
import { selectFullCartTotalPrice, setFullCart } from "../../store/slices/fullCartSlices";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../assets/options";

function CheckoutDetails() {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalItemsPrice = useSelector(selectFullCartTotalPrice);

  const [ loading, setLoading ] = useState(false);

  useEffect(() => {

    const items = cartItems.map(item => item.slug);

    const getFullCartDetails = async () => {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/book/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          items,
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        setLoading(false);
        return;
      }
      const cartMap = new Map(cartItems.map(item => [item.slug, item.quantity]));
      const merged = data.books.filter(book => cartMap.has(book.slug))
      .map(book => ({
        ...book,
        quantity: cartMap.get(book.slug)
      }));
      const cartItemsFiltered = cartItems.filter(item => cartMap.has(item.slug));
      dispatch(setCart(cartItemsFiltered));
      dispatch(setFullCart(merged));
      setLoading(false);
    }

    getFullCartDetails();
  }, []);

  return (
    <div className="p-2 font-bold">
      <div className="flex justify-between">
        <p>Total items:</p>
        <p>{totalItems}</p>
      </div>
      <div className="flex justify-between">
        <p>Total amount payable:</p>
        <p>&#8377; {loading ? "loading..." : totalItemsPrice}</p>
      </div>
    </div>
  );
};

export default CheckoutDetails;