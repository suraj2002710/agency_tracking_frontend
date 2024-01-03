import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../apis";
import axios from "axios";

export const get_agency=createAsyncThunk("get_agency",async({token},{rejectWithValue})=>{
    try {
        let headers={
            token:token
        }
        const {data}=await axios.get(`${apis.GET_AGENCY}`,{headers})
        console.log(data)

        return data
    } catch (error) {
        return rejectWithValue(error.response)
    }
})


const agency = createSlice({
    name: "agency",
    initialState: {
        loading: false,
        error: null,
        agency: null,
        status: null
    },
    extraReducers: (builder) => {
        builder.addCase(get_agency.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_agency.fulfilled, (state, action) => {
            console.log(action.payload)
            state.agency = action.payload.data;
            state.status = action.payload
            state.loading = false
        });
        builder.addCase(get_agency.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.agency = null;
        });
    }
})

const agencySlice=agency.reducer
export default agencySlice
