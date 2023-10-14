import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />}>
          <Route index element={<Login />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>

        <Route path="Home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
