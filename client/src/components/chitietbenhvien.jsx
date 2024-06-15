import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
function ChitietBenhvien() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken
    const hospitalDetail = useSelector((state) => state.event.hospital.getHospital);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logOutStart());
        try {
            const res = await fetch("http://localhost:8000/v1/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!res.ok) {
                dispatch(logOutFailed());
            } else {
                dispatch(logOutSuccess());
                navigate("/");
            }
        } catch (error) {
            dispatch(logOutFailed());
        }
    }
    return (
        <>
            <>
                {/* Navbar Start */}
                <div className="container-fluid bg-light position-relative shadow">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
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
                            {user ? (
                                <>
                                    <div className="navbar-nav font-weight-bold mx-auto py-0">
                                        <Link to="/" className="nav-item nav-link">
                                            Trang chủ
                                        </Link>
                                        <Link to="/sukien" className="nav-item nav-link">
                                            Sự kiện
                                        </Link>

                                        <Link to="/lienhe" className="nav-item nav-link">
                                            Hợp tác
                                        </Link>
                                        <div className="nav-item dropdown">
                                            <a
                                                href="#"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                Hồ sơ cá nhân
                                            </a>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <Link to="/hoso" className="dropdown-item">
                                                    Thông tin cá nhân
                                                </Link>
                                                <Link to="/lichhen" className="dropdown-item">
                                                    Lịch hẹn của bạn
                                                </Link>
                                                <Link to="/lichsu" className="dropdown-item">
                                                    Lịch sử hiến máu
                                                </Link>
                                            </div>
                                        </div>
                                        <Link to="/gioithieu" className="nav-item nav-link">
                                            Giới thiệu
                                        </Link>
                                    </div>
                                    <a href="" className="nav-item" style={{ margin: "10px 10px" }}>
                                        <span> {user.cccd} </span>
                                    </a>
                                    <a href="/dangxuat" className="btn btn-primary" onClick={handleLogout}>
                                        Đăng xuất
                                    </a>
                                </>
                            ) : (
                                <>
                                    <div className="navbar-nav font-weight-bold mx-auto py-0">
                                        <Link to="/" className="nav-item nav-link">
                                            Trang chủ
                                        </Link>
                                        <Link to="/sukien" className="nav-item nav-link">
                                            Sự kiện
                                        </Link>

                                        <Link to="/lienhe" className="nav-item nav-link">
                                            Hợp tác
                                        </Link>

                                        <Link to="/gioithieu" className="nav-item nav-link">
                                            Giới thiệu
                                        </Link>
                                    </div>
                                    <a href="/dangnhap" className="btn btn-primary" style={{ margin: "10px 10px" }}>
                                        Đăng nhập
                                    </a>
                                    <a href="/dangky" className="btn btn-primary">
                                        Đăng ký
                                    </a>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
                {/* Navbar End */}
            </>
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h4 className="display-4 font-weight-bold text-white">CHI TIẾT THÔNG TIN BỆNH VIỆN</h4>
                </div>
            </div>
            {/* Header End */}
            {/* Detail Start */}
            <div className="container py-2">
                <div className="row pt-1">
                    <div className="col-lg-3 mt-5 mt-lg-0">
                        <div>
                            <img
                                src={hospitalDetail.images}
                                className="img-fluid rounded-circle mx-auto"
                                style={{ width: 300 }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex flex-column text-left mb-3" style={{ margin: "0px 0px 0px" }}>
                            <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                <span className="pr-2">Thông tin chi tiết bệnh viện</span>
                            </p>
                        </div>
                        <div className="infor_box">
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Tên bệnh viện:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{hospitalDetail.hospitalName}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Địa chỉ:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{hospitalDetail.address}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Số điện thoại:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{hospitalDetail.phone}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Email:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{hospitalDetail.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ChitietBenhvien;

