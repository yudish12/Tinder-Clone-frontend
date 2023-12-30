import { formDataType } from "../../components/signupModal"
import axios from "axios"
import { userDetails } from "../../pages/ProfilePage";

export const  signupUserThunk = async(payload:formDataType,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/auth/signup`,payload,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log(resp)
        return resp.data.data
    } catch (error) {
        console.log(error)
        const err = thunkApi.rejectWithValue(error)
        console.log(err)
        return err
    }
}

export const loginUserThunk = async(payload:{email:string,password:string},thunkApi:{ rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/auth/login`,payload,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        return resp.data.data
    } catch (error) {
        console.log(error)
        const err = thunkApi.rejectWithValue(error)
        console.log(err)
        return err
    }
}

export const getUserThunk = async(token:string|null,thunkApi:{ rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/auth/`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        return resp.data.data
    } catch (error) {
        console.log(error)
        const err = thunkApi.rejectWithValue(error)
        console.log(err)
        return err
    }
}

export const updateUserThunk = async(payload:userDetails&{token?:string|null},thunkApi:{ rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const token = payload.token
        delete payload['token']
        const resp = await axios.patch(`${import.meta.env.VITE_DEV_API_URI}/api/auth`,{payload},{
            headers:{
                'Authorization':`Bearer ${token}`
            },
        })
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}

export const uploadPhotosThunk = async(payload:React.MutableRefObject<FormData>,thunkApi:{ rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        let token;
        const str = localStorage.getItem('user');
        if(str)token = JSON.parse(str).token
        const resp = await axios.patch(`${import.meta.env.VITE_DEV_API_URI}/api/auth/upload/photos`,payload.current,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
            },
        })
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}