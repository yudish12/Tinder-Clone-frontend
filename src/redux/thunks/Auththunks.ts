import { formDataType } from "../../components/signupModal"
import axios from "axios"

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