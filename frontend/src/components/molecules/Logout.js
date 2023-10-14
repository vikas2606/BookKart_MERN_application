import React,{useEffect} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { logout } from "../store/actions/userActions";

function Logout() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler=()=>{
       dispatch(logout())
       navigate("/")
    }

    useEffect(() => {}, [userInfo]);

  return (
    <button class="btn" aria-current="page" onClick={logoutHandler}>
      <LogoutIcon />
    </button>
  );
}

export default Logout;
