import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        eventdetail:{
            getevent: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        eventdetailStart: (state) => {
            state.eventdetail.isFetching = true;
        },
        eventdetailSuccess: (state, action) => {
            state.eventdetail.isFetching = false;
            state.eventdetail.getevent = action.payload;
            state.eventdetail.error = false;
        },
        eventdetailFailed: (state) => {
            state.eventdetail.isFetching = false;
            state.eventdetail.error = true;
        },
    }
});

export const {
    eventdetailStart,
    eventdetailSuccess,
    eventdetailFailed
} = eventSlice.actions;

export default eventSlice.reducer;