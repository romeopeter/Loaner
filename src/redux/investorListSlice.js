import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	saveInvestorsList,
	getInvestorsList,
	getInvestor,
} from "../services/loan.service.js";
import handleRequestError from "./errorHandler";

export const saveInvestorListAction = createAsyncThunk(
	"investorsList/saveInvestorListAction",
	async (data, thunkAPI) => {
		const response = await saveInvestorsList(data);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const getInvestorsListAction = createAsyncThunk(
	"investorsList/getInvestorsListAction",
	async (thunkAPI) => {
		const response = await getInvestorsList();
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const getInvestorAction = createAsyncThunk(
	"investorsList/getInvestorAction",
	async (ID, thunkAPI) => {
		const response = await getInvestor(ID);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const investorsListSlice = createSlice({
	name: "investorsList",
	initialState: { list: [] },
	extraReducers: {

		// Save List
		[saveInvestorListAction.pending]: (state, action) => {console.log("Pending")},
		[saveInvestorListAction.rejected]: (state, action) => {console.log("rejected")},
		[saveInvestorListAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.list = payload
		},

		// Get Lists
		[getInvestorsListAction.pending]: (state, action) => {console.log("Pending")},
		[getInvestorsListAction.rejected]: (state, action) => {console.log("rejected")},
		[getInvestorsListAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.list = payload
		},

		// Get investor
		[getInvestorAction.pending]: (state, action) => {console.log("Pending")},
		[getInvestorAction.rejected]: (state, action) => {console.log("rejected")},
		[getInvestorAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.list = payload
		},
	},
});

export default investorsListSlice.reducer;