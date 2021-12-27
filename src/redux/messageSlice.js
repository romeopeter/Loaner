/**
 * Message slice reads/ writes to the message state in store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
	name: "message",
	initialState: {message: ""},
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		clearMessage: (state, action) => {
			state.message = "";
		},
	},
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;