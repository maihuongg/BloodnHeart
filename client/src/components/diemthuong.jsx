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
import baseUrl from "../utils/constant";
function DiemThuong() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPro = useSelector((state) => state.user.profile.getUser);

    useEffect(() => {
        const handleProfile = async () => {
            dispatch(userprofileStart());
            try {
                const response1 = await fetch(`${baseUrl}/v1/user/profile/` + userId, {
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
            const res = await fetch(`${baseUrl}/v1/auth/logout`, {
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
            title: "Điểm thưởng",
            dataIndex: "points",
            key: "points",
        },
        {
            title: "Phần quà tương ứng",
            dataIndex: "reward",
            key: "reward",
        },
    ];

    const dataSource = [
        {
            key: '1',
            points: 2,
            reward: '200000 VNĐ',
        },
        {
            key: '2',
            points: 3,
            reward: '250000 VNĐ',
        },
        {
            key: '3',
            points: 4,
            reward: '300000 VNĐ',
        },
    ];

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
                        <img src="img/logo.png" alt="logo"></img>
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
                                            <Link to="/diemthuong" className="dropdown-item active">
                                                Điểm thưởng
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
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h3 className="display-3 font-weight-bold text-white">ĐIỂM THƯỞNG</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <Link to="/" className="text-white">
                                Trang chủ
                            </Link>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Điểm thưởng</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Điểm thưởng Start */}
            <div className="container-fluid pt-5 pb-3">
                <div className="container">
                    <div className="text-center pb-2">
                        <h1 className="mb-4">Điểm thưởng hiện tại: {userPro?.reward || 0}</h1>
                    </div>
                    <div className="text-center pb-2">
                        <h1 className="mb-4">Các lưu ý về điểm thưởng</h1>
                        <div className="text-left pb-2">
                            <ul className="list-group">
                                <li className="list-group-item">Lưu ý 1: Đăng ký sự kiện để nhận điểm thưởng. Mỗi lần đăng ký sẽ được 1 điểm thưởng.</li>
                                <li className="list-group-item">Lưu ý 2: Điểm thưởng sẽ được làm mới theo chu kỳ 1 năm, bắt đầu mỗi chu kỳ là ngày 1/1 hàng năm.</li>
                                <li className="list-group-item">Lưu ý 3: Đạt được các mốc điểm cố định sẽ được phần quà tương ứng.</li>
                                <li className="list-group-item">Lưu ý 4: Nếu hủy lịch hẹn thì điểm thưởng được cộng khi đăng ký sự kiện đó sẽ trừ đi.</li>
                                <li className="list-group-item">Lưu ý 5: Quà tặng sẽ được tặng khi đến cơ sở hiến máu.</li>
                                <li className="list-group-item">Lưu ý 6: Lưu ý đây là quà tặng khi tích lũy điểm thưởng trên hệ thống nên sẽ được tách biệt
                                    với các quà tặng khác khi đi hiến máu tại các cơ sở bệnh viện khác nhau,
                                    người dùng tránh nhầm lẫn và chú ý để nhận đầy đủ các phần quà khi đi hiến máu.</li>
                                <li className="list-group-item">Lưu ý 7: Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào về điểm thưởng.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center pb-2">
                        <h1 className="mb-4">Bảng quy đổi điểm thưởng</h1>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                rowKey="key"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Điểm thưởng End */}
        </>
    );
}

export default DiemThuong;
