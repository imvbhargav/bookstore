import { useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "../../store/slices/cartSlices";
import { BACKEND_URL } from "../../assets/options";
import { removeFullItem, updateFullItemQuantity } from "../../store/slices/fullCartSlices";

function CartCard({ book = null }) {

  const dispatch = useDispatch();

  if (!book) {
    console.error("Please pass a reference to the book to render!");
    return;
  }

  const removeFromCart = () => {
    dispatch(removeFullItem(book.slug));
    dispatch(removeItem(book.slug));
  }

  const decreaseQuantity = () => {
    dispatch(updateFullItemQuantity({ slug: book.slug, type: 'decrement' }));
    dispatch(updateItemQuantity({ slug: book.slug, type: 'decrement' }));
  }

  const increaseQuantity = () => {
    dispatch(updateFullItemQuantity({ slug: book.slug, type: 'increment' }));
    dispatch(updateItemQuantity({ slug: book.slug, type: 'increment' }));
  }

  const roundedTotalPrice = () => {
    return parseFloat((book.quantity * book.price).toFixed(2));
  }

  const checkStock = () => {
    async function check() {
      const response = await fetch(`${BACKEND_URL}/api/book/get/${book.slug}`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) {
        alert("Error, Could not check stock status.");
        return;
      }
      if (data.book.stock > book.quantity) alert(`Book is in stock! (${data.book.stock} left)`);
      else alert(`Book out of stock! (${data.book.stock} left)`);
    }

    check();
  }

  return (
    <div className="bg-amber-200 rounded-md border-2 border-black/50 px-2 py-1 sm:px-4 sm:py-2 flex flex-col justify-between">
      <div className="aspect-video w-full object-contain bg-white rounded-md border-2 border-amber-500">
        <img className="aspect-video object-contain w-full" src={book.image} alt="" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="text-sm flex justify-between">
          <p>{book.genre}</p>
          <button className="bg-white text-xs rounded-md font-medium px-2 py-1" onClick={checkStock}>Check stock</button>
        </div>
        <p className="font-bold text-md sm:text-xl">{book.title}</p>
      </div>
      <p className="px-2 mb-4">Written by <span className="underline">{book.author}</span></p>
      <div className="flex justify-between items-center pl-2 rounded-xl mr-2 bg-black/25">
        <p className="font-bold">&#8377; {book.price}</p>
        <p className="text-green-500 font-bold rounded-xl p-2 bg-black">Total: &#8377; {roundedTotalPrice()}</p>
      </div>
      <div className="flex items-center justify-between font-black bg-white/50 rounded-xl my-4 gap-2">
        <button
          className="border-2 border-red-500 px-2 py-2 rounded-md bg-red-600/50 hover:bg-red-600/75 cursor-pointer font-medium transition-colors flex-1"
          onClick={removeFromCart}
        >Remove</button>
        <button
          className="border-2 border-red-500 px-2 py-1 rounded-md hover:bg-red-600/25 cursor-pointer text-2xl transition-colors flex-1"
          onClick={decreaseQuantity}
        >-</button>
        <p className="flex-1 text-center">{book.quantity}</p>
        <button
          className="border-2 border-green-500 px-2 py-1 rounded-md hover:bg-green-600/25 cursor-pointer text-2xl transition-colors flex-1"
          onClick={increaseQuantity}
        >+</button>
      </div>
    </div>
  );
};

export default CartCard;