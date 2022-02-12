/**
 * Loan slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loanRequestCP, loanRequestBond, getOffers } from "../services/loan.service.js";

import { setServerMessage } from "./messageSlice";

export const getOffersAction = createAsyncThunk("loan/getOffers", async (thunkAPI) => {
    const res = await getOffers();

    if (res.status === 200) return res.data;
});

export const loanSlice = createSlice({
    name: "loan",
    initialState: {offers: []},
    reducers: {
        createLoan: (state, action) => {
            return;
        },
    },
    extraReducers: {
        [getOffersAction.pending]: (state, action) => {
            console.log("Pending")
        },
        [getOffersAction.rejected]: (state, action) => {
            console.log("Rejected")
        },
        [getOffersAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.offers = payload;

            console.log(state.offers);
        },
    }
});

export default loanSlice.reducer;

export const asyncCPLoanRequest = (data) => (dispatch) => {
    return loanRequestCP(data).then((response) => {

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

export const asyncBondLoanRequest = (data) => (dispatch) => {
    return loanRequestBond(data).then((response) => {

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