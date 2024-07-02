import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import baseUrl from "../../../utils/constant";
function ResetMatKhau() {
    const [isTokenValid, setIsTokenValid] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const queryParameters = new URLSearchParams(window.location.search);
    const resetToken = queryParameters.get("token");
    async function checkValidToken(resetToken) {
        const requestToken = {
            token: resetToken
        }
        try {
            const response = await fetch(`${baseUrl}/v1/user/valid-reset-token`, {
                method: 'POST',
                body: JSON.stringify(requestToken),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                return false
            } else {
                return true
            }
        } catch (error) {
            return false;
        }
    }
    checkValidToken(resetToken)
        .then(result => {
            console.log(result);
            setIsTokenValid(result);
        })
        .catch(error => {
            console.error(error);
        });
        const handleResetPassword = async (e) => {
            e.preventDefault();
        
            try {
                const isValidToken = await checkValidToken(resetToken);
        
                if (isValidToken) {
                    const requestForgot = {
                        newPassword: newPassword,
                        repeatNewPassword: repeatNewPassword
                    };
                    console.log(resetToken)

                    const response = await fetch(`${baseUrl}/v1/user/reset-password`, {
                        method: 'PUT',
                        body: JSON.stringify(requestForgot),
                        headers: {
                            'Content-Type': 'application/json',
                            token: `Bearer ${resetToken}`
                        }
                    });
        
                    if (!response.ok) {
                        const errorData = await response.json();                        
                        setMsgSuccess("Password changed successfully!");
                        setMsgErr(errorData.message);
                    } else {
                        setMsgErr();
                        setMsgSuccess("Password changed successfully!");
                    }
                } else {
                    setIsTokenValid(false);
                    setMsgErr("Token expired or invalid.");
                }
            } catch (error) {
                setMsgErr("An unexpected error occurred. Please try again.");
                console.log("ResetPassword Error: ", error);
            }
        };
        


    return (
        <>
            {/* Navbar */}
            <div className="container-fluid bg-light position-relative shadow">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5 position-relative">
                    <a href="/" className="navbar-brand font-weight-bold text-secondary" style={{ fontSize: 50 }}>
                        <img src="img/logo.png" alt="Logo"></img>
                        <span className="text-primary" style={{ fontSize: 40 }}> BloodnHeart</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav font-weight-bold mx-auto py-0">
                            {/* You can add navigation links here if needed */}
                        </div>
                        <a href="/" className="btn btn-primary m-3 position-absolute" style={{ right: "0px" }}>
                            QUAY LẠI <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
            {/* Change Password Form */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">THAY ĐỔI MẬT KHẨU</span>
                        </p>
                        <h2 className="mb-2 text-primary">CẬP NHẬT MẬT KHẨU MỚI</h2>
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            {isTokenValid ? (
                                <form onSubmit={handleResetPassword} className="d-flex flex-column align-items-center">
                                    <div className="form-group col-lg-8">
                                        <label className="form-control-label">Nhập mật khẩu mới</label>
                                        <input type="password" className="form-control " onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group col-lg-8">
                                        <label className="form-control-label">Xác nhận mật khẩu</label>
                                        <input type="password" className="form-control" onChange={(e) => setRepeatNewPassword(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-outline-primary">
                                            XÁC NHẬN <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="form-group col-lg-8">

                                        {/* Error Message */}
                                        {msgErr && (
                                            <div className="alert alert-danger" role="alert">
                                                {msgErr}
                                            </div>
                                        )}
                                        {msgSuccess && (
                                            <div className="alert alert-success" role="alert">
                                                {msgSuccess}
                                            </div>
                                        )}
                                        </div>
                                </form>
                            ) : (
                                <div className="form-group col-lg-12 alert alert-danger text-center" role="alert">
                                    Token hết hạn hoặc không hợp lệ.
                                </div>

                            )}
                            <div className="col-lg-12 login-btm text-center mt-3">
                                <h6 className="mb-2">
                                    <Link to="/dangky">Đăng ký tài khoản mới.</Link>
                                </h6>
                                <h6 className="mb-2">
                                    Đã có tài khoản? <Link to="/dangnhap">Đăng nhập ngay </Link>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>


            </div>



        </>
    );
}

export default ResetMatKhau;
