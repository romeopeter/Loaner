/**
 * Message slice reads/ writes to the message state in store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
	name: "message",
	initialState: {
		server: { message: "" },
		client: {
			emailAddress: "",
			phoneNumber: "",
			dateOfBirth: "",
			password: "",
		},
	},
	reducers: {
		setServerMessage: (state, action) => {
			state.server.message = action.payload;
		},
		setClientMessage: (state, action) => {

			const {field, message} = action.payload;

			if (field === "emailAddress") {
				state.client.emailAddress = message;
			}		

			if (field === "phoneNumber") {
				state.client.phoneNumber = message;
			}

			if (field === "dateOfBirth") {
				state.client.dateOfBirth = message;
			}

			if (field === "password") {
				state.client.password = message;
			}
		},
		clearMessage: (state, action) => {
			state.message = "";
		},
	},
});

export const { setServerMessage, setClientMessage } = messageSlice.actions;
export default messageSlice.reducer;