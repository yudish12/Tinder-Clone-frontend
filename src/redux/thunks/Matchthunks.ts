import axios from "axios";


export const  getUsersThunk = async(x=null,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    console.log(x)
    const token = await JSON.parse(localStorage.getItem('user')!)
    try {
        const resp = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/match/`,{
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${token.token}`
            }
        });
        console.log(resp)
        return resp.data.data
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err
    }
}

export const likeUserThunk = async(recieverId:string,thunkApi:{ rejectWithValue: (arg0: unknown) => void; })=>{
    const token = await JSON.parse(localStorage.getItem('user')!);

    try {
        const resp = await axios.post(`${import.meta.env.VITE_DEV_API_URI}/api/match/req/like`,{
            recieverId:recieverId
        },{
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${token.token}`
            },
        })

        return resp.data.data
    
    } catch (error) {
        const err = thunkApi.rejectWithValue(error)
        return err;
    }
}