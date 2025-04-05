import { useDispatch, useSelector } from "react-redux";
import Header from "./ui/Header";
import { Link } from "react-router-dom";
import CartCard from "./ui/CartCard";
import Spinner from "./ui/Spinner"
import { selectFullCartItems, selectFullCartTotalPrice, setFullCart } from "../store/slices/fullCartSlices";
import { selectCartItems, selectCartTotalItems, setCart } from "../store/slices/cartSlices";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../assets/options";

function Cart() {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const fullCartItems = useSelector(selectFullCartItems);
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
    <>
      <Header />
      <main>
        <div className="flex justify-between items-center px-4 py-2 font-bold">
          <h1 className="text-md sm:text-2xl">Your Cart</h1>
          <div className="flex gap-2">
            {totalItems > 0 &&
              <Link to={"/checkout"} className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white cursor-pointer">
                Checkout
              </Link>
            }
            <Link to="/orders" className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-amber-600 hover:bg-amber-700 transition-colors rounded-md text-white cursor-pointer">
              Orders
            </Link>
          </div>
        </div>
        <div className="p-2 m-2 bg-amber-200 rounded-xl border-2 border-black">
          <div className="font-medium flex justify-between sm:gap-24 sm:justify-center">
            <div className="text-center">
              <p className="text-sm">Total items</p>
              <p className="bg-black font-black text-blue-500 px-4 py-2 rounded-md">{totalItems}</p>
            </div>
            <div className="text-center">
              <p className="text-sm">Total price</p>
              <p className="bg-black font-black text-green-500 px-4 py-2 rounded-md">&#8377; {totalItemsPrice}</p>
            </div>
          </div>
        </div>
        { loading
          ?
          <div className="font-bold text-xl text-center mt-6 flex flex-col justify-center items-center">
            <Spinner />
            <h1 className="mt-6">Refreshing Cart...</h1>
          </div>
          :
          <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            { fullCartItems?.map(item =>
              <CartCard key={item.slug} book={item} />
            )}
          </div>
        }
      </main>
    </>
  );
}

export default Cart;