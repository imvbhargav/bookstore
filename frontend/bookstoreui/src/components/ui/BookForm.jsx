import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KOYEB_BACKEND } from '../../assets/options';

function BookForm() {

  const newBook = { title: '', author: '', genre: '', description: '', price: '', stock: '' };

  const navigate = useNavigate();
  const { slug } = useParams();

  const imageUploadRef = useRef(null);

  const [ book, setBook ] = useState(null);
  const [ bookSlug, setBookSlug ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setBook(prev => ({...prev, [name]: value}));
  }

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    if (selectedImage) setImagePreviewUrl(URL.createObjectURL(selectedImage));
    else setImagePreviewUrl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    function validBookDetails() {
      const { title, author, genre, description, price, stock } = book;
      return !(title.length < 2 || author.length < 2 || genre.length < 2 || description.length < 2 || isNaN(parseFloat(price)) || isNaN(parseFloat(stock)));
    }

    async function submitBook() {
      const formData = new FormData();

      Object.keys(book).forEach(key => {
        formData.append(key, book[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      if (bookSlug && bookSlug !== '') {
        formData.append("slug", bookSlug);
      }

      const response = await fetch(`${KOYEB_BACKEND}/api/book/add`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) return;
      const data = await response.json();
      alert(data.message);
      setLoading(false);
      navigate('/admin');
    }

    if (book && validBookDetails()) {
      submitBook();
    }
  };

  const handleImageAddClick = (e) => {
    e.preventDefault();
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  }

  const handleImageRemoveClick = (e) => {
    e.preventDefault();
    setImage(null);
    setImagePreviewUrl(null);
  }

  useEffect(() => {

    const getBook = async () => {
      setLoading(true);
      const response = await fetch(`${KOYEB_BACKEND}/api/book/get/${slug}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        navigate('/admin/book/new');
        alert(data.message);
      } else {
        const { image, slug: bookslug, ...book } = data.book;
        setImagePreviewUrl(image);
        setBookSlug(bookslug);
        setBook(book);
      };
      setLoading(false);
    }

    if (slug) getBook();
  }, []);

  const inputStyle = "border-2 border-black/50 rounded-md px-2 py-1 sm:px-4 sm:py-2";

  return (
    <form onSubmit={handleSubmit} className='w-[90%] lg:w-1/2 flex flex-col md:flex-row justify-center bg-amber-200 px-2 py-1 sm:px-4 sm:py-2 border-2 border-black rounded-md mt-4 font-medium'>
      <div className='px-2 py-1 sm:px-4 sm:py-2 flex-1/3'>
        <label htmlFor='image'>Book Cover</label>
        <div className='w-full max-w-80 border-2 border-amber-600 aspect-video object-contain bg-white rounded-md'>
          <img src={imagePreviewUrl??'https://placehold.co/640x400?text=Book+Cover'} alt='' className='w-full rounded-md aspect-video object-contain' />
        </div>
        <div className='flex gap-1 mt-4'>
          <button className='border-2 border-green-500 rounded-md px-2 py-1 hover:text-green-500 cursor-pointer' onClick={handleImageAddClick} >Add</button>
          <button className='border-2 border-red-500 rounded-md px-2 py-1 hover:text-red-500 cursor-pointer' onClick={handleImageRemoveClick} >Remove</button>
        </div>
        <input disabled={loading} className='hidden' ref={imageUploadRef} id='image' type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className='flex flex-col px-2 py-1 sm:px-4 sm:py-2 sm:w-xl flex-1/2'>
        <label className='text-sm' htmlFor='title'>Title:</label>
        <input disabled={loading} className={inputStyle} id='title' type="text" name="title" value={book?.title ?? ''}autoComplete='off' onChange={handleInputChange} />
        <label className='text-sm' htmlFor='author'>Author:</label>
        <input disabled={loading} className={inputStyle} id='author' type="text" name="author" value={book?.author ?? ''} autoComplete='off' onChange={handleInputChange} />
        <label className='text-sm' htmlFor='genre'>Genre:</label>
        <input disabled={loading} className={inputStyle} id='genre' type="text" name="genre" value={book?.genre ?? ''} autoComplete='off' onChange={handleInputChange} />
        <label className='text-sm' htmlFor='description'>Description:</label>
        <input disabled={loading} className={inputStyle} id='description' type="text" name="description" value={book?.description ?? ''} autoComplete='off' onChange={handleInputChange} />
        <label className='text-sm' htmlFor='price'>Price:</label>
        <input disabled={loading} className={inputStyle} id='price' type="number" name="price" value={book?.price ?? ''} autoComplete='off' onChange={handleInputChange} />
        <label className='text-sm' htmlFor='stock'>Stock:</label>
        <input disabled={loading} className={inputStyle} id='stock' type="number" name="stock" value={book?.stock ?? ''} autoComplete='off' onChange={handleInputChange} />
        <button disabled={loading} type="submit" className='bg-green-500 hover:bg-green-600 border-2 border-black rounded-md mt-4 px-2 py-1 sm:px-4 sm:py-2 text-white cursor-pointer disabled:bg-black disable:hover:bg-black'>{loading ? "Processing..." : "Submit"}</button>
      </div>
    </form>
  );
}

export default BookForm;