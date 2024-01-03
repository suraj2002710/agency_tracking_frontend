import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login, login_action } from "../redux/slice/login";
import { apis } from "../apis";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import google from "../asset/google.png"
import microsoft from "../asset/microsoft.png"
import facebook from "../asset/facebook.jpg"
const Login = () => {
  const { loading, data, error } = useSelector((state) => state.login);
  let token=Cookies.get("token")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datas, setdatas] = useState({
    email: "",
    password: "",
  });
  const [erremail, seterremail] = useState("");
  const [errpassword, seterrpassword] = useState("");
  const loginuser = async (e) => {
    e.preventDefault();
    if (!datas.email) {
      seterremail("Required");
    }
    if (!datas.password) {
      seterrpassword("Required");
    }
    if (!datas.email || !datas.password) {
      return false;
    }
    console.log(datas);
    // const {data}=await axios.post(apis.LOGIN_API,datas)
    dispatch(login({ userdata: datas }));
  };
  useEffect(() => {
    if (data && data.status == true) {
      console.log(data);
      dispatch(login_action.stateblank());
      Cookies.set("token", data.token);
      navigate("/landing-page");
    }
    if (data && data.status == false) {
      console.log(data);
      dispatch(login_action.stateblank());
      toast.error(data.msg, {
        position: "top-right",
      });
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, dispatch, loading]);

  const continueForm = () => {
    navigate("/dashboard");
  };

  const handlechange = (e) => {
    setdatas({ ...datas, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(token){
      navigate("/landing-page")
    }
  },[token])
  return (
    <>
      <Navbar />
      <div className="login-main">
        <div className="login-box">
          <div className="heading-login">
            <h1>Login</h1>
            <p>to get started</p>
          </div>
          <div className="login-from">
            <form onSubmit={loginuser}>
              <div className="input-grp">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={datas.email}
                  name="email"
                  onChange={(e) => {
                    seterremail("");
                    handlechange(e);
                  }}
                />
                {erremail ? (
                  <span style={{ color: "red" }}>{erremail}</span>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={datas.password}
                  onChange={(e) => {
                    seterrpassword("");
                    handlechange(e);
                  }}
                />
                {errpassword ? (
                  <span style={{ color: "red" }}>{errpassword}</span>
                ) : (
                  ""
                )}
                <p className="forgot-psd">Forgot Password ?</p>
              </div>

              <button type="submit" className="continue-btn-login">
                {loading ? <Spinner animation="grow" /> : "Continue"}
              </button>

              <p className="forReg-log">
                New User? <span className="reg-bold">Register</span>
              </p>
            </form>
            <div className="social-login-buttons">
              <Link
                to={"http://localhost:4000/google"}
                className="google-button"
              >
                <div style={{marginLeft:"12px"}}>
                <img src={google} alt="" />
                </div>
                
              </Link>
              <Link
                to={"http://localhost:4000/auth/facebook"}
                className="facebook-button"
              >
                <div>
                <img src={facebook} alt="" />
                </div>
                
              </Link>
              <Link
                to={"http://localhost:4000/auth/microsoft"}
                className="microsoft-button"
              >
                <div>
                <img src={microsoft} alt="" />
                </div>
                
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
