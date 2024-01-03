import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { get_facility, get_single_user, login_action } from "./redux/slice/login";
import Private_route from "./Private_route";
import ChatPage from "./pages/ChatPage";
import ChatBody from "./pages/ChatBody";
import Main_board from "./pages/Main_board";
import Members_section from "./pages/Members_section";
import Sidebar from "./pages/Sidebar";
import ContactTexting from "./pages/ContactTexting";
import MassTexting from "./pages/MassTexting";
import EnterPage from "./pages/EnterPage";

import {io} from "socket.io-client"
import { baseurl } from "./apis";
import { socketAction } from "./redux/slice/socket_slice";
import { fetch_new_message } from "./redux/slice/message_slice";
import MsgRequest from "./pages/MsgRequest";
import Inbox from "./pages/Inbox";
import AllPatients from "./pages/AllPatients";

function App() {
  const dispatch=useDispatch()
  
  const { socket } = useSelector(state => state.socket)
  
  const token=Cookies.get("token")
  useEffect(()=>{
    if(token){
      dispatch(get_single_user({token}))
      dispatch(get_facility({token}))

      dispatch(fetch_new_message({token}))
      dispatch(socketAction.socket_connected(io(baseurl)))
    }
    
  },[token])
  useEffect(()=>{
    if(socket){
        socket.on("msg-send",(data)=>{
            console.log(data)
            dispatch(fetch_new_message({token}))
                   })
    }

    return ()=>{
        socket && socket.off("msg-send",(data)=>{
            console.log(data)
            dispatch(fetch_new_message({token}))
        })
    }
},[socket])

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/chat" element={ <ChatPage />} /> */}
          
          {/* <Route path="/chattest" element={<Main_board />} /> */}
          {/* <Route path="/patients" element={<Members_section />} /> */}
          <Route path="/contact" element={<Private_route componant={<ContactTexting />}/> } />
          <Route path="/mass" element={<Private_route componant={<MassTexting />}/> } />
          <Route path="/landing-page" element={<Private_route componant={<EnterPage />}/>} />
          <Route path="/message-request" element={<Private_route componant={<MsgRequest />}/>} />
          <Route path="/inbox" element={<Private_route componant={<Inbox />}/>} />
          <Route path="/all-patient" element={<Private_route componant={<AllPatients />}/>} />
          
          <Route path="/dashboard" element={<Private_route componant={<Dashboard />} />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
