import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from './slices/AuthSlice'

export const store = configureStore({
    reducer: {authSliceReducer},
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  export const useAppSlector: TypedUseSelectorHook<RootState> = useSelector
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
  export const useAppDispatch: () => AppDispatch = useDispatch