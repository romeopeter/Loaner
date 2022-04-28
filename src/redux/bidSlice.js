import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    // eslint-disable-next-line no-unused-vars
    getBids, 
    getBid,
    createBid, 
    // eslint-disable-next-line no-unused-vars
    updateBids,
    getapprovedBids,
    getDeclinedBids,
    getAllOffersStatus
} from "../services/bid.service.js";
import handleRequestError from "./errorResponse";

export const createBidAction = createAsyncThunk(
    "bid/createBidAction",
    async (data, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const res = await createBid(data);

        // Catch error
        if (res.status !== 200) {
            handleRequestError(res, dispatch);   
        }

        if (res.status === 200) return res.data;
    }
);

export const getBidAction = createAsyncThunk("bid/getBidAction", async (offerId, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const res = await getBid(offerId);

    // Catch error
    if (res.status !== 200) {
        handleRequestError(res, dispatch);   
    }

    if (res.status === 200) return res.data;
});

export const getAllOffersStatusAction = createAsyncThunk(
    "bid/getAllOffersStatusAction",
    async (reqArr, thunkAPI) => {
        const res = await getAllOffersStatus(reqArr);
        return res;
    }
)

export const getApprovedBidsAction = createAsyncThunk(
    "bid/getApprovedBidsAction",
    async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const res = await getapprovedBids();

        // Catch error
        if (res.status !== 200) {
            handleRequestError(res, dispatch);   
        }

        if (res.status === 200) return res.data;
    }
)

export const getDeclinedBidsAction = createAsyncThunk(
    "bid/getDeclinedBidsAction",
    async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const res = await getDeclinedBids();

        // Catch error
        if (res.status !== 200) {
            handleRequestError(res, dispatch);   
        }

        if (res.status === 200) return res.data;
    }
)

export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bid: null,
        allBids: null,
        allBidsStatus: null,
        approvedBids: null,
        declinedBids: null
    },
    reducers: {
        setCurrentBid: (state, action) => {
            state.bid = action.payload;
        }
    },
    extraReducers: {
        // GET BID
        [getBidAction.pending]: (state, action) => {
            console.log("Pending");
        },
        [getBidAction.rejected]: (state, action) => {
            console.log("rejected");
        },
        [getBidAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.bid = payload;
        },

        // CREATE BID
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

        // GET OFFERS STATUS
        [getAllOffersStatusAction.pending]: (state, action) => {
            console.log("pending");
        },
        [getAllOffersStatusAction.rejected]: (state, action) => {
            console.log("rejected");
        },
        [getAllOffersStatusAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.allBidsStatus = payload;
            
        },
            // Get approved Bids
            [getApprovedBidsAction.pending]: (state, action) => {
            console.log("pending");
        },
        [getApprovedBidsAction.rejected]: (state, action) => {
            console.log("rejected");
        },
        [getApprovedBidsAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.approvedBids = payload;
        },

        // Get declined Bids
        [getDeclinedBidsAction.pending]: (state, action) => {
            console.log("pending");
        },
        [getDeclinedBidsAction.rejected]: (state, action) => {
            console.log("rejected");
        },
        [getDeclinedBidsAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.approvedBids = payload;
        },

    }
 
});

export const { setCurrentBid } = bidSlice.actions;
export default bidSlice.reducer;