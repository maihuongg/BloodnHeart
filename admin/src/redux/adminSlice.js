import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        profile:{
            getadmin: null,
            isFetching: false,
            error: false
        },
        profileUser:{
            getUserProfile: null,
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
        //user 
        userprofileStart: (state) => {
            state.profileUser.isFetching = true;
        },
        userprofileSuccess: (state, action) => {
            state.profileUser.isFetching = false;
            state.profileUser.getUser = action.payload;
            state.profileUser.error = false;
        },
        userprofileFailed: (state) => {
            state.profileUser.isFetching = false;
            state.profileUser.error = true;
        },
    }
});

export const {
    adminprofileStart,
    adminprofileSuccess,
    adminprofileFailed,
    userprofileStart,
    userprofileSuccess,
    userprofileFailed
} = adminSlice.actions;

export default adminSlice.reducer;