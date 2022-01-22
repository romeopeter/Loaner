import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import messageReducer from "./messageSlice"
import loanReducer from "./loanSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    loan: loanReducer
  }
})