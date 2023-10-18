import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../atoms/Alert";
import { createBookAction} from "../store/actions/bookActions";

function AddBook({ isAddBookOpen, setAddBookOpen }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [language_code, setLanguageCode] = useState("");
  const [num_pages, setNumPages] = useState("");
  const [publication_date, setPublicationDate] = useState("");
  const [publisher, setPublisher] = useState("");

  const createBook = useSelector((state) => state.createBook);

  const { book_create_loading, book_create_success, book_create_error } =
    createBook;

  const dispatch = useDispatch();

  const addBookHandler = () => {
    dispatch(
      createBookAction(
        title,
        authors,
        language_code,
        num_pages,
        publication_date,
        publisher
      )
    );
    if (book_create_success) {
      setAddBookOpen(false);
    }
  };

  return (
    <div class="fixed backdrop-blur-sm flex items-center justify-center top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ">
      <div class="relative w-full max-w-2xl max-h-full rounded-lg z-51 ">
        <form class="relative bg-blu rounded-lg " onSubmit={addBookHandler}>
          {book_create_error && <Alert message={book_create_error} />}
          <div className=" p-4">
            <input
              placeholder="Title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className=" p-4">
            <input
              placeholder="Author"
              className="input"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>
          <div className=" p-4">
            <input
              placeholder="Language Code"
              className="input"
              value={language_code}
              onChange={(e) => setLanguageCode(e.target.value)}
            />
          </div>
          <div className=" p-4">
            <input
              placeholder="Pages"
              className="input"
              value={num_pages}
              onChange={(e) => setNumPages(e.target.value)}
            />
          </div>
          <div className=" p-4">
            <input
              placeholder="Publication Date"
              type="date"
              className="input"
              value={publication_date}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
          </div>
          <div className=" p-4">
            <input
              placeholder="Publisher"
              className="input"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-end p-4">
            <button className="btn" type="submit">
              {book_create_loading ? (
                <CircularProgress size={20} style={{ color: "orange" }} />
              ) : (
                "Create"
              )}
            </button>
            <button
              className="btn bg-transparent border-gray-500"
              onClick={() => {
                setAddBookOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
