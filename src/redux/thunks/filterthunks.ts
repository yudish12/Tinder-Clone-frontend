import axios from "axios";


export const  applyFilterThunk = async(filters:string,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    const token = await JSON.parse(localStorage.getItem('user')!)
    try {
        const resp = await axios.patch(`${import.meta.env.VITE_DEV_API_URI}/api/filter/apply`,{filters:filters},{
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${token.token}`
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
