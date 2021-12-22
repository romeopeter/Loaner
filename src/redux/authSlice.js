import { createSlice } from "@reduxjs/toolkit";

/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 * 
 *
 * **/

const initialState = {
	email: "",
	title: "",
	dateOfBirth: "",
	firstName: "",
	lastName: "",
	password: "",
	confirmPassword: "",
	// role: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
    	signUp: (state) => console.log("sign up"),
    	signOut: (state) => console.log("sign out")
  	},
});

export const {signUp, signOut} = authSlice.actions;
export default authSlice.reducer