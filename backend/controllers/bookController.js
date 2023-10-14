const { useAsyncError } = require("react-router-dom");
const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  const page=parseInt(req.query.page) || 1
  const limit=parseInt(req.query.limit) || 10

  const startIndex=(page-1)*limit
  const endIndex=page*limit

  const total =await Book.countDocuments();
  const books=await Book.find().skip(startIndex).limit(limit)

  const response={
    currentPage:page,
    totalPages:Math.ceil(total/limit),
    books,
  }

  res.json(response)

  
});

const createBook = asyncHandler(async (req, res) => {
  const {
    bookID,
    title,
    authors,
    average_rating,
    isbn,
    isbn13,
    language_code,
    num_pages,
    ratings_count,
    text_reviews_count,
    publication_date,
    publisher,
  } = req.body;

  if (!bookID) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const book = new Book({
      bookID,
      title,
      authors,
      average_rating,
      isbn,
      isbn13,
      language_code,
      num_pages,
      ratings_count,
      text_reviews_count,
      publication_date,
      publisher,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  }
});

const getBookbyId = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const {
    bookID,
    title,
    authors,
    average_rating,
    isbn,
    isbn13,
    language_code,
    num_pages,
    ratings_count,
    text_reviews_count,
    publication_date,
    publisher,
  } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.bookID = bookID;
    book.title = title;
    book.authors = authors;
    book.average_rating = average_rating;
    book.isbn = isbn;
    book.isbn13 = isbn13;
    book.language_code = language_code;
    book.num_pages = num_pages;
    book.ratings_count = ratings_count;
    book.text_reviews_count = text_reviews_count;
    book.publication_date = publication_date;
    book.publisher = publisher;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});


const deleteBook=asyncHandler(async(req,res)=>{
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    res.json({ message: "Book Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
}
)


module.exports = { getBooks, createBook, getBookbyId, updateBook,deleteBook };
