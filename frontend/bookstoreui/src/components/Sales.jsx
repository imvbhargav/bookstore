import { useCallback, useEffect, useState } from "react";
import Header from './ui/Header';
import OrderCard from "./ui/OrderCard";
import SaleCard from "./ui/SaleCard";
import { KOYEB_BACKEND } from "../assets/options";

function Sales() {

  const [ sales, setSales ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ totalAmount, setTotalAmount ] = useState(0);

  useEffect(() => {
    async function fetchSales() {
      setLoading(true);
      const response = await fetch(`${KOYEB_BACKEND}/api/order/get/sales`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        return;
      }
      setSales(data.sales);
      setLoading(false);
    }

    fetchSales();
  }, []);

  useEffect(() => {
    const saleTotal = sales.reduce((total, sale) => (
      total + sale.payment.amount
    ), 0)

    setTotalAmount(saleTotal);
  }, [sales]);

  const updateStatus = useCallback((value, saleId, slug) => {

    const updateDBStatus = async() => {
      const currentSales = sales;

      const response = await fetch(`${KOYEB_BACKEND}/api/order/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          saleId,
          slug,
          status: value
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        setSales(currentSales);
      }
    }

    updateDBStatus();
    setSales(sales.map(sale =>
      (sale._id === saleId && sale.book.slug === slug)
        ? { ...sale, status: value }
        : sale
    ));
  }, [sales]);

  return (
    <>
      <Header />
      <main>
        <div className="flex justify-between items-center px-4 py-2 font-bold">
          <h1 className="text-md sm:text-2xl">Your Sales</h1>
        </div>
        { !loading
        ?
        <>
          <div className="p-2 m-2 bg-amber-200 rounded-xl border-2 border-black">
            <div className="font-medium flex justify-between sm:gap-24 sm:justify-center">
              <div className="text-center">
                <p className="text-sm">Total sales</p>
                <p className="bg-black font-black text-blue-500 px-4 py-2 rounded-md">{sales.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm">Total sales value</p>
                <p className="bg-black font-black text-green-500 px-4 py-2 rounded-md">
                  &#8377; {totalAmount}
                </p>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          { sales.map(sale => (
            <SaleCard
              key={`${sale._id}${sale.book.slug}`}
              sale={sale}
              updateStatus={updateStatus}
            />
          ))}
          </div>
        </>
        :
        <div className="font-bold text-xl text-center">
          <h1>Loading Orders...</h1>
        </div>
      }
      </main>
    </>
  );
}

export default Sales;