import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupUserThunk } from "../thunks/Auththunks";

export type authTypes = {
    token:string|null;
    email:string|null;
    name:string|null;
    error?:string|null;
    loading:boolean;
}

const initialState: authTypes = {
    token:null,
    email:null,
    name:null,
    error:null,
    loading:false
  }

export const signupUser = createAsyncThunk('users/signup',signupUserThunk)

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.pending,(state)=>{
            state.loading = true
        }),
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false
            state.token = action.payload.token
            state.email = action.payload.email
            state.name = action.payload.name;
            localStorage.setItem('user',JSON.stringify(action.payload))
            console.log(state)
        })
        builder.addCase(signupUser.rejected,(state,action)=>{
            state.error = (JSON.stringify(action.payload))
            state.loading = false;
        })
    }
})


export default authSlice.reducer