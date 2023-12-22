import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "./AuthSlice";
import { getUsersThunk, likeUserThunk } from "../thunks/Matchthunks";

type initStateType = {
    loading:boolean;
    users:UserType[],
    matches:UserType[],
    error?:SerializedError|null;
}

const initialState:initStateType = {
    loading:false,
    users:[],
    matches:[],
    error:null
}


export const getUsers = createAsyncThunk('get/users',getUsersThunk)
export const likeUser = createAsyncThunk('like/user',likeUserThunk);


const matchSlice = createSlice({
    name:"match",
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.matches = action.payload;
            state.loading = false
        })
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })

        builder.addCase(likeUser.fulfilled,(state)=>{
            state.error = null
            state.loading = false
        })
        builder.addCase(likeUser.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })
    }
})

export default matchSlice.reducer