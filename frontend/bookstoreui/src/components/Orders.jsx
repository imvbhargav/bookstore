import { useEffect, useState } from "react";
import Header from "./ui/Header";
import { Link } from "react-router-dom";
import OrderCard from "./ui/OrderCard";
import { BACKEND_URL } from "../assets/options";
import Spinner from "./ui/Spinner";

function Orders() {

  const [ orders, setOrders ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ totalAmount, setTotalAmount ] = useState(0);

  useEffect(() => {
    const getOrders = async getOrders => {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/order/get`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        return;
      };
      setOrders(data.orders);
      setLoading(false);
    }

    getOrders();
  }, [setOrders]);

  useEffect(() => {
    const orderTotal = orders.reduce((total, order) => (
      total + order.payment.amount
    ), 0)

    setTotalAmount(orderTotal);
  }, [orders]);

  return (
    <>
      <Header />
      <main>
        <div className="flex justify-between items-center px-4 py-2 font-bold">
          <h1 className="text-md sm:text-2xl">Your Orders</h1>
          <div className="flex gap-2">
            <Link to="/cart" className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-amber-600 hover:bg-amber-700 transition-colors rounded-md text-white cursor-pointer">
              Cart
            </Link>
          </div>
        </div>
        { !loading
        ?
        <>
          <div className="p-2 m-2 bg-amber-200 rounded-xl border-2 border-black">
            <div className="font-medium flex justify-between sm:gap-24 sm:justify-center">
              <div className="text-center">
                <p className="text-sm">Total orders</p>
                <p className="bg-black font-black text-blue-500 px-4 py-2 rounded-md">{orders.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm">Total order amount</p>
                <p className="bg-black font-black text-green-500 px-4 py-2 rounded-md">&#8377; {totalAmount}</p>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          { orders.map(order => (
            <OrderCard
              key={`${order._id}${order.book.slug}`}
              book={order.book}
              quantity={order.quantity}
              status={order.status}
            />
          ))}
          </div>
        </>
        :
        <div className="font-bold text-xl text-center flex flex-col justify-center items-center">
          <Spinner />
          <h1 className="mt-6">Loading Orders...</h1>
        </div>
      }
      </main>
    </>
  );
};

export default Orders;