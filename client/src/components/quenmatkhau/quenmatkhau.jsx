import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/constant";
function QuenMatKhau() {
    const [cccd, setCccd] = useState("");
    const [email, setEmail] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);
    const navigate = useNavigate();

    const generateRandomDigits = () => {
        let result = '';
        for (let i = 0; i < 6; i++) {
            const randomDigit = Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
            result += randomDigit.toString();
        }
        return result;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const random = generateRandomDigits();
        const requestForgot = {
            cccd: cccd,
            email: email,
            code: random
        };
        console.log('request :', requestForgot)
        try {
            const response = await fetch(`${baseUrl}/v1/user/forgot-password`, {
                method: 'POST',
                body: JSON.stringify(requestForgot),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("data: ", errorData)
                setMsgErr(errorData.message);

            } else {
                const successMsg = await response.json();
                setMsgErr(null);
                setMsgSuccess(successMsg.message);
                navigate("/codeforgotpassword");
            }
        } catch (error) {
            setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
            console.log("ForgotPassword Error: ", error);
        }
    }

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
                            <span className="px-2">Quên Mật Khẩu</span>
                        </p>
                        <h2 className="mb-2 text-primary">LẤY LẠI MẬT KHẨU</h2>
                    </div>
                </div>

                <form
                    className="col-6 mx-auto d-flex flex-column align-items-center"
                    onSubmit={handleForgotPassword}>
                    <div className="form-group col-lg-8">
                        <label className="form-control-label mb-2">CCCD/CMND/Số định danh</label>
                        <input
                            type="text"
                            className="form-control p-2"
                            onChange={(e) => setCccd(e.target.value)} />
                    </div>
                    <div className="form-group col-lg-8">
                        <label className="form-control-label mb-2">Email đã đăng ký</label>
                        <input
                            type="text"
                            className="form-control p-2"
                            onChange={(e) => setEmail(e.target.value)} />
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

                        <div className="col-lg-12 d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn btn-outline-primary mb-2 ">
                                GỬI YÊU CẦU <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    {/* <div className="col-lg-12 login-btm text-center">
                        <h6 className="mb-2">
                            <Link to="/dangky">Đăng ký tài khoản mới.</Link>
                        </h6 >
                        <h6 className="mb-2">
                            Đã có tài khoản? <Link to="/dangnhap">Đăng nhập ngay </Link>
                        </h6>
                    </div> */}
                </form>
            </div>
        </>
    );
}

export default QuenMatKhau;
