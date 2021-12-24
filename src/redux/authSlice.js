/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";
import { signUpRequest, signInRequest, signOutRequest } from "./creators";

const initialState = {
	authSuccess: {
		email: "",
		title: "",
		dateOfBirth: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
		role: "",
		isRegistered: false
	},
	authError: {
		signInError: "",
		signUpError: "",
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		signUpAction: (state, action) => {
			const AuthState = state.auth
			const signUpResponse = signUpRequest(action.payload);
			console.log(signUpResponse);
			// Handle errors and update state
			// AuthState.authSuccess = signUpResponse;
			// AuthState.authSuccess.isRegistered = true;
		},
		signInAction: (state, action) => {
			const signInResponse = signInRequest(action.payload);
			// Handle errors and update state
			state.auth.authSucces = signInResponse;
		},
		signOutAction: (state, action) => {
			const signOutResponse = signOutRequest();
			// Handle errors and update state
			state.auth.authSucces = signOutResponse;
		},
	},
});

export const { signUpAction, signInAction, signOutAction } = authSlice.actions;
export default authSlice.reducer;