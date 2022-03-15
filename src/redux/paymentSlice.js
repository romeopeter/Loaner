import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makePayment } from "../services/payment.service.js";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse";

const makePaymentAction = createAsyncThunk("payment/makePaymentAction", async (thunkAPI) => {});

export const paymentSlice = createSlice({
	name: "paymentSlice",
	initialState: {},
	extraReducers: {
		[makePaymentAction.pending]: (state, action) => {},
		[makePaymentAction.rejected]: (state, action) => {},
		[makePaymentAction.fulfilled]: (state, action) => {},
	}
});

export default paymentSlice.reducer;