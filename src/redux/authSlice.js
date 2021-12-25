/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";
import { signUpRequest, signInRequest, signOutRequest } from "./creators";

const authState = {
	authSuccess: {
		email: "",
		title: "",
		date_of_birth: "",
		first_name: "",
		last_name: "",
		password: "",
		confirm_password: "",
		role: "",
		isRegistered: false,
		isLoggedIn: false,
	},
	authError: {
		signInError: "",
		signUpError: [],
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		signUpAction: (state, action) => {
			const payload = action.payload;

			// Check if error stack object exist
			if ("stack" in payload) {
				state.authError.signUpError = [
					payload.response.data.error,
					payload.message,
				];
				return;
			}

			state.authSuccess = {
				payload,
				isRegistered: true,
			};
		},
		signInAction: (state, action) => {
			const payload = action.payload;

			// Check if error stack object exist
			if ("stack" in payload) {
				state.authError.signInError = [
					payload.response.data,
					payload.message,
				];
				return;
			}

			state.authSuccess = {
				...payload,
				isLoggedIn: true,
			};
		},
		signOutAction: (state) => {
			const signOutResponse = signOutRequest();
			// Handle errors and update state
			state.auth.authSucces = signOutResponse;
		},
	},
});

export const { signUpAction, signInAction, signOutAction } = authSlice.actions;
export default authSlice.reducer;

export const signUpAsync = (data) => (dispatch) => {
	signUpRequest(data).then((response) => {
		dispatch(signUpAction(response));
	});
};

export const signInAsync = (data) => dispatch => {
	signInRequest(data).then(response => {
		dispatch(signInAction(response))
	})
}