import agencySlice from "./slice/agency";
import employeesSlice from "./slice/caregiver";
import groupsSlice from "./slice/chatgroups";
import loginreducer from "./slice/login";
import messageSlice from "./slice/message_slice";
import patientSlice from "./slice/patients";
import socketSlice from "./slice/socket_slice";

const { createStore, configureStore } = require("@reduxjs/toolkit");


const store =configureStore({
    reducer:{
        login:loginreducer,
        employee:employeesSlice,
        agency:agencySlice,
        patient:patientSlice  ,
        groups:groupsSlice ,
        message:messageSlice,
        socket:socketSlice
    }
})

export default store