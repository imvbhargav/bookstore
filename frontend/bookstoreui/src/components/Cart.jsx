import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalItems, selectCartTotalPrice } from "../store/slices/cartSlices";
import Header from "./ui/Header";
import { Link } from "react-router-dom";
import CartCard from "./ui/CartCard";

function Cart() {

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalItemsPrice = useSelector(selectCartTotalPrice);

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
        <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          { cartItems.map(item =>
            <CartCard key={item.slug} book={item} />
          )}
        </div>
      </main>
    </>
  );
}

export default Cart;