import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getInvestorAllOffers, getOffer} from "../services/loan.service.js";
import handleRequestError from "./errorHandler";

export const getInvestorAllOffersAction = createAsyncThunk(
	"investor/getInvestorAllOffersAction",
	async (ID, thunkAPI) => {
		const dispatch = thunkAPI.dispatch;
		const res = await getInvestorAllOffers(ID);

		// Catch error
		if (res.status !== 200) handleRequestError(res, dispatch);

		if (res.status === 200) return res.data
	}
);

export const getOfferAction = createAsyncThunk(
    "loan/getOfferAction",
    async (requestParams, thunkAPI) => {
        const {id, dealType} = requestParams;

        const res = await getOffer(dealType, id);
        const dispatch = thunkAPI.dispatch;

        if (res.status !== 200) handleRequestError(res, dispatch);

        if (res.status === 200) return res.data;
    }
);

export const investorSlce = createSlice({
	name: "investor",
	initialState: {
		allOffers: null,
		currentOffer: null,
		declinedOffers: null,
		successfulOffers: null,
	},
	reducers: "",
	extraReducers: {
		// Get offers
        [getOfferAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [getOfferAction.rejected]: (state, action) => {
            console.log("Rejected");
        },
        [getOfferAction.fulfilled]: (state, action) => {
			console.log("Fulfilled");
            const payload = action.payload !== undefined && action.payload;
            state.currentOffer = payload;
        },

		// Get all investor's offers
		[getInvestorAllOffersAction.pending]: () => {
			console.log("Pending");
		},
		[getInvestorAllOffersAction.rejected]: () => {
			console.log("Rejected");
		},
		[getInvestorAllOffersAction.fulfilled]: (state, action) => {
			console.log("Fulfilled");
			const payload = action.payload !== undefined && action.payload;
			state.allOffers = payload;
		}
	},
});

export default investorSlce.reducer;