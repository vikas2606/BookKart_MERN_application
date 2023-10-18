import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { bookListReducer,bookCreateReducer,bookUpdateReducer } from "./reducers/bookReducers";
import { tableReducer } from "./reducers/tableReducers";
import { cartListReducer,cartCreateReducer,cartIncrementReducer,cartDecrementReducer,cartDeleteReducer } from "./reducers/cartReducers";

const persistConfig = {
  key: 'root',
  storage: storage, 
};

// Wrap your combined reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bookList: bookListReducer,
  createBook:bookCreateReducer,
  updateBook:bookUpdateReducer,
  cartList:cartListReducer,
  addToCart:cartCreateReducer,
  incrementCart:cartIncrementReducer,
  decrementCart:cartDecrementReducer,
  removeFromCart:cartDeleteReducer,
  table:tableReducer,
}));

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// Initialize the Redux store with persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  initialState,
}, composeWithDevTools(applyMiddleware(...middleware)));

// Create a persistor to handle rehydration
const persistor = persistStore(store);

export { store, persistor };
