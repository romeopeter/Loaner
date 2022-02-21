import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getInvestorsCategories,
	createInvestorsCategories,
	getInvestorsCategory,
	getInvestorsInCategories,
} from "../services/loan.service.js";
import handleRequestError from "./errorResponse";

export const getInvestorsCategoriesAction = createAsyncThunk(
	"investorsList/getInvestorsCategoriesAction",
	async (data, thunkAPI) => {
		const response = await getInvestorsCategories(data);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const createInvestorsCategoriesAction = createAsyncThunk(
	"investorsList/createInvestorsCategoriesAction",
	async (thunkAPI) => {
		const response = await createInvestorsCategories();
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const getInvestorsCategoryAction = createAsyncThunk(
	"investorsList/getInvestorsCategoryAction",
	async (ID, thunkAPI) => {
		const response = await getInvestorsCategory(ID);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const getInvestorsInCategoriesAction = createAsyncThunk(
	"investorsCategories/getInvestorsInCategoriesAction",
	async (ID, thunkAPI) => {
		const response = await getInvestorsInCategories(ID);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

export const investorsCategoriesSlice = createSlice({
	name: "investorsCategories",
	initialState: { categories: [] },
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
			state.categories = payload;
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
			state.categories = payload;
		},

		// Get investors in categories
		[getInvestorsCategoryAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[getInvestorsCategoryAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[getInvestorsCategoryAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.categories = payload;
		}
	},
});

export default investorsCategoriesSlice.reducer;