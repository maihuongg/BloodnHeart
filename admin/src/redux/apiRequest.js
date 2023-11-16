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
export const loginAdmin = async (account, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", account,{
            withCredentials: true,
          });
        if (res.data.accessToken) {
            dispatch(loginSuccess(res.data));
            localStorage.setItem('token', res.data.accessToken);
            navigate("/");
        } else {
            // no accessToken
            console.log(res.data.message);
            dispatch(loginFailed(res.data.message));
        }
        // return res;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            // Handle 404 Not Found
            dispatch(loginFailed("Số CCCD không tìm thấy"));
        } else if (err.response && err.response.data && err.response.data.message) {
            // Handle other errors with message
            dispatch(loginFailed(err.response.data.message));
        } else {
            // Handle other errors
            dispatch(loginFailed("An unexpected error occurred."));
        }

        throw err;
    }
};
