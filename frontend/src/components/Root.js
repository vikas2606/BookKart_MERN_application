import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SignUpPage from "./pages/SignUpPage";
import Login from "./organisms/Login";
import Register from "./organisms/Register";
import Homepage from "./pages/Homepage";
import { listBooks } from "./store/actions/bookActions";
import BookList from "./organisms/BookList";
import CartPage from "./organisms/CartPage";

function Root() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const bookList = useSelector((state) => state.bookList);
  const cartList = useSelector((state) => state.cartList);
  const addToCart = useSelector((state) => state.addToCart);
  const incrementCart = useSelector((state) => state.incrementCart);
  const decrementCart = useSelector((state) => state.decrementCart);
  const removeFromCart = useSelector((state) => state.removeFromCart);

  const { user_login_success } = userLogin;
  const { user_register_success } = userRegister;
  const { books } = bookList;
  const { carts } = cartList;

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listBooks());
  }, [userInfo]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUpPage />}>
          <Route index element={<Login />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>

        {user_login_success || user_register_success ? (
          <Route path="Home" element={<Homepage />}>
            <Route
              index
              element={<BookList books={books} dispatch={dispatch} />}
            />
            <Route
              path="cart"
              element={
                <CartPage
                  cart={carts}
                  dispatch={dispatch}
                  incrementCart={incrementCart}
                  decrementCart={decrementCart}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  cartList={cartList}
                />
              }
            />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default Root;
