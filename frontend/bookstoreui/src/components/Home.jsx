import { Link, useNavigate, useParams } from "react-router-dom";
import BookCard from "./ui/BookCard";
import Header from "./ui/Header";
import { useEffect, useState } from "react";

const LIMIT_PER_PAGE = 12;

function Home() {

  const { page: pageNo } = useParams();
  const navigate = useNavigate();

  const [ page, setPage ] = useState();
  const [ count, setCount ] = useState();
  const [ books, setBooks ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    async function getBooks() {
      setLoading(true);
      const offset = (page - 1) * LIMIT_PER_PAGE;
      const response = await fetch(`http://localhost:5000/api/book/get?limit=${LIMIT_PER_PAGE}&offset=${offset}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.message)
        return;
      };
      setBooks(data.books);
      setCount(data.count);
      setLoading(false);
    }

    if (!isNaN(parseInt(page))) getBooks();
  }, [page]);

  useEffect(() => {
    const newPage = parseInt(pageNo);
    if (!isNaN(newPage) && newPage <= (Math.ceil(count/LIMIT_PER_PAGE))) {
      setPage(newPage)
    } else {
      setPage(1);
      navigate("/")
    };
  }, [pageNo, count]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const nextPage = () => {
    if (page < (Math.ceil(count/LIMIT_PER_PAGE))) {
      navigate(`/page/${page + 1}`);
      scrollToTop();
    }
  }

  const prevPage = () => {
    if (page > 1) {
      navigate(`/page/${page - 1}`);
      scrollToTop();
    }
  }

  return (
    <>
      <Header />
      <main className="m-2">
        <div className="flex justify-between items-center px-4 py-2 font-bold">
          <h1 className="text-md sm:text-2xl">Buy Books</h1>
          <div className="flex gap-2">
            <Link to="/orders" className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-amber-600 hover:bg-amber-700 transition-colors rounded-md text-white cursor-pointer">
              Orders
            </Link>
            <Link to="/cart" className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-pink-600 hover:bg-pink-700 transition-colors rounded-md text-white cursor-pointer">
              Cart
            </Link>
          </div>
        </div>
        { loading
          ?
          <div className="font-bold text-xl text-center">
            <h1>Loading Books...</h1>
          </div>
          :
          <>
            <div className="px-2 py-1 sm:px-4 sm:py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {books?.map((book) => (
                <BookCard key={book.slug} book={book} />
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
        }
      </main>
    </>
  );
};

export default Home;