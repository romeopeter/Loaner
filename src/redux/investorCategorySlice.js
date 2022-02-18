import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getInvestorsCategories,
	createInvestorsCategories,
	getInvestorsCategory,
} from "../services/loan.service.js";
import handleRequestError from "./errorResponse";

export const getInvestorsCategoriesAction = createAsyncThunk(
	"investorsList/saveInvestorListAction",
	async (data, thunkAPI) => {
		const response = await getInvestorsCategories(data);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const createInvestorsCategoriesAction = createAsyncThunk(
	"investorsList/getInvestorsListAction",
	async (thunkAPI) => {
		const response = await createInvestorsCategories();
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const getInvestorsCategoryAction = createAsyncThunk(
	"investorsList/getInvestorsListAction",
	async (ID, thunkAPI) => {
		const response = await getInvestorsCategory(ID);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const investorsCategoriesSlice = createSlice({
	name: "investorsCategories",
	initialState: { investorsCategories: [] },
	extraReducers: {
		// Get Categories
		[getInvestorsCategoriesAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[getInvestorsCategoriesAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[getInvestorsCategoriesAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.investorsCategories = payload;
		},

		// Create Categories
		[createInvestorsCategoriesAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[createInvestorsCategoriesAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[createInvestorsCategoriesAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.investorsCategories = payload;
		},

		// Get Category
		[getInvestorsCategoryAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[getInvestorsCategoryAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[getInvestorsCategoryAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.investorsCategories = payload;
		},
	},
});

export default investorsCategoriesSlice.reducer;