import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getInvestorAllOffers} from "../services/loan.service.js";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse";

export const getInvestorAllOffersAction = createAsyncThunk(
	"investor/getInvestorAllOffersAction",
	async (ID, thunkAPI) => {
		const dispatch = thunkAPI.dispatch;
		const res = await getInvestorAllOffers(ID);

		// Catch error
		handleRequestError(res, dispatch);

		if (res.status === 200) return res.data
	}
);

export const investorSlce = createSlice({
	name: "investor",
	initialState: {
		allOffers: null,
		declinedOffers: null,
		successfulOffers: null,
	},
	reducers: "",
	extraReducers: {
		[getInvestorAllOffersAction.pending]: () => {
			console.log("Pending");
		},
		[getInvestorAllOffersAction.rejected]: () => {
			console.log("Rejected");
		},
		[getInvestorAllOffersAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.allOffers = payload;
		}
	},
});

export default investorSlce.reducer;