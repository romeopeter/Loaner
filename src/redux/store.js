import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import messageReducer from "./messageSlice"
import loanReducer from "./loanSlice"
import investorListReducer from "./investorListSlice"
import investorsCategoriesReducer from "./investorCategorySlice"
import investorsInCategoryReducer from "./investorsInCategorySlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    loan: loanReducer,
    investorsCategories: investorsCategoriesReducer,
    investorsList: investorListReducer,
    investorsInCategory: investorsInCategoryReducer,
  }
})