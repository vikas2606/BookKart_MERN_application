const Cart = require("../models/cartModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {Book,findHighestBookID}= require("../models/bookModel");

const addToCart = asyncHandler(async (req, res) => {
  const { bookId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400);
    throw new Error("Invalid bookId");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    const newCart = new Cart({
      user: req.user._id,
      items: [{ book: bookId, quantity, price: book.price }],
    });
    await newCart.save();
    res.status(201).json(newCart);
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ book: bookId, quantity, price: book.price });
    }
    await cart.save();
    res.json(cart);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const bookId = req.params.bookId;
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex !== -1) {
      // Remove the book from the cart
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.json(cart);
    } else {
      console.log("Book not found in the cart.");
      res.status(404).json({ message: "Book not found in the cart" });
    }
  } else {
    console.log("Cart not found.");
    res.status(404).json({ message: "Cart not found" });
  }
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.book",
    "title price"
  ); // Assuming "book" is the reference field for books in your cart items

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

const increaseQuantity = asyncHandler(async (req, res) => {
  const { bookId } = req.body; // Retrieve bookId from the request body

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400);
    console.log("400");
    throw new Error("Invalid bookId");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.book.toString() === bookId
  );
  if (itemIndex !== -1) {
    // If the book is in the cart, increase its quantity
    cart.items[itemIndex].quantity++;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Book not found in the cart" });
  }
});


const decreaseQuantity = asyncHandler(async (req, res) => {
  const { bookId } = req.body; // Retrieve bookId from the request body

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400);
    throw new Error("Invalid bookId");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.book.toString() === bookId
  );
  if (itemIndex !== -1) {
    // If the book is in the cart and the quantity is greater than 1, decrease its quantity
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity--;
    } else {
      // If the quantity is 1 or less, remove the book from the cart
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Book not found in the cart" });
  }
});


module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
};
