import axios from "axios"
import { fetchChats } from "../slices/Chatslice";

export const fetchChatThunk = async (matchId: string, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/messages?matchId=${matchId}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        return { data: resp.data.data, matchId: matchId };
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}

export const sendMessageThunk = async (
    payload: 
    { 
        message: string|null|undefined, recieverId: string, matchId: string|null|undefined }, 
        thunkApi: { rejectWithValue: (arg0: unknown) => void 
    }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);
    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/messages`, { message: payload.message,recieverId:payload.recieverId,matchId:payload.matchId }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        console.log(resp.data.data)
        //@ts-ignore
        thunkApi.dispatch(fetchChats(resp.data.data.matchId))
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}