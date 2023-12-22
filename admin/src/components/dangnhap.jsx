import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import {
    loginStart,
    loginFailed,
    loginSuccess
} from "../redux/authSlice";
import { 
    adminprofileFailed, 
    adminprofileStart, 
    adminprofileSuccess 
} from "../redux/adminSlice";
import { 
    hospitalprofileStart,
    hospitalprofileSuccess,
    hospitalrofileFailed
} from "../redux/hospitalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { isHospital } from "../../../server/middlewares/auth";
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
            if (response.ok) {
                const data = await response.json();
                    console.log("data login", data)
                    const accessToken = data.accessToken;
                    console.log(accessToken)
                    const accountId = data._id;
                if (data.isAdmin) {
                    dispatch(loginSuccess(data));
                    dispatch(adminprofileStart());
                    try {
                        const response2 = await fetch("http://localhost:8000/v1/admin/profile/" + accountId, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                token: `Bearer ${accessToken}`
                            }
                        });

                        if (!response2.ok) {
                            dispatch(adminprofileFailed());
                        } else {
                            const data2 =await  response2.json();
                            console.log("data pro", data2)

                            dispatch(adminprofileSuccess(data2));
                        }
                    } catch (error) {
                        dispatch(adminprofileFailed());
                    }

                    localStorage.setItem('token', data.accessToken);
                    navigate("/dashboard");
                }
                else {
                    if (data.isHospital) {
                        dispatch(loginSuccess(data));
                        dispatch(hospitalprofileStart());
                        try {
                            const response3 = await fetch("http://localhost:8000/v1/hospital/profile/" + accountId, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    token: `Bearer ${accessToken}`
                                }
                            });

                            if (!response3.ok) {
                                dispatch(hospitalrofileFailed());
                            } else {
                                const data3 = await  response3.json();
                                console.log("data pro", data3)
                                dispatch(hospitalprofileSuccess(data3));
                            }
                        } catch (error) {
                            dispatch(hospitalrofileFailed());
                        }

                        localStorage.setItem('token', data.accessToken);
                        navigate("/dashboard");
                    } else {
                        setMsgErr("Vui lòng đăng nhập bằng tài khoản Admin hoặc Bệnh viện");
                        dispatch(loginFailed());
                    }
                }
            }
            else {
                const errorData = await response.json();
                setMsgErr(errorData.message);
                dispatch(loginFailed());
            }



        } catch (error) {

            setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
            dispatch(loginFailed());
        }
    }
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src="../../images/heart-rate.svg" alt="logo" />
                                    </div>
                                    <h4>Xin Chào!</h4>
                                    <h6 className="font-weight-light">Đăng nhập để tiếp tục</h6>
                                    <form className="pt-3" onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="exampleInputEmail1"
                                                placeholder="CCCD/Số định danh"
                                                onChange={(e) => setCccd(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="exampleInputPassword1"
                                                placeholder="Mật khẩu"
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
                                        <div className="mt-3">
                                            <button
                                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                                type="submit"
                                            >
                                                ĐĂNG NHẬP
                                            </button>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            {/* <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    Keep me signed in
                                                </label>
                                            </div> */}
                                            <a href="#" className="auth-link text-black align-items-center">
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                        {/* <div className="mb-2">
                                            <button
                                                type="button"
                                                className="btn btn-block btn-facebook auth-form-btn"
                                            >
                                                <i className="ti-facebook mr-2" />
                                                Connect using facebook
                                            </button>
                                        </div> */}
                                        {/* <div className="text-center mt-4 font-weight-light">
                                            Don't have an account?{" "}
                                            <a href="register.html" className="text-primary">
                                                Create
                                            </a>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>
            {/* container-scroller */}
        </>

    )
}
export default Dangnhap;