import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalItems, setCart } from "../../store/slices/cartSlices";
import { selectFullCartTotalPrice, setFullCart } from "../../store/slices/fullCartSlices";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function CheckoutDetails() {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalItemsPrice = useSelector(selectFullCartTotalPrice);

  const { loading, error, post } = useFetch()

  useEffect(() => {

    const items = cartItems.map(item => item.slug);

    const getFullCartDetails = async () => {
      try {
        const data = await post('book/cart', { items }, true);

        // Add the quantity stored in localStorage back
        // to the freshly fetched ( possibly updated ) books.
        const cartMap = new Map(cartItems.map(item => [item.slug, item.quantity]));
        const merged = data.books.filter(book => cartMap.has(book.slug))
        .map(book => ({
          ...book,
          quantity: cartMap.get(book.slug)
        }));

        // If some books details were not fetched ( possibly deleted ) remove from
        // local state which removes the valus from localStorage.
        const bookMap = new Map(data.books.map(book => [book.slug, book]));
        const cartItemsFiltered = cartItems.filter(item => bookMap.has(item.slug));

        // Dispatch the state changes.
        dispatch(setCart(cartItemsFiltered));
        dispatch(setFullCart(merged));
      } catch (err) {
        console.error(error);
        console.error(err);
      }
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