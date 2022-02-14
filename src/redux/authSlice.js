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

export const signInAction = createAsyncThunk(
	"auth/signInAction", async (credentials, thunkAPI) => {
		const response = await signInRequest(credentials);
		const requestConfig = response.config;
		const dispatch = thunkAPI.dispatch


		// Network error, unable to sent request
		if (response.message === "Network Error") {

			// Dipatch actionT
			dispatch(setServerMessage({
				status: null, 
				messageType: "network_error",
				message: "Network error", 
				detail: "Poor network connection. Try signing in again"
			}));

			return
		}

		

		// Request sent but unsuccessful
		if ("stack" in response) {
			const errorResponse = response.request;
			const errorResponseText = JSON.parse(errorResponse.responseText);
			const {code, detail} = errorResponseText;

			// Unauthorized access
			if (errorResponse.status === 401) {
				
				dispatch(setServerMessage({
					status: errorResponse.status,
					messageType: code, 
					detail: detail, 
				}));

				return
			}
		}

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
		// Error in sign-in request
		if ("stack" in response) {
			const { data, config } = response

			console.log(response);

			return response;
		}

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
	dispatch(signOutAction());
};