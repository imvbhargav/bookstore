import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function AdminBookCard({ book = null, refresh }) {

  const { loading, error, del } = useFetch();

  function deleteBook() {
    const deleteBySlug = async () => {
      try {
        const data = await del(`book/${book.slug}`);
        alert(data.message);
        refresh();
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }

    const result = confirm(`Are you sure you want to delete book '${book.title}'?`);
    if (result) {
      deleteBySlug();
    }
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
      <p className="p-2 border border-black bg-white/25 my-4 rounded-md text-sm h-24 overflow-y-scroll hide-scrollbar">{book.description}</p>
      <div className="flex justify-between gap-2 items-center text-sm">
        <p className="text-green-200 font-black bg-black p-2 rounded-md flex-1 text-center">
          &#8377; {book.price}
        </p>
        <div className="flex justify-between gap-1 flex-1/2">
          <Link
            to={`book/edit/${book.slug}`}
            className="my-4 bg-blue-500 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-600 cursor-pointer text-white font-bold text-center transition-colors flex-1"
            >Edit</Link>
          <button
            className="my-4 bg-red-500 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-red-600 cursor-pointer text-white font-bold transition-colors flex-1 disabled:bg-black disabled:cursor-auto"
            disabled={loading}
            onClick={deleteBook}
            >{loading ? "Deleting.." : "Delete"}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookCard;