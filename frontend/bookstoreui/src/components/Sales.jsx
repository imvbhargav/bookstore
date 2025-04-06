import { useCallback, useEffect, useState } from "react";
import Header from './ui/Header';
import SaleCard from "./ui/SaleCard";
import Spinner from "./ui/Spinner";
import useFetch from '../hooks/useFetch';

function Sales() {

  const [ sales, setSales ] = useState([]);
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ noload, setNoload ] = useState(true);

  const { loading, error, get, put } = useFetch();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setNoload(false);
        const data = await get('order/get/sales');
        setSales(data.sales);
      } catch (err) {
        console.error(err);
        console.error(error);
      } finally {
        setNoload(true);
      }
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
    const updateOrderStatus = async () => {
      const currentSales = sales;
      try {
        await put('order/update', { saleId, slug, status: value });
      } catch (err) {
        console.error(err);
        console.error(error);
        setSales(currentSales);
      }
    }

    updateOrderStatus();
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
        { (loading && !noload)
          ?
          <div className="font-bold text-xl text-center mt-6 flex flex-col items-center justify-between">
            <Spinner />
            <h1 className="mt-6">Loading Sales...</h1>
          </div>
          :
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
            <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            { sales.map(sale => (
              <SaleCard
                key={`${sale._id}${sale.book.slug}`}
                sale={sale}
                updateStatus={updateStatus}
              />
            ))}
            </div>
          </>
        }
      </main>
    </>
  );
}

export default Sales;