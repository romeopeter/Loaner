import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import messageReducer from "./messageSlice"
import loanReducer from "./loanSlice"
import investorListReducer from "./investorListSlice"
import investorsCategoriesReducer from "./investorCategorySlice"
import investorsInCategoryReducer from "./investorsInCategorySlice"
import investorReducer from "./investorSlice"
import bidReducer from "./bidSlice"
import paymentReducer from "./paymentSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    loan: loanReducer,
    investor: investorReducer,
    investorsCategories: investorsCategoriesReducer,
    investorsList: investorListReducer,
    investorsInCategory: investorsInCategoryReducer,
    bid: bidReducer,
    payment: paymentReducer
  }
})