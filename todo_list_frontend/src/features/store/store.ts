import { configureStore } from "@reduxjs/toolkit";
import todoSlice from '../slices/todosSlice'
import userSlice from "../slices/userSlice";

const store = configureStore({
     reducer: {
          todos: todoSlice,
          user: userSlice
     }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>