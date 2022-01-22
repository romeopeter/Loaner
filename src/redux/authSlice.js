/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice } from "@reduxjs/toolkit";

import {
	signUpRequest,
	signInRequest,
	signOutRequest,
} from "../services/auth.service.js";

import { setServerMessage } from "./messageSlice";

const user = JSON.parse(localStorage.getItem("USER"));

const authState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

export const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		signUpAction: (state, action) => {
			return;
		},
		signInAction: (state, action) => {
			const payload = action.payload;

			state = {
				...state,
				isLoggedIn: true,
				user: payload.user
			};
		},
		signOutAction: (state, action) => {
			return localStorage.removeItem("USER");
		},
	},
});

export const { signUpAction, signInAction, signOutAction } = authSlice.actions;
export default authSlice.reducer;

export const signUpAsync = (data) => (dispatch) => {
	return signUpRequest(data).then((response) => {

		// Check if error stack object exist
		if ("stack" in response) {
			const message = response.message;

			dispatch(setServerMessage(message));

			return
		}

		if (response.status === 201) {
			dispatch(setServerMessage("Account created"));

			return response.data
		}
	});
};

export const signInAsync = (data) => (dispatch) => {
	return signInRequest(data).then((response) => {

		// Check if error stack object exist
		if ("stack" in response) {
			const message = response.message;

			dispatch(setServerMessage(message));

			return	
		}

		dispatch(signInAction(response));

		return response
	});
};

export const signOutAsync = () => (dispatch) => {
	dispatch(signOutAction());
};