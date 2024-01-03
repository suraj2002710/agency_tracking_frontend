import React, { useEffect, useRef, useState } from 'react'
import search from "../asset/search.png";
import settings from "../asset/settings.png";
import Ellipse from "../asset/Ellipse 105.png";
import Ellipse112 from "../asset/Ellipse 112.png";
import moreveritcal from "../asset/more-vertical.png";
import Rectangle from "../asset/Rectangle 1510.png";
import paperclip from "../asset/paperclip.png";
import Send_btn from "../asset/send_btn.png";
import Ellipse108 from "../asset/Ellipse 108.png";
import Ellipse113 from "../asset/Ellipse 113.png";

import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { get_patient, get_patient_contact } from '../redux/slice/patients';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment';

function AllPatients() {
  const { patient ,loading,  } = useSelector(state => state.patient)
  
  const {new_msg_count } = useSelector(state => state.message)
  
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const token = Cookies.get("token")
  
  const [search,setsearch]=useState("")


  const activeClasses = (et) => {
      // const et = e.target
      console.log(et)
      let active = document.querySelector(".actives");
      if (active) {
          active.classList.remove("actives");
      }
      et.classList.add("actives");
  }






  useEffect(() => {
      if (!patient) {
          dispatch(get_patient({ token,search }))
      }
      
  }, [token])
  


  return (
    <>
    <div className='contact_main_div'>
                <Sidebar />
                <div className='head-div'>
                    <div className='head_header'>
                        <h2>Contact Texting</h2>

                        <div className='admin-section'>
                            <p>

                                <i class="fa-regular fa-bell"></i>
                            </p>
                            <div>
                                <img src={Ellipse113} alt="" />
                            </div>
                            <span>
                                Admin
                            </span>
                        </div>
                    </div>
                    <div className='ext-cls'>
                        <div className='patient_contact'>


                            <div className='patients'>
                                <div className='patient_hd'>
                                    <div>

                                        <span>
                                            <h4>All Patients</h4>
                                        </span>
                                        {new_msg_count>0 ?
                                        <div className='new'>{new_msg_count} New</div>:""}
                                    </div>
                                    <div className='settings'>
                                        <img src={settings} alt="" />
                                    </div>
                                </div>
                                <div className='contact_search'>
                                    <span>
                                        <img src={search} alt="" />   <input type="search" name="" placeholder='Search...' id="" onChange={(e)=>{
                                            console.log(e.target.value)
                                            dispatch(get_patient({ token,search:e.target.value }))
                                        }}/>
                                    </span>
                                </div>
                            </div>
                            <div className='all-patient'>
                                {loading==="patient"?
                                <div style={{ paddingLeft: "21px", paddingTop: "192px", width: "100px", margin: "auto" }}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                                :
                                patient && patient.map((it) => {


                                    return (<div id={it._id} className='chat' onClick={() => {
                                        
                                        let et = document.getElementById(it._id)
                                        activeClasses(et)
                                    }}>
                                        <div className='img_div'>
                                            <img src={Ellipse} alt="" />
                                        </div>
                                        <div className='name-sections'>
                                            <p>{`${it.first_name} ${it.last_name}`}</p>
                                            <p className='msgd'></p>
                                        </div>
                                        <div className='date'>
                                            <p>
                                                
                                            </p>
                                        </div>
                                    </div>)
                                })
                                }
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default AllPatients