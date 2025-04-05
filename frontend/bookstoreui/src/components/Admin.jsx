import { Link } from "react-router-dom";
import AdminBookCard from "./ui/AdminBookCard";
import Header from "./ui/Header";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL, LIMIT_PER_PAGE } from "../assets/options";
import Loader from "./ui/Loader";
import Spinner from "./ui/Spinner";

function Admin() {
  const [ page, setPage ] = useState(1);
  const [ count, setCount ] = useState();
  const [ books, setBooks ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ refreshCounter, setRefreshCounter ] = useState(0);

  useEffect(() => {
    async function getBooks() {
      setLoading(true);
      const offset = (page - 1) * LIMIT_PER_PAGE;
      const response = await fetch(`${BACKEND_URL}/api/book/seller/get?limit=${LIMIT_PER_PAGE}&offset=${offset}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message)
        setLoading(false);
      }
      setBooks(data.books);
      setCount(data.count);
      setLoading(false);
    }

    getBooks();
  }, [refreshCounter, page]);

  const nextPage = () => {
    if (page < (Math.ceil(count/LIMIT_PER_PAGE))) {
      setPage(prev => prev + 1);
      scrollToTop();
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      scrollToTop();
    }
  }

  const refresh = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, [setRefreshCounter])

  return (
    <>
      <Header />
      <div className="flex justify-between px-4 py-2 font-bold items-center">
        <h1 className="text-md sm:text-2xl">Admin dashboard</h1>
        <div className="flex gap-2">
          <Link to={"sales"} className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-amber-200 hover:bg-amber-400 transition-all rounded-md cursor-pointer border-2 border-amber-400">
            Sales
          </Link>
          <Link to={"book/new"} className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white cursor-pointer">
            New Book
          </Link>
        </div>
      </div>
      <p className="font-medium text-center bg-amber-200 mx-4 my-2 py-2 text-xl rounded-md">Your Book Listings</p>
      { !loading
        ?
        <>
          <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {books?.map((book) => (
            <AdminBookCard key={book.slug} book={book} refresh={refresh} />
          ))}
          </div>
          <div className="p-4 flex justify-center gap-4 font-medium">
            { (page > 1) &&
              <button className="p-2 bg-amber-200 rounded-md border-2 border-black disabled:bg-black disabled:text-white cursor-pointer disabled:cursor-auto" onClick={prevPage} disabled={page < 2}>Prev</button>
            }
            <button disabled  className="px-4 py-2 bg-amber-200 disabled:bg-black disabled:text-white rounded-md border-2 border-black">{page}</button>
            { (page < Math.ceil(count/LIMIT_PER_PAGE)) &&
              <button  className="p-2 bg-amber-200 rounded-md border-2 border-black disabled:bg-black disabled:text-white cursor-pointer disabled:cursor-auto" onClick={nextPage} disabled={page > (Math.ceil(count/LIMIT_PER_PAGE) - 1)}>Next</button>
            }
          </div>
        </>
        :
        <div className="text-center mt-6 font-medium flex flex-col justify-center items-center">
          <Spinner />
          <h1 className="text-md sm:text-xl mt-6">Loading Books...</h1>
        </div>
      }
    </>
  );
};

export default Admin;