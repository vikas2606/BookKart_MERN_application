import {  combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer,userRegisterReducer } from "./reducers/userReducers";
import { bookListReducer } from "./reducers/bookReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer,
  bookList:bookListReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore(
{  reducer,
  initialState,},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store