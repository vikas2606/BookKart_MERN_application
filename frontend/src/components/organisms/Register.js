import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";

import Alert from "../atoms/Alert";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { register_loading, register_error, register_userInfo } = userRegister;

  useEffect(() => {
    if (register_userInfo) {
      navigate("/home");
    }
  }, [register_userInfo]);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (first_name && last_name && email && password && confirmPassword) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [first_name, last_name, email, password, confirmPassword]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(first_name, last_name, email, password));
  };

  return (
    <div className="w-full bg-blu rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="h1">Sign in to your account</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
          {register_error && <Alert message={register_error} />}
          <div>
            <input
              className="input placeholder:text-orng"
              required
              placeholder="First Name"
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="input placeholder:text-orng"
              required
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="email"
              className="input placeholder:text-orng"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              className="input placeholder:text-orng"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              className="input placeholder:text-orng"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="btn disabled:bg-graye"
            type="submit"
            disabled={!passwordsMatch || !allFieldsFilled}
          >
            {register_loading ? (
              <CircularProgress size={20} style={{ color: "orange" }} />
            ) : (
              "Register"
            )}
          </button>
          <p className="p text-gray-300">
            Already have an account{" "}
            <Link
              to="/Login"
              className="font-medium text-orng hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
