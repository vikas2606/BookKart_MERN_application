import React, { useEffect } from 'react';
import Navbar from '../organisms/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../store/actions/bookActions';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const bookList = useSelector((state) => state.bookList);
  const { loading, books, error } = bookList;

  const userLogin=useSelector((state)=>state.userLogin)

  useEffect(() => {
    dispatch(listBooks());

    if(!userLogin){
      navigate("/")
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1>This is home</h1>
      {loading ? (
        // Show a loading indicator while data is being fetched
        <p>Loading...</p>
      ) : error ? (
        // Show an error message if there's an error
        <p>Error: {error}</p>
      ) : books ? (
        // Conditionally render the content when books is defined
        <div>
          {books.map((book) => (
            <h1 key={book._id}>{book.title}</h1>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Homepage;
