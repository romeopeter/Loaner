import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import messageReducer from "./messageSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer
  }
})