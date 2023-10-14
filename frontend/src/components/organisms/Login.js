import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "../atoms/Alert";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, errorMessage, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [location, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="w-full bg-blu rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="h1">Sign in to your account</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
          {errorMessage && <Alert message={errorMessage} />}
          <div>
            <input
              type="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input placeholder:text-orng"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input placeholder:text-orng "
            />
          </div>
          <button
            className="btn disabled:bg-graye"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "orange" }} />
            ) : (
              "Login"
            )}
          </button>
          <p className="p text-gray-300">
            Don't have an account yet?{" "}
            <Link
              to="/Register"
              class="font-medium text-orng hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
