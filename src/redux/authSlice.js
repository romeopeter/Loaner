/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";
import { signUpFunc, signInFunc, signOutFunc } from "./creators";

const initialState = {
	email: "",
	title: "",
	dateOfBirth: "",
	firstName: "",
	lastName: "",
	password: "",
	confirmPassword: "",
	role: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		signUp: (state, action) => {
			const signUpResponse = signUpFunc(action.payload);
			state.auth = signUpResponse;
		},
		signIn: (state, action) => {
			const signInResponse = signInFunc(action.payload);
			state.auth = signInResponse;
		},
		signOut: (state, action) => {
			const signOutResponse = signOutFunc();
			state.auth = signOutResponse;
		},
	},
});

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;