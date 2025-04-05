import BookForm from "./ui/BookForm";
import Header from './ui/Header';

function AddBook() {
  return (
    <>
      <Header />
      <div className="px-4 py-2 flex flex-col items-center">
        <h2 className='font-bold text-center text-md sm:text-2xl'>Edit Book details</h2>
        <BookForm />
      </div>
    </>
  );
};

export default AddBook;