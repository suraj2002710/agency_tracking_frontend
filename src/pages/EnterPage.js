import React, { useEffect, useState } from 'react'
import logo from "../asset/Logo.png";
import agency_tracking from "../asset/agency_tracking.png";
import communication from "../asset/communication.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get_facility } from '../redux/slice/login';
import Cookies from 'js-cookie';
const EnterPage = () => {
    const { user } = useSelector((state) => state.login);
    const navigate=useNavigate()
const dispatch=useDispatch()
    const navigate_agency_tracking=()=>{
        if(user?.is_subscriptable_agency_tracking){
            navigate("/dashboard")
        }else{
            toast.error("You are not unauthorized for this operation", {
                position: "top-right",
              });
        }
    }
    const token=Cookies.get("token")
    useEffect(()=>{
        dispatch(get_facility({token}))
    },[])

    const navigate_text=()=>{
        if(user?.is_subscriptable_text){
            navigate("/contact")
        }else{
            toast.error("You are not unauthorized for this operation", {
                position: "top-right",
              });
        }
    }

    
    return (
        <>
        {user?
        <>
        <div className='enter_head'>
                <div>
                    <img src={logo} alt='logo'/>
                </div>

                <div className='sub-head-div'>
                    <div className='sub-div'>
                        <div>
                            <img src={agency_tracking} alt="agency_tracking" />
                        </div>
                        <div style={{width:"100%"}}>

                        <p>Agency Tracking</p>
                        <span>to get started</span>
                        </div>
                        <div>

                        <button className='agency-btn'
                        onClick={(e)=>{
                            navigate_agency_tracking()
                        }}
                        >Enter Here <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                    
                    <div className='comuni-sub-div'>
                        <div >
                            <img src={communication} alt="agency_tracking" />
                        </div>
                        <div style={{width:"100%"}}>

                        <p>Patient Communications</p>
                        <span>to get started</span>
                        </div>
                        <div>

                        <button onClick={(e)=>{
                            
                            navigate_text()
                        }}
                        className='communi-btn'>Enter Here <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                




            </div>
            <ToastContainer />
        </>
        
         :""}
            
        </>
    )
}

export default EnterPage