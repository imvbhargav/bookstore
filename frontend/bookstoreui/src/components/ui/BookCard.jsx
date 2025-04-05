import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlices";
import { useState } from "react";

function BookCard({ book = null }) {

  const dispatch = useDispatch();

  const [ cartStr, setCartStr ] = useState("Add to cart");

  if (!book) {
    console.error("Please pass a reference to the book to render!");
    return;
  }

  const addToCart = () => {
    dispatch(addItem(book));
    setCartStr("Book Added");
    setTimeout(() => {
      setCartStr("Add to cart");
    }, 2000);
  }

  return (
    <div className="bg-amber-200 rounded-md border-2 border-black/50 px-2 py-1 sm:px-4 sm:py-2 flex flex-col">
      <div className="aspect-video w-full object-contain bg-white rounded-md border-2 border-amber-500">
        <img className="aspect-video object-contain w-full" src={book.image} alt="" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between">
          <p className="text-sm">{book.genre}</p>
          <p className="text-black/50 text-sm">{book.stock} left</p>
        </div>
        <p className="font-bold sm:text-lg h-14 overflow-y-scroll hide-scrollbar">{book.title}</p>
      </div>
      <p className="px-2 text-sm">Written by <span className="underline">{book.author}</span></p>
      <p className="p-2 border border-black bg-white/25 my-4 rounded-md text-sm h-24 overflow-y-scroll hide-scrollbar font-old-standard">{book.description}</p>
      <div className="flex justify-between items-center text-sm gap-2">
        <p className="text-green-200 text-center font-black bg-black p-2 rounded-md flex-1">
          &#8377; {book.price}
        </p>
        <button
          className="my-4 bg-green-500 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-green-600 cursor-pointer text-white font-bold transition-colors flex-1/2 disabled:bg-red-800 disabled:cursor-auto"
          disabled={book.stock < 1}
          onClick={addToCart}
        >{(book.stock < 1) ? 'Out Of Stock' : cartStr}</button>
      </div>
    </div>
  );
};

export default BookCard;