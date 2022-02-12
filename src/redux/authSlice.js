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

		

		// Check if error object exist
		if ("stack" in response) {
			const errorMessage = response.message;
			const errorResponse = response.request;
			const errorResponseText = JSON.parse(errorResponse.responseText);
			const {code, detail} = errorResponseText;

			// Network Error
			if (errorMessage === "Network Error") {

				// Dipatch action
				dispatch(setServerMessage({
					status: null, 
					message: "Network Error", 
					detail: "Poor network connection"
				}));

				return
			}

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
		[signInAction.pending]: (state, action) => {
			console.log("Loading");
		},
		[signInAction.rejected]: (state, action) => {
			console.log(action.payload);
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
		// Check if error stack object exist
		if ("stack" in response) {
			const { data, config } = response

			// dispatch(setServerMessage(message));
			console.log(response);

			return response;
		}

		if (response.status === 201) {
			dispatch(setServerMessage({
				status: 201,
				messageType: "account_created", 
				message: "A confirmation email has been sent to your email 📧", 
				detail: "Account created successfully"
			}));

			return response;
		}
	});
};

export const signOutAsync = () => (dispatch) => {
	dispatch(signOutAction());
};