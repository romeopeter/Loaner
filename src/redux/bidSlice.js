import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getBids, 
    getBid, 
    createBid, 
    updateBids,
    getAllOffersStatus
} from "../services/bid.service.js";
import { setServerMessage } from "./messageSlice";
import handleRequestError from "./errorResponse";


export const createBidAction = createAsyncThunk(
    "bid/createBidAction",
    async (data, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const res = await createBid(data);

        // Catch error
        handleRequestError(res, dispatch);

        if (res.status === 200) console.log(res)
    }
);

export const getAllOffersStatusAction = createAsyncThunk(
    "bid/getAllOffersStatusAction",
    async (reqArr, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const response = await getAllOffersStatus(reqArr);

        handleRequestError(response, dispatch);

        return response;
    }
)

export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bid: null,
        allBids: null,
        allBidsStatus: null
    },
    reducers: {
        setCurrentBid: (state, action) => {
            state.bid = action.payload;
        }
    },
    extraReducers: {

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
            console.log("pending")
        },
        [getAllOffersStatusAction.rejected]: (state, action) => {
            console.log("rejected")
        },
        [getAllOffersStatusAction.fulfilled]: (state, action) => {
            const payload = action.payload !== undefined && action.payload;
            state.allBidsStatus = payload;
        }
    }
 
});

export const { setCurrentBid } = bidSlice.actions;
export default bidSlice.reducer;