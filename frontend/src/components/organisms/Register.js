import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/userActions";


function Register() {
  const navigate = useNavigate();
  const location=useLocation()
  const dispatch=useDispatch()

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage]=useState("")

  const userRegister=useSelector((state)=>state.userRegister)
  const {loading,errorMessage,userInfo}=userRegister

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [location, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(first_name,last_name,email,password));
  };



  return (
    <div className="w-full bg-blu rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="h1">Sign in to your account</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
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
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
          </div>
          <button className="btn" type="submit">
            Register
          </button>
          <p className="p text-gray-300">
            Already have an account{" "}
            <Link
              to="/Login"
              class="font-medium text-orng hover:underline dark:text-primary-500"
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
