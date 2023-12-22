import { Button, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, Slider, Switch, Typography } from "@mui/material"
import { useAppDispatch, useAppSlector } from "../redux/store"
import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUser, updateUser } from "../redux/slices/AuthSlice";
import { applyFilter, setAgeMust, setAgeVal, setDistanceMust, setDistanceVal } from "../redux/slices/FilterSlice";

export type userDetails = {
  email: string,
  name: string,
  preference: string,
  date_type: string,
  age: number | string,
  weight: number | string,
  height: string | number
}
const initData: userDetails = {
  email: "",
  name: "",
  preference: "",
  date_type: "",
  age: "",
  weight: "",
  height: ""
}

const theme1 = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary:{
      main:"#DB2777"
    }
  },
});

const ProfilePage = () => {
  const userdetails = useAppSlector((state) => state.authSliceReducer);
  const filterDetails = useAppSlector(state=>state.filterSliceReducer)

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<userDetails>(initData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }

  const ageSliderChange = (event: Event, newValue: number | number[]) => {
    dispatch(setAgeVal(newValue as number));
  };
  const distanceSliderChange = (event: Event, newValue: number | number[]) => {
    dispatch(setDistanceVal(newValue as number));
  };

  useEffect(() => {
    if (userdetails.token) {
      const token = userdetails.token;
      console.log(token)
      dispatch(getUser(token))
    }
  }, [userdetails.token])

  useLayoutEffect(() => {
    if (userdetails.user) {
      const { email, name, preference, date_type, age, weight, height,filters } = userdetails.user;
      setFormData({
        email, name, preference, date_type, age, weight, height
      })
      // setAgeSliderVal(age)
      if(filters){
        const filterObj = JSON.parse(filters)
        console.log(filterObj)
        dispatch(setAgeVal(filterObj.ageFilter))
        dispatch(setDistanceVal(filterObj.distanceFilter))
        dispatch(setAgeMust(filterObj.ageMust))
        dispatch(setDistanceMust(filterObj.distanceMust))
      }else{
        console.log(filters)
        dispatch(setAgeVal(age));
      }
      
    }
  }, [userdetails.user])


  const filterSubmit = ()=>{
    const filterString = JSON.stringify(filterDetails);
    dispatch(applyFilter(filterString))
  }



  if (userdetails.loading) {
    return <div>Loading...</div>
  }
  if(filterDetails.loading){
    console.log("las")
  }

  return (
    <ThemeProvider theme={theme1} >
      <div className="flex flex-col">
        <div className="border-b-2 border-gray-500" >
          <Typography variant="h6"> Account Settings</Typography>
        </div>
        <div className="flex items-center mt-4 justify-between ">
          <label className='text-white' >Name</label>
          <input onChange={handleChange} value={formData.name} className='bg-transparent border-b-2 border-gray-500 px-6 rounded-none text-white focus:border-none focus:outline-none' id='name' name='name' placeholder='Enter Your Name' type="test" />
        </div>
        <div className="flex items-center mt-4 justify-between ">
          <label className='text-white' >Email</label>
          <input onChange={handleChange} value={formData.email} className='bg-transparent border-b-2 border-gray-500 px-6 rounded-none text-white focus:border-none focus:outline-none' id='email' name='email' placeholder='Enter Your Email' type="email" />
        </div>
        <div className="flex items-center mt-4 justify-between ">
          <label className='text-white' >Age</label>
          <input onChange={handleChange} value={formData.age} className='bg-transparent border-b-2 border-gray-500 px-6 rounded-none text-white focus:border-none focus:outline-none' id='age' name='age' placeholder='Enter Your Age' type="number" />
        </div>
        <div className="flex items-center mt-4 justify-between ">
          <FormControl fullWidth={true} variant="standard" >
            <FormLabel sx={{ color: "white" }} htmlFor="demo-simple-select-label">Date Type</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              sx={{ color: "white" }}
              name="date_type"
              color={"primary"}
              value={formData.date_type}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"long term"}>Long Term</MenuItem>
              <MenuItem value={"short term"}>Short Term</MenuItem>
              <MenuItem value={"casual"}>Casual</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center mt-4 justify-between ">
          <FormControl fullWidth={true} variant="standard" >
            <FormLabel sx={{ color: "white" }} htmlFor="demo-simple-select-label">Preference</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              sx={{ color: "white" }}
              name="preference"
              color={"primary"}
              value={formData.preference}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
              <MenuItem value={"other"}>other</MenuItem>
            </Select>
          </FormControl>

        </div>
        <Button onClick={()=>dispatch(updateUser({...formData,token:userdetails.token}))} sx={{marginTop:"1rem"}} variant="contained" color="secondary" >Update Details</Button>
        <div className="border-b-2 mt-8 border-gray-500" >
          <Typography variant="h6"> Filters</Typography>
        </div>
        <div className="border-b-2 p-4 border-gray-500" >
          <div className="flex items-center justify-between " >
            <Typography id="age-slider-label" >Age Preference</Typography>
            <Slider value={Number(filterDetails.ageFilter)} onChange={ageSliderChange} name="age" min={18} max={60} aria-label="age-slider-label" valueLabelDisplay="auto" />
          </div>
          <div className="flex items-center gap-4" >
            <Typography id="age-switch" >Only show people in this range</Typography>
            <Switch checked={filterDetails.ageMust} value={filterDetails.ageMust} onChange={()=>dispatch(setAgeMust(!filterDetails.ageMust))} aria-label="age-switch" />
          </div>
        </div>
        <div className="border-b-2 p-4 border-gray-500"  >
          <div className="flex items-center justify-between " >
            <Typography id="distance-slider-label" >Distance Preference</Typography>
            <Slider value={Number(filterDetails.distanceFilter)} onChange={distanceSliderChange} name="distance" min={2} max={200} aria-label="distance-slider-label" valueLabelDisplay="auto" />
          </div>
          <div className="flex items-center gap-4" >
            <Typography id="age-switch" >Only show people in this range</Typography>
            <Switch checked={filterDetails.distanceMust} onChange={()=>dispatch(setDistanceMust())} aria-label="age-switch" />
          </div>
        </div>
        <Button onClick={filterSubmit} sx={{marginTop:"2rem"}} variant="contained" color="secondary" >Apply Filters</Button>
      </div>
    </ThemeProvider>
  )
}

export default ProfilePage