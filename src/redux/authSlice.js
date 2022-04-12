/**
 * Auth slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse"
import {
	signUpRequest,
	signInRequest
} from "../services/auth.service.js";

const user = JSON.parse(localStorage.getItem("USER"));

const authState = user
	? { isLoggedIn: true, user, error: null }
	: { isLoggedIn: false, user: null, error: null };

export const signInAction = createAsyncThunk(
	"auth/signInAction", async (credentials, thunkAPI) => {
		const response = await signInRequest(credentials);
		const dispatch = thunkAPI.dispatch

		// Handle error response
		handleRequestError(response, dispatch);	

		// Request sent and resolved
		if (response.status === 200) return response.data;
	}
);

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
		// Sign-in cycle
		[signInAction.pending]: (state, action) => {
			console.log("Loading");
		},
		[signInAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[signInAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;

			// Store user object in browser storage
			localStorage.setItem("USER", JSON.stringify(payload));

			state.isLoggedIn = true;
			state.user = payload;
		},
	},
});

export const { signUpAction, signOutAction } = authSlice.actions;
export default authSlice.reducer;

export const signUpAsync = (data) => (dispatch) => {
	return signUpRequest(data).then((response) => {

		console.log(response);

		// Handle error response
		handleRequestError(response, dispatch);

		// Request successfull
		if (response.status === 201) {
			dispatch(setServerMessage({
				status: 201,
				messageType: "account_created", 
				message: "Account created succesfully", 
				detail: "A confirmation email has been sent to your email 📧"
			}));

			return response;
		}
	});
};

export const signOutAsync = () => (dispatch) => {
	return dispatch(signOutAction());
};