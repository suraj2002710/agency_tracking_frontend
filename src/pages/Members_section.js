import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_patient } from '../redux/slice/patients'
import Cookies from 'js-cookie'
import { Modal, Spinner } from 'react-bootstrap'
import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { create_message } from '../redux/slice/message_slice'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chat_actions } from '../redux/slice/chatgroups'

const Members_section = () => {
    const { patient, patient_contact, loading, error,chatgroup, all_patients_contact } = useSelector(state => state.patient)

    const { status } = useSelector(state => state.message)
    const dispatch = useDispatch()
    const token = Cookies.get("token")
    const [modal, setmodal] = useState("")
    const [checked, setChecked] = React.useState([]);
    const navigate = useNavigate()
    const [patient_id, setpatient_id] = useState("")
    const [text, settext] = useState("")

    useEffect(()=>{
        if(status===true){
            setmodal(false)
        }
        if(error){
            
            // toast.error(data?.msg, {
            //     position: "top-right",
            //   });
            //   dispatch(chat_actions.state_blank())
        }
    },[status])

    const handleToggle = (value) => {
        console.log(value)
        const currentIndex = checked?.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        console.log(newChecked)

        setChecked(newChecked);
    };
    useEffect(() => {
        dispatch(get_patient({ token }))
    }, [])

    const msg_create = (e) => {
        e.preventDefault()
        let obj = {
            id: 1,
            name: 'Nihal fasadffdsa',
            time: '12:00 AM',
            messages: text,
            Type: "outbound"
        }

        dispatch(create_message({ token, Type: "outbound", Method: "single", patient_id: patient_id, messages: text, group_id: "", chatType: "onebyone" }))
    }

    const redirect_selected_patient=()=>{
        if(!checked.length){
            toast.error("Select minimum one patient", {
                position: "top-right",
              });
        }else{

            navigate({
                pathname: "/chat",
            search: `query=single_patient_contact&patient_id=${checked}`
        })
    }
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            <div class="contact-card">
                <h1 class="patient-heading">Patients</h1>
                <p class="patient-text">Mass or selected patients chat</p>
                <div class="card">
                    <div class="buttons">
                        <div><button class="tab-btn chat-box" onClick={() => {
                            navigate({
                                pathname: "/chat",
                                search: `query=chatbox`
                            })

                        }}>Chat box</button></div>
                        <div><button class="tab-btn mass" onClick={() => {
                            navigate({
                                pathname: "/chat",
                                search: `query=mass`
                            })

                        }}>Mass</button></div>
                        <div><button class="tab-btn selected"
                            onClick={() => {
                                redirect_selected_patient()
                            }}
                        >Selected</button></div>
                    </div>
                    <div class="patients-all-cards">

                        {loading ? <div style={{ width: "100px", margin: "auto" }}>
                            <Spinner animation="grow" />
                        </div> :

                            !patient?.length ? <div style={{ width: "100px", margin: "auto" }}>No Contacts</div> :

                                patient.map((value) => {

                                    return (

                                        <div onClick={() => handleToggle(value._id)} class={` patient-card ${checked.includes(value._id) ? "patient-active" : ""}`}>

                                            <p>{value.first_name}</p>
                                            <i class="fa-solid fa-message" onClick={() => {
                                                setpatient_id(value._id)
                                                setmodal(true)
                                            }}></i>
                                        </div>
                                    );
                                })


                        }


                    </div>
                </div>
            </div>
            <Modal
                show={modal}
                onHide={() => {
                    setmodal(false);
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Send Your Message
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="message-form-container">
                        <form onSubmit={msg_create} className="message-form">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={text}
                                onChange={(e) => settext(e.target.value)}
                                className="message-input"
                            />
                            <button type="submit" className="send-button">
                                Send
                            </button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default Members_section