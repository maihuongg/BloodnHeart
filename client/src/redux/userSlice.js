import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile:{
            getUser: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        userprofileStart: (state) => {
            state.profile.isFetching = true;
        },
        userprofileSuccess: (state, action) => {
            state.profile.isFetching = false;
            state.profile.getUser = action.payload;
            state.profile.error = false;
        },
        userprofileFailed: (state) => {
            state.profile.isFetching = false;
            state.profile.error = true;
        },
    }
});

export const {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} = userSlice.actions;

export default userSlice.reducer;