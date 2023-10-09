import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from "./authSlice";

export const loginUser = async (account, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", account);
        dispatch(loginSuccess(res.data));
        // console.log(res.data)
        // Save token to localStorage
        localStorage.setItem('token', res.data.accessToken);
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};
