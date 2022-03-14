import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getBids, 
    getBid, 
    createBid, 
    updateBids
} from "../services/loan.service.js";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse";


export const createBidAction = createAsyncThunk(
    "bid/createBidAction",
    async (data, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const res = await createBid(data);

        // Catch error
        handleRequestError(res, dispatch);

        if (res.status === 200) return res.data
    }
);

export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bid: null,
        allBids: null,
    },
    extraReducers: {
        [createBidAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [createBidAction.rejected]: (state, action) => {
            console.log("rejected");
        },
        [createBidAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.bid = payload;
        },
    }
 
});

export default bidSlice.reducer;