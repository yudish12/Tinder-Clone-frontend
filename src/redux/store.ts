import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from './slices/AuthSlice'
import filterSliceReducer from './slices/FilterSlice'
import MatchSliceReducer from "./slices/MatchSlice";
import ChatsliceReducer from "./slices/Chatslice";

export const store = configureStore({
  reducer: { authSliceReducer, filterSliceReducer, MatchSliceReducer,ChatsliceReducer  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useAppSlector: TypedUseSelectorHook<RootState> = useSelector
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch