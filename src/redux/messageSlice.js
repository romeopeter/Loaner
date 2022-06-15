/**
 * Message slice reads/ writes to the message state in store (store.js). Also exports reducer and actions.
 *
 *
 * **/
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    server: {
      status: "",
      messageType: "",
      detail: "",
    },
    client: {
      status: "",
      messageType: "",
      detail: "",
    },
  },
  reducers: {
    setServerMessage: (state, action) => {
      state.server.message = action.payload;
    },
    setClientMessage: (state, action) => {
      state.client = action.payload;

      localStorage.setItem(
        "ORDERBOOK_EXPIRED_TOKEN",
        JSON.stringify(state.client)
      );
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
