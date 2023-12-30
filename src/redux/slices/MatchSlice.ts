import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "./AuthSlice";
import { acceptMatchReqThunk, disLikeUserThunk, getMatchReqsThunk, getMatchedUsersThunk, getUsersThunk, likeUserThunk, rejectMatchReqThunk } from "../thunks/Matchthunks";

export type MatchReqType = {
    _id: string,
    reciever: string,
    sender: UserType,
    status: string
}

export type MatchType = {
    _id: string,
    users:UserType[]
    matchRequest: string,
    status: string,
    createdAt: string,
    updatedAt: string,
}

type initStateType = {
    loading: boolean;
    users: MatchType[],
    matches: UserType[],
    requests: MatchReqType[],
    error?: SerializedError | null;
}

const initialState: initStateType = {
    loading: false,
    users: [],
    matches: [],
    requests: [],
    error: null
}


export const getUsers = createAsyncThunk('get/users', getUsersThunk)
export const getMatchReqs = createAsyncThunk('get/req', getMatchReqsThunk)
export const likeUser = createAsyncThunk('like/user', likeUserThunk);
export const disLikeUser = createAsyncThunk('dislike/user', disLikeUserThunk)
export const acceptMatchReq = createAsyncThunk('match/accept', acceptMatchReqThunk)
export const rejectMatchReq = createAsyncThunk('match/reject', rejectMatchReqThunk)
export const getMatchedUsers = createAsyncThunk('match/matched', getMatchedUsersThunk)


const matchSlice = createSlice({
    name: "match",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //get user for sending requests
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.matches = action.payload;
            state.loading = false
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        //like user
        builder.addCase(likeUser.fulfilled, (state) => {
            state.error = null
            state.loading = false
        })
        builder.addCase(likeUser.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        //dislike user
        builder.addCase(disLikeUser.fulfilled, (state) => {
            state.error = null
            state.loading = false
        })
        builder.addCase(disLikeUser.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        //get match reqs
        builder.addCase(getMatchReqs.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMatchReqs.fulfilled, (state, action) => {
            state.requests = action.payload;
            state.loading = false
        })
        builder.addCase(getMatchReqs.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        //accept match request
        builder.addCase(acceptMatchReq.fulfilled, (state, action) => {
            state.requests = state.requests.filter((e) => e._id != action.payload)
        })
        //reject match request
        builder.addCase(rejectMatchReq.fulfilled, (state, action) => {
            state.requests = state.requests.filter((e) => e._id != action.payload)
        })
        //get matched users
        builder.addCase(getMatchedUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMatchedUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false
        })
        builder.addCase(getMatchedUsers.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
    }
})

export default matchSlice.reducer