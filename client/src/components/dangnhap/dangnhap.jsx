import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useDispatch } from "react-redux";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../../redux/userSlice";
import {
    loginFailed,
    loginStart,
    loginSuccess,
} from "../../redux/authSlice";
function Dangnhap() {
    const [cccd, setCccd] = useState("");
    const [password, setPassword] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const newUser = {
            cccd: cccd,
            password: password,
        };
        dispatch(loginStart());
        try {
            const response = await fetch('http://localhost:8000/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMsgErr(errorData.message);
                dispatch(loginFailed());
            } else {
                const data = await response.json();
                dispatch(loginSuccess(data));
                localStorage.setItem('token', data.accessToken);
                const userId = data._id;
                const accessToken = data.accessToken;
                dispatch(userprofileStart());
                try {
                    const response1 = await fetch("http://localhost:8000/v1/user/profile/" + userId, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            token: `Bearer ${accessToken}`
                        }
                    });
                    if (!response1.ok) {
                        dispatch(userprofileFailed());
                    } else {
                        const data1 = await response1.json();
                        dispatch(userprofileSuccess(data1));
                    }
                } catch (error) {
                    dispatch(userprofileFailed());
                }
                navigate("/");
            }

        } catch (error) {

            setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
            dispatch(loginFailed());
        }
    }

    return (
        <>
            {/* Navbar Start */}
            <div className="container-fluid bg-light position-relative shadow">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5 position-relative">
                    <a
                        href=""
                        className="navbar-brand font-weight-bold text-secondary"
                        style={{ fontSize: 50 }}
                    >
                        <img src="img/logo.png"></img>
                        <span className="text-primary" style={{ fontSize: 40 }}> BloodnHeart</span>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav font-weight-bold mx-auto py-0">

                        </div>
                        <a href="/" className="btn btn-primary m-3 position-absolute" style={{ right: "0px" }}>
                            QUAY LẠI <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}

            <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4" />
                        <div className="col-lg-4 col-md-4 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true" />
                            </div>
                            <div className="col-lg-12 login-title">ĐĂNG NHẬP</div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label className="form-control-label">CCCD/CMND</label>
                                            <input
                                                type="text"
                                                className="form-control inputtext"
                                                onChange={(e) => setCccd(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">MẬT KHẨU</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        {/* msgErr */}
                                        <div className="form-group">
                                            {/* Error Message */}
                                            {msgErr && (
                                                <div className="alert alert-danger" role="alert">
                                                    {msgErr}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">
                                                {/* You can remove the error message rendering from here */}
                                            </div>
                                            <div className="col-lg-12 login-btm login-button d-flex justify-content-center align-items-center">
                                                <button type="submit" className="btn btn-outline-primary">
                                                    ĐĂNG NHẬP <i className="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 login-btm text-center">
                                            <p className="login-text">
                                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                                            </p>
                                            <p className="login-text">
                                                Chưa có tài khoản? <Link to="/dangky">Tạo tài khoản</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
export default Dangnhap;