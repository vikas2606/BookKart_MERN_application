import React, { useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircularProgress from "@mui/material/CircularProgress";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConvertToINR from "../atoms/ConvertToINR";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartAction } from "../store/actions/cartActions";
import { deleteBookAction, listBooks } from "../store/actions/bookActions";
import { updateBookAction } from "../store/actions/bookActions";
import Alert from "../atoms/Alert";

const TableRow = ({ book }) => {
  const addtocart = useSelector((state) => state.addToCart);
  const userLogin = useSelector((state) => state.userLogin);
  const updateBook = useSelector((state) => state.updateBook);

  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors);
  const [language_code, setLanguageCode] = useState(book.language_code);
  const [num_pages, setNumPages] = useState(book.num_pages);
  const [publication_date, setPublicationDate] = useState(
    book.publication_date
  );
  const [publisher, setPublisher] = useState(book.publisher);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { cart_create_loading, cart_create_error, cart_create_success } =
    addtocart;

  const { book_update_loading, book_update_success, book_update_error } =
    updateBook;
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsLoading(true);

    // Dispatch the action to add the book to the cart
    dispatch(AddToCartAction(book._id, 1))
      .then(() => {
        setIsLoading(false); // Set loading state back to false after success
      })
      .catch((error) => {
        setIsLoading(false); // Set loading state back to false on error
        console.error("Error adding book to cart:", error);
      });
  };

  const deleteBookHandler = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBookAction(book._id))
        .then(() => {
          dispatch(listBooks());
          console.log("Book deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting the book:", error);
        });
    }
  };

  const updateBookHandler = () => {
    dispatch(
      updateBookAction(
        book._id,
        title,
        authors,
        language_code,
        num_pages,
        publication_date,
        publisher
      )
    )
      .then(() => {
        setIsUpdating(false);
        dispatch(listBooks());
        console.log("Book updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating the book:", error);
        setIsUpdating(false)
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <tr key={book._id} className="bg-gray-800 border-b border-gray-700 ">
        <td className="px-6 py-4">{book.bookID}</td>
        <td>{book.title}</td>
        <td>{book.authors}</td>
        <td>
          <StarRoundedIcon sx={{ color: "yellow" }} /> {book.average_rating}{" "}
          <span className="w-1 h-1 mx-1.5 text-gray-400 rounded-full bg-gray-400">
            .
          </span>{" "}
          {book.ratings_count} <a>ratings</a>
        </td>
        <td className="place-content-center">
          <kbd className="kbd">{book.language_code}</kbd>
        </td>
        <td>
          <BorderColorOutlinedIcon fontSize="small" /> {book.text_reviews_count}{" "}
          <a>reviews</a>
        </td>
        <td>{formatDate(book.publication_date)}</td>
        <td>{book.publisher}</td>
        <td>{ConvertToINR(book.price)}</td>
        <td>
          {userInfo.isAdmin ? (
            <div className="flex flex-1 gap-2">
              <button
                className="hover:text-orng"
                onClick={() => {
                  setIsUpdating(true);
                }}
              >
                <EditIcon />
              </button>
              <button onClick={deleteBookHandler} className="hover:text-orng">
                <DeleteIcon />
              </button>
              <button
                className="hover:text-orng disabled:text-graye"
                disabled={cart_create_loading && isLoading}
                onClick={handleAddToCart}
              >
                {(isLoading) ? (
                  <CircularProgress size={20} style={{ color: "orange" }} />
                ) : (
                  <AddShoppingCartOutlinedIcon />
                )}{" "}
              </button>
            </div>
          ) : (
            <button
              className="btn bg-blue-700 disabled:bg-graye"
              disabled={cart_create_loading && isLoading}
              onClick={handleAddToCart}
            >
              {(isLoading )  ? (
                <CircularProgress size={20} style={{ color: "orange" }} />
              ) : (
                <AddShoppingCartOutlinedIcon />
              )}
            </button>
          )}
        </td>
      </tr>
      {isUpdating && (
        <div class="fixed backdrop-blur-sm flex items-center justify-center top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ">
          <div class="relative w-full max-w-2xl max-h-full rounded-lg z-51 ">
            <form
              class="relative bg-blu rounded-lg "
              onSubmit={updateBookHandler}
            >
              <h1>Updating book with ID:{book.bookID}</h1>
              {book_update_error && <Alert message={book_update_error} />}

              <div className=" p-4">
                <label className="label">Title</label>
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=" p-4">
                <label className="label">Author</label>
                <input
                  className="input"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                />
              </div>
              <div className=" p-4">
                <label className="label">Language Code</label>
                <input
                  className="input"
                  value={language_code}
                  onChange={(e) => setLanguageCode(e.target.value)}
                />
              </div>
              <div className=" p-4">
                <label className="label">Pages</label>
                <input
                  className="input"
                  value={num_pages}
                  onChange={(e) => setNumPages(e.target.value)}
                />
              </div>
              <div className=" p-4">
                <label className="label">Publication date</label>
                <input
                  className="input"
                  value={publication_date}
                  type="date"
                  onChange={(e) => setPublicationDate(e.target.value)}
                />
              </div>
              <div className=" p-4">
                <label className="label">Publisher</label>
                <input
                  className="input"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-end p-4">
                <button className="btn" type="submit">
                  {book_update_loading ? (
                    <CircularProgress size={20} style={{ color: "orange" }} />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  className="btn bg-transparent border-gray-500"
                  onClick={() => {
                    setIsUpdating(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TableRow;
