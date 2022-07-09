import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadPayment } from "../services/payment.service.js";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorHandler";

export const uploadPaymentAction = createAsyncThunk(
	"payment/uploadPaymentAction", 
	async (data, thunkAPI) => {
		const dispatch = thunkAPI.dispatch
		const res = await uploadPayment(data);

		// Handle error
		handleRequestError(res, dispatch);

		if (res.status === 200) return res.data;
	}
);

export const paymentSlice = createSlice({
	name: "paymentSlice",
	initialState: {
		uploadPaymentResponse: null
	},
	extraReducers: {
		[uploadPaymentAction.pending]: (state, action) => {},
		[uploadPaymentAction.rejected]: (state, action) => {},
		[uploadPaymentAction.fulfilled]: (state, action) => {
			const payload = action.payload !== undefined && action.payload;
			state.uploadPaymentResponse = payload;
		},
	}
});

export default paymentSlice.reducer;