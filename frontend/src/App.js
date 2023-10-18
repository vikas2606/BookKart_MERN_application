import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import Login from "./components/organisms/Login";
import Register from "./components/organisms/Register";
import Homepage from "./components/pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "./components/store/actions/bookActions";
import { useNavigate } from "react-router-dom";
import BookList from "./components/organisms/BookList";
import Root from "./components/Root";

function App() {

  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
