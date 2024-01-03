import React, { useEffect, useState } from "react";
import { BiSolidTime } from "react-icons/bi";
import { useSelector } from "react-redux";
import clock2 from "../asset/Vector (1).png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar2 = () => {
  const { user } = useSelector((state) => state.login);
  const [cookie, setcookie, removeCookie] = useCookies(["token"]);
  const[token,settoken]=useState(Cookies.get("token"))
  const navigate=useNavigate()
  
  const logout=()=>{
    console.log(Cookies.get("token"))
    Cookies.remove("token")
    navigate("/")
    settoken(Cookies.get("token") ? Cookies.get("token") :"")
  }

  // useEffect(()=>{
  //   if(!token){
  //     navigate("/")
  //   }
  // },[token])

  return (
    <>
      <div className="nav-main nav-main-2">
        <div className="nav-inner-2">
          <div className="auth-nav-icon">
            {/* <BiSolidTime size={40} color="white" /> */}
            <img src={clock2} />
            <span className="timetra-heading timetra-heading-2">
              <b>Time </b>Tracking
            </span>
          </div>
          <div className="auth-profile-pop">
            <div className="auth-pro-group">
              <p className="auth-name-nav">
                {user? user?.first_name + " " + user?.last_name:""}
              </p>
              <p className="define-iam">Admin</p>
            </div>
            <div className="bdge-auth">
              <p>{user?.first_name?.substring(0, 1).toUpperCase()}</p>
            </div>
            <div className="logout" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket" style={{cursor:"pointer"}} onClick={logout}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
