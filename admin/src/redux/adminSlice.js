import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        profile:{
            getadmin: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        adminprofileStart: (state) => {
            state.profile.isFetching = true;
        },
        adminprofileSuccess: (state, action) => {
            state.profile.isFetching = false;
            state.profile.getadmin = action.payload;
            state.profile.error = false;
        },
        adminprofileFailed: (state) => {
            state.profile.isFetching = false;
            state.profile.error = true;
        },
    }
});

export const {
    adminprofileStart,
    adminprofileSuccess,
    adminprofileFailed,
} = adminSlice.actions;

export default adminSlice.reducer;