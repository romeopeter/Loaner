/**
 * Loan slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import {createSlice} from "@reduxjs/toolkit";

import { loanRequest } from "../services/auth.service.js";

export const loanSlice = createSlice({
    name: "loan",
    initialState: [],
    reducers: {}
});

export default loanSlice.reducer;