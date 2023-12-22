import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import moment from "moment";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../redux/userSlice";
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
function LichSuHienMau() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPro = useSelector((state) => state.user.profile.getUser);
    const currentDate = new Date();
    console.log(currentDate);
    const userEventFilter = userPro.history.filter(event => event.status_user === "1");

    useEffect(() => {
        const handleProfile = async () => {
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
        }
        handleProfile();
    }, [dispatch]);

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

    const columns = [
        {
            title: "Tên sự kiện",
            dataIndex: "eventName",
            key: "eventName",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address_event",
            key: "address_event",
        },
        {
            title: "Ngày đăng ký đi hiến máu",
            dataIndex: "date",
            key: "date",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
    ]

    return (
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
                                            <Link to="/lichhen" className="dropdown-item active">
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
                                    <Link to="/sukien" className="nav-item nav-link active">
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
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h3 className="display-3 font-weight-bold text-white">LỊCH SỬ HIẾN MÁU</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="/">
                                Trang chủ
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Lịch sử hiến máu</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Lịch hẹn Start */}
            <div className="container-fluid pt-5 pb-3">
                <div className="container">
                    <div className="text-center pb-2">
                        <h1 className="mb-4">Lịch sử hiến máu của bạn</h1>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            {userEventFilter.length > 0 ? (
                                <Table
                                    dataSource={userEventFilter}
                                    columns={columns}
                                    rowKey="_id"
                                />
                            ) : (
                                <p className="text-center">Bạn không có lịch sử hiến máu</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Lịch hẹn End */}
        </>

    );
}
export default LichSuHienMau;