import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { applyFilterThunk } from "../thunks/filterthunks"

export type FilterTypes = {
    ageFilter:number|string|null,
    ageMust:boolean,
    distanceFilter:number|string|null,
    distanceMust:boolean,
    loading:boolean,
    error?:SerializedError|null;
    filterRefetch?:boolean
}

const initState:FilterTypes = {
    ageFilter:18,
    ageMust:false,
    distanceFilter:40,
    distanceMust:false,
    loading:false,
    error:null,
    filterRefetch:false,
}

export const applyFilter = createAsyncThunk('filter/apply',applyFilterThunk)

const filterSlice = createSlice({
    name:"filter",
    initialState:initState,
    reducers:{
        setAgeVal:(state,action: PayloadAction<number>)=>{
            state.ageFilter = action.payload
        },
        setDistanceVal:(state,action:PayloadAction<number>)=>{
            state.distanceFilter = action.payload
        },
        setAgeMust:(state,action)=>{state.ageMust=action.payload},
        setDistanceMust:(state)=>{
            state.distanceMust = !state.distanceMust
        },
        setFilterRefetch:(state,action)=>{state.filterRefetch = action.payload}
    },
    extraReducers:(builder)=>{
        builder.addCase(applyFilter.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(applyFilter.fulfilled,(state,action)=>{
            state.filterRefetch = true
            const filterObj = JSON.parse(action.payload.filters)
            state.ageFilter = filterObj.ageFilter
            state.ageMust = filterObj.ageMust
            state.distanceFilter = filterObj.distanceFilter
            state.distanceMust = filterObj.distanceMust
            state.loading = false;
        })
        builder.addCase(applyFilter.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
        })
    }
    
})

export const {setAgeMust,setAgeVal,setDistanceVal,setDistanceMust,setFilterRefetch} = filterSlice.actions

export default filterSlice.reducer