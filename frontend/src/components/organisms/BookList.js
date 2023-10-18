import React from "react";
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "../molecules/Pagination";
import Error from "../molecules/Error";
import { listBooks } from "../store/actions/bookActions";

function BookList({ books, dispatch }) {
  const bookList = useSelector((state) => state.bookList);
  const { book_list_loading, book_list_error } = bookList;

  const headers = [
    "bookID",
    "Title",
    "Authors",
    "Rating",
    "Lan",
    "Reviews",
    "publication Date",
    "publisher",
    "price",
    " ",
  ];

  if (book_list_loading) {
    const numSkeletons = 5;
    const skeletons = Array.from({ length: numSkeletons }, (_, index) => (
      <tr key={index}>
        {headers.map((header) => (
          <td key={header}>
            <Skeleton height={80} sx={{ bgcolor: "grey.700" }} />
          </td>
        ))}
      </tr>
    ));

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 my-4">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-800">
          <TableHeader headers={headers} />
          <tbody>{skeletons}</tbody>
        </table>
      </div>
    );
  }

  
  if (!books ||  book_list_error) {
    return (
      <div className="mx-4 my-4 first-letter:bg-transparent ">
        <Error code={500} message={"Internal Server Error"} />
      </div>
    );
  }

  if (!books.books || books.books.length === 0 ) {
    return (
      <div className="mx-4 my-4 first-letter:bg-transparent ">
        <Error code={""} message={"No record Found"} />
      </div>
    );
  }




  const { currentPage, totalPages } = books;

  const handlePageChange = (newPage) => {
    dispatch(listBooks("", newPage));
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 my-4">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-800 rounded-lg">
          <TableHeader headers={headers} />
          <tbody>
            {books.books.map((book) => (
              <TableRow key={book._id} book={book} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default BookList;
