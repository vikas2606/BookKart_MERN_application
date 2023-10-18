const { useAsyncError } = require("react-router-dom");
const { Book, findHighestBookID } = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const query = req.query.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const searchQuery = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { authors: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    const books = await Book.find(searchQuery).skip(startIndex).limit(limit);
    const total = await Book.countDocuments(searchQuery);

    const response = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      books,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const createBook = asyncHandler(async (req, res) => {
  const highestBookID = await findHighestBookID();
  const bookID = highestBookID + 1;
  const {
    title,
    authors,
    language_code,
    num_pages,

    publication_date,
    publisher,
    price,
  } = req.body;

  if (!bookID) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const book = new Book({
      bookID,
      title,
      authors,

      language_code,
      num_pages,

      publication_date,
      publisher,
      price,
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
    title,
    authors,
    language_code,
    num_pages,
    publication_date,
    publisher,
  } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.authors = authors;

    book.language_code = language_code;
    book.num_pages = num_pages;

    book.publication_date = publication_date;
    book.publisher = publisher;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    res.json({ message: "Book Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = { getBooks, createBook, getBookbyId, updateBook, deleteBook };
