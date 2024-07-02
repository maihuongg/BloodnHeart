import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import isEmpty from "validator/lib/isEmpty";
import {
    registerStart,
    registerSuccess,
    registerFailed
} from "../../redux/authSlice";
import baseUrl from "../../../utils/constant";
function Dangky(){
    const [email, setEmail] = useState("");
    const [cccd, setCccd] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e)=>{
        e.preventDefault();
        const newUser = {
            cccd: cccd,
            password: password,
            email: email
        };
        const repw = repassword;
        dispatch(registerStart());
        if (isEmpty(repassword)) {
            setMsgErr("Vui lòng điền vào các mục còn trống");
            dispatch(registerFailed());
        }else{
            if (repw == newUser.password){
                try {
                    const response = await fetch(`${baseUrl}/v1/auth/register`, {
                        method: 'POST',
                        body: JSON.stringify(newUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        setMsgErr(errorData.message);
                        dispatch(registerFailed());
                    }else{
                        dispatch(registerSuccess());
                        navigate("/dangnhap");
                    }    
                } catch (error) {
                  
                    setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
                    dispatch(registerFailed());
                }
            }else {
                //e.preventDefault();
                setMsgErr("Xác nhận lại mật khẩu không trùng nhau.");
            }
        } 
    }
    return(
        <> {/* Navbar Start */}
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
        <section>
            <div className="container ">
                    <div className="row align-items-center ">
                        <div className="col-lg-4 col-md-4" />
                        <div className="col-lg-4 col-md-4 signup-box ">
                            <div className="col-lg-12 signup-key">
                            <i className="fa fa-key" aria-hidden="true" />
                            </div>
                            <div className="col-lg-12 signup-title">ĐĂNG KÝ</div>
                            <div className="col-lg-12 signup-form">
                                <div className="col-lg-12 signup-form">
                                <form onSubmit={handleRegister}>
                                    <div className="form-group">
                                            <label className="form-control-label">EMAIL</label>
                                            <input 
                                                type="email" 
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">CCCD/CMND/SỐ ĐỊNH DANH</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
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
                                        <div className="form-group">
                                            <label className="form-control-label">ĐIỀN LẠI MẬT KHẨU</label>
                                            <input 
                                                type="password" 
                                                className="form-control"
                                                onChange={(e) => setRepassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            {/* Error Message */}
                                            {msgErr && (
                                                <div className="alert alert-danger" role="alert">
                                                    {msgErr}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-lg-12 signupbttm">
                                            <div className="col-lg-6 signup-btm signup-text">
                                                {/* Error Message */}
                                            </div>
                                            <div className="col-lg-12 signup-btm signup-button d-flex justify-content-center align-items-center">
                                                <button type="submit" className="btn btn-outline-primary">
                                                    ĐĂNG KÝ <i class="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 login-btm text-center">
                                            <p className="login-text">
                                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                                            </p>
                                            <p className="login-text">
                                                Đã có tài khoản? <Link to="/dangnhap">Đăng nhập ngay </Link>
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
export default Dangky;