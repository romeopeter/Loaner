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
		client: null,
	},
	reducers: {
		setServerMessage: (state, action) => {
			state.server.message = action.payload;
		},
		setClientMessage: (state, action) => {

			state.client = action.payload;
		},
		clearServerMessage: (state, action) => {
			state.message.server.message = "";
		},
		clearClientMessage: (state, action) => {
			state.message.client = null;
		},
	},
});

export const { setServerMessage, setClientMessage } = messageSlice.actions;
export default messageSlice.reducer;