import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserType } from "./AuthSlice"
import { fetchChatThunk, sendMessageThunk } from "../thunks/Chatthunks"

export type MessageType={
    message:string,
    sender:UserType,
    reciever:string|UserType,
    matchId:string,
    updatedAt:string|Date,
    createdAt:string|Date
}

export type ChatStateType = {
    loading:boolean,
    matchId:string|null|undefined,
    message:MessageType[]|[],
    error:SerializedError|string
}

const initState:ChatStateType = {
    loading:false,
    matchId:null,
    message:[],
    error:""
}


export const fetchChats = createAsyncThunk('chat/fetch',fetchChatThunk)
export const sendMessage = createAsyncThunk('chat/send',sendMessageThunk)

const chatSlice = createSlice({
    name:'chat',
    initialState:initState,
    reducers:{
        messageRecieved:(state,action: PayloadAction<MessageType>)=>{
            state.message = [...state.message,action.payload];
        }
    },
    extraReducers:(builder)=>{
        //fetch chats builder
        builder.addCase(fetchChats.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchChats.fulfilled,(state,action)=>{
            state.loading = false;
            state.matchId = action.payload?.matchId
            state.message = action.payload?.data
        })
        builder.addCase(fetchChats.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
        //send message builder
        builder.addCase(sendMessage.fulfilled,(state,action)=>{
            state.message = [...state.message,action.payload]
            state.loading = false;
        })
        builder.addCase(sendMessage.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
    }

})

export const {messageRecieved} = chatSlice.actions

export default chatSlice.reducer;