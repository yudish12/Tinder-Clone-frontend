import axios from "axios";
import { UserType } from "../slices/AuthSlice";


export const getUsersThunk = async (x = null, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    console.log(x)
    const token = await JSON.parse(localStorage.getItem('user')!)
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/match/`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        console.log(resp.data.data)
        const arr = resp.data.data.filter((e:UserType)=>e.email!==token.email)
        return arr
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}

export const likeUserThunk = async (recieverId: string, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);

    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/match/req/like`, {
            recieverId: recieverId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            },
        })

        return resp.data.data

    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err;
    }
}

export const disLikeUserThunk = async (recieverId: string, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);

    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/match/req/dislike`, {
            recieverId: recieverId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            },
        })

        return resp.data.data

    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err;
    }

}

export const getMatchReqsThunk = async (x: null, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    console.log(x)
    const token = await JSON.parse(localStorage.getItem('user')!)
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/match/req`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}


export const acceptMatchReqThunk = async (reqid: string, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);

    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/match/req/${reqid}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}

export const rejectMatchReqThunk = async (reqid: string, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    const token = await JSON.parse(localStorage.getItem('user')!);
    try {
        const resp = await axios.delete(`${import.meta.env.VITE_DEV_API_URI}/api/match/req/${reqid}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}


export const getMatchedUsersThunk = async (x: null, thunkApi: { rejectWithValue: (arg0: unknown) => void; }) => {
    console.log(x);
    const token = await JSON.parse(localStorage.getItem('user')!);
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/match/matched`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        });
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}