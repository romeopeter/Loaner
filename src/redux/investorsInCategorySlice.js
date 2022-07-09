import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getInvestorsInCategory,
	assignInvestorsToCategories,
	mergeInvestorsInCategories
} from "../services/loan.service.js";
import handleRequestError from "./errorHandler";

// All investors regardless of category
export const getInvestorsInCategoryAction = createAsyncThunk(
	"investorsList/getInvestorsInCategoryAction",
	async (data, thunkAPI) => {
		const response = await getInvestorsInCategory(data);
		const dispatch = thunkAPI.dispatch;

		handleRequestError(response, dispatch);

		if (response.status === 200) return response.data;
	}
);

// Investors in category
export const mergeInvestorsInCategoriesAction = createAsyncThunk(
	"investorsCategories/mergeInvestorsInCategoriesAction",
	async (params, thunkAPI) => {

		if (params.length > 0) {
			const response = await mergeInvestorsInCategories(params);

			const dispatch = thunkAPI.dispatch;
			handleRequestError(response, dispatch);

			return response.flat();
		}
	}
)

export const investorsInCategorySlice = createSlice({
	name: "investorsInCategory",
	initialState: {investors: []},
	extraReducers: {

		// Get all category
		[getInvestorsInCategoryAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[getInvestorsInCategoryAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[getInvestorsInCategoryAction.fulfilled]: (state, action) => {
			console.log("Request fulfilled");
			const payload = action.payload !== undefined && action.payload;
			state.investors = payload;
		},

		// Merge investors in multiple category
		[mergeInvestorsInCategoriesAction.pending]: (state, action) => {
			console.log("Pending");
		},
		[mergeInvestorsInCategoriesAction.rejected]: (state, action) => {
			console.log("rejected");
		},
		[mergeInvestorsInCategoriesAction.fulfilled]: (state, action) => {
			console.log("Request fulfilled");
			const payload = action.payload !== undefined && action.payload;
			state.investors = payload

			// Next: Filter duplicates investors in payload 
		}
	},
})

export default investorsInCategorySlice.reducer;