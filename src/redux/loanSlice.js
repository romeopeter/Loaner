/**
 * Loan slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice } from "@reduxjs/toolkit";

import { loanRequest } from "../services/auth.service.js";

import { setServerMessage } from "./messageSlice";

export const loanSlice = createSlice({
    name: "loan",
    initialState: [],
    reducers: {
        createLoan: (state, action) => {
            return;
        },
    }
});

export default loanSlice.reducer;

export const asyncLoanRequest = (data) => (dispatch) => {
    return loanRequest(data).then((response) => {

        if(response.status === 200 || response.status === 201) {
           dispatch(setServerMessage("Loan created succesfully"));
        }

        // Check error
        if ("stack" in response) {
            dispatch(setServerMessage(response.message));
        }

        return response
    });
};