/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setServerMessage } from "./messageSlice";
import {
	signUpRequest,
	signInRequest,
	signOutRequest,
} from "../services/auth.service.js";

const user = JSON.parse(localStorage.getItem("USER"));

const authState = user
	? { isLoggedIn: true, user, error: null }
	: { isLoggedIn: false, user: null, error: null };

export const signInAction = createAsyncThunk("auth/signInAction", async credentials => {
	const res = await signInRequest(credentials);

	// Check if error object exist
	if ("stack" in res) {
		return res
	}

	return res.data;
});


export const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		signOutAction: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;

			localStorage.removeItem("USER");
		},
	},
	extraReducers: {
		[signInAction.pending]: (state, action) => {
			console.log("Loading");
		},
		[signInAction.rejected]: (state, action) => {
			console.log(action.payload);
			console.log("rejected");
		},
		[signInAction.fulfilled]: (state, action) => {
			const payload = action.payload;

			// Store user object in browser storage
			localStorage.setItem("USER", JSON.stringify(payload));

			state.isLoggedIn = true;
			state.user = payload;
		},
	}
});

export const { signUpAction, signOutAction } = authSlice.actions;
export default authSlice.reducer;

export const signUpAsync = (data) => (dispatch) => {
	return signUpRequest(data).then((response) => {
		// Check if error stack object exist
		if ("stack" in response) {
			const { data, status } = response.response;
			const message = data.error;

			dispatch(setServerMessage(message));

			return response;
		}

		if (response.status === 201) {
			dispatch(setServerMessage("Please sign in."));

			return response;
		}
	});
};

export const signOutAsync = () => (dispatch) => {
	dispatch(signOutAction());
};