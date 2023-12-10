/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { formDataType } from "./signupModal"
import { SearchBox } from "@mapbox/search-js-react"
import React, { useEffect } from "react";
import { SearchBoxRetrieveResponse } from '@mapbox/search-js-core/dist/searchbox/SearchBoxCore'



const StepForm = ({ activeStep, handleChange, formData,setFormData }: { activeStep: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, formData: formDataType,setFormData: React.Dispatch<React.SetStateAction<formDataType>>}) => {

    const locationRes = (res: SearchBoxRetrieveResponse) => {
        setFormData((prev)=>({...prev,location:res}))
    }

    useEffect(() => {
        const el = document.getElementsByTagName("mapbox-search-listbox")[0]
        if (el) {
            const nestedDivs = el.querySelectorAll("div");

            nestedDivs.forEach((div) => {
                const newZIndex = 111111;
                div.style.zIndex = newZIndex.toString();
            });
        } else {
            console.error("Element not found");
        }
    }, [activeStep])

    switch (activeStep) {
        case 0:
            return (
                <form className='flex flex-col gap-4 mt-16 mx-auto justify-center w-full' >
                    <div className="flex flex-col px-4">
                        <label className='text-white' >Name</label>
                        <input onChange={handleChange} className='bg-slate-800 mt-1 px-6 py-2 rounded-lg text-white focus:border-none focus:outline-none focus-within:bg-slate-800' id='name' name='name' value={formData.name} placeholder='Enter Your Name' type="text" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label className='text-white' >Email</label>
                        <input onChange={handleChange} value={formData.email} className='bg-slate-800 mt-1 px-6 py-2 rounded-lg text-white focus:border-none focus:outline-none focus-within:bg-slate-800' id='email' name='email' placeholder='Enter Your Email' type="email" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label className='text-white' >Password</label>
                        <input onChange={handleChange} value={formData.password} required className='bg-slate-800 mt-1 px-6 py-2 rounded-lg text-white focus:border-none focus:outline-none focus-within:bg-slate-800' id='password' name='password' placeholder='Enter Your Password' type="password" />
                    </div>
                </form>
            )
        case 1:
            return (
                <form className="flex flex-col gap-4 mt-16 mx-auto justify-center w-full" >
                    <div className="flex w-full gap-12" >
                        <input onChange={handleChange} value={formData.height!} className="w-full bg-transparent px-3 py-2 text-slate-500 placeholder:text-slate-500 border-b-2 border-slate-500 focus:outline-none" placeholder="height in cm" type="number" name="height" />
                        <input onChange={handleChange} value={formData.weight!} className="w-full bg-transparent  px-3 py-2 text-slate-500 placeholder:text-slate-500 border-b-2 border-slate-500 focus:outline-none" placeholder="weight in kgs" type="number" name="weight" />
                    </div>
                    <div className="flex w-full gap-12 items-center" >
                        <input onChange={handleChange} value={formData.age!} className="w-full bg-transparent px-3 py-2 text-slate-500 placeholder:text-slate-500 border-b-2 border-slate-500 focus:outline-none" placeholder="age in years" type="number" name="age" />
                        <FormControl className="w-full" >
                            <FormLabel focused={true} >Gender</FormLabel>
                            <RadioGroup
                                className="grid grid-cols-3"
                                row={true}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel className="text-white" value="female" control={<Radio name="female" onChange={handleChange} checked={formData.gender === "female"} />} label="Female" />
                                <FormControlLabel className="text-white" value="male" control={<Radio name="male" onChange={handleChange} checked={formData.gender === "male"} />} label="Male" />
                                <FormControlLabel className="text-white" value="other" control={<Radio name="other" onChange={handleChange} checked={formData.gender === "other"} />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </form>
            )
        case 2:
            return (
                <form className="flex flex-col gap-4 mt-16 mx-auto justify-center items-center w-full" >
                    <div className="flex w-full gap-12 items-center" >
                        <FormControl className="w-full " >
                            <FormLabel focused={true} >Preference</FormLabel>
                            <RadioGroup
                                className="grid grid-cols-3"
                                row={true}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel className="text-white" value="preference" control={<Radio name="female" onChange={handleChange} checked={formData.preference === "female"} />} label="Female" />
                                <FormControlLabel className="text-white" value="preference" control={<Radio name="male" onChange={handleChange} checked={formData.preference === "male"} />} label="Male" />
                                <FormControlLabel className="text-white" value="preference" control={<Radio name="other" onChange={handleChange} checked={formData.preference === "other"} />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="flex w-full gap-12 items-center" >
                        <FormControl className="w-full " >
                            <FormLabel focused={true} >Dating Type</FormLabel>
                            <RadioGroup
                                className="grid grid-cols-3"
                                row={true}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel className="text-white" value="long term" control={<Radio name="long term" onChange={handleChange} checked={formData.date_type === "long term"} />} label="Long Term" />
                                <FormControlLabel className="text-white" value="male" control={<Radio name="short term" onChange={handleChange} checked={formData.date_type === "short term"} />} label="Short Term" />
                                <FormControlLabel className="text-white" value="casual" control={<Radio name="casual" onChange={handleChange} checked={formData.date_type === "casual"} />} label="Casual" />
                            </RadioGroup>
                        </FormControl>

                    </div>
                    <div className="flex w-full gap-12 items-center">
                        <FormControl className="flex flex-row" >
                            <FormLabel focused={true} color="primary" className="my-2" >Enter Your Location</FormLabel>
                            {/* @ts-ignore */}
                            <SearchBox onRetrieve={locationRes} accessToken={"pk.eyJ1IjoieXVkaTMxMzQiLCJhIjoiY2xweTV0NjV3MHVtODJqbzllaW0ybDR2eCJ9.id89mwrvYz8f6ZMlMKQmzw"}>

                            </SearchBox>
                        </FormControl>
                    </div>
                </form>
            )
    }
}

export default StepForm