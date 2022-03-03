/**
 * Loan slice reads/ writes to the auth store (store.js). Also exports reducer and actions.
 *
 *
 * **/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    loanRequestCP,
    loanRequestBond,
    getOffers,
    loanRequestAddInvestor,
    loanRequestPublish,
} from "../services/loan.service.js";

import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse";

export const CPLoanOfferAction = createAsyncThunk(
    "loan/CPLoanOfferAction",
    async (data, thunkAPI) => {
        const res = await loanRequestCP(data);
        const dispatch = thunkAPI.dispatch;

        handleRequestError(res, dispatch);

        if (res.status === 200 || res.status === 201) return res.data;
    }
);
export const bondLoanOfferAction = createAsyncThunk(
    "loan/bondLoanOfferAction",
    async (data, thunkAPI) => {
        const res = await loanRequestBond(data);
        const dispatch = thunkAPI.dispatch;

        handleRequestError(res, dispatch);

        if (res.status === 200 || res.status === 201) return res.data;
    }
);

export const getOffersAction = createAsyncThunk(
    "loan/getOffers",
    async (thunkAPI) => {
        const res = await getOffers();
        // const dispatch = thunkAPI.dispatch;

        // handleRequestError(res, dispatch);

        if (res.status === 200) return res.data;
    }
);

export const AddInvestorsAction = createAsyncThunk(
    "loan/AddInvestors",
    async (arg, thunkAPI) => {
        console.log(arg);
        const {loanOfferId: id, data} = arg;
        const res = await loanRequestAddInvestor(id, data);
        const dispatch = thunkAPI.dispatch;

        handleRequestError(res, dispatch);

        if (res.status === 200 || res.status === 201) return res.data;
    }
);

export const publishOfferAction = createAsyncThunk(
    "loan/PublishOfferAction",
    async (id, thunkAPI) => {
        const res = await loanRequestPublish(id);
        const dispatch = thunkAPI.dispatch;

        handleRequestError(res, dispatch);

        if (res.status === 200 || res.status === 201) return res.data;
    }
);

export const loanSlice = createSlice({
    name: "loan",
    initialState: {
        offers: [],
        currentOffer: null,
    },
    reducers: {
        createLoan: (state, action) => {
            return;
        },
    },
    extraReducers: {
        // CREATE CP LOAN OFFERS
        [CPLoanOfferAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [CPLoanOfferAction.rejected]: (state, action) => {
            console.log("CP loan not created");
        },
        [CPLoanOfferAction.fulfilled]: (state, action) => {
            console.log("Request fulfilled");
            const payload = action.payload !== undefined && action.payload;
            state.currentOffer = payload;
        },

        // CREATE BOND LOAN OFFERS
        [bondLoanOfferAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [bondLoanOfferAction.rejected]: (state, action) => {
            console.log("Bond loan not created");
        },
        [bondLoanOfferAction.fulfilled]: (state, action) => {
            console.log("Request fulfilled");
            const payload = action.payload !== undefined && action.payload;
            state.currentOffer = payload;
        },

        // GET OFFERS
        [getOffersAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [getOffersAction.rejected]: (state, action) => {
            console.log("Rejected");
        },
        [getOffersAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.offers = payload;

            console.log(state.offers);
        },
    },
});

export default loanSlice.reducer;

export const asyncCPLoanRequest = (data) => (dispatch) => {
    return loanRequestCP(data).then((response) => {
        if (response.status === 200 || response.status === 201) {
            dispatch(setServerMessage("Loan created succesfully"));
        }

        // Check error
        if ("stack" in response) {
            dispatch(setServerMessage(response.message));
        }

        return response;
    });
};

export const asyncBondLoanRequest = (data) => (dispatch) => {
    return loanRequestBond(data).then((response) => {
        if (response.status === 200 || response.status === 201) {
            dispatch(setServerMessage("Loan created succesfully"));
        }

        // Check error
        if ("stack" in response) {
            dispatch(setServerMessage(response.message));
        }

        return response;
    });
};