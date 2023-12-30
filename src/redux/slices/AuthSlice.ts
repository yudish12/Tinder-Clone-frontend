import {  SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginUserThunk, signupUserThunk,updateUserThunk, uploadPhotosThunk } from "../thunks/Auththunks";

export type UserType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    height: string;
    weight: number;
    age: number;
    gender: "male" | "female";
    preference: "male" | "female";
    date_type: "short term" | "long term";
    photos: string[]; 
    location: {
      type: "Point";
      coordinates: [number, number];
      address: string;
      distance?:string;
    };
    filters:string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type authTypes = {
    token:string|null;
    email:string|null;
    name:string|null;
    error?:SerializedError|null;
    loading:boolean;
    user?:null|UserType
}


const userInLocalStorage = localStorage.getItem("user")
let token = null;
if(userInLocalStorage){
    token = JSON.parse(userInLocalStorage).token
}


const initialState: authTypes = {
    token:token,
    email:null,
    name:null,
    error:null,
    loading:false,
    user:null
  }

export const signupUser = createAsyncThunk('users/signup',signupUserThunk)
export const loginUser = createAsyncThunk('users/login',loginUserThunk)
export const getUser = createAsyncThunk('users/get',getUserThunk)
export const updateUser = createAsyncThunk('user/update',updateUserThunk)
export const uploadPhotos = createAsyncThunk('user/upload',uploadPhotosThunk)

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.email = initialState.email
            state.user = null
            state.name = null
            state.token = null
            localStorage.removeItem('user')
        }
    },
    extraReducers:(builder)=>{
        //sign up builder
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
            state.error = action.error
            state.loading = false;
        })

        //login builder
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true
        }),
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false
            state.token = action.payload.token
            state.email = action.payload.email
            state.name = action.payload.name;
            localStorage.setItem('user',JSON.stringify(action.payload))
            console.log(state)
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
        
        //get user builder
        builder.addCase(getUser.pending,(state)=>{
            state.loading = true
        }),
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
            console.log(state)
        })
        builder.addCase(getUser.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
        //update user builder
        builder.addCase(updateUser.pending,(state)=>{
            state.loading = true
        }),
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(updateUser.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
        //upload photos builder
        builder.addCase(uploadPhotos.pending,(state)=>{
            state.loading = true
        }),
        builder.addCase(uploadPhotos.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
            console.log(action.payload)
        })
        builder.addCase(uploadPhotos.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
    }
})

export const {logout} = authSlice.actions 
export default authSlice.reducer