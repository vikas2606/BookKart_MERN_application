import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import Register from "../organisms/Register";
import Login from "../organisms/Login";
import { Outlet } from "react-router-dom";

function SignUpPage({location}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/Home");
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
  };

  return (
    <section className="bg-dark-blu">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div>
          <a className="heading">BookKart</a>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
