import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { toPng } from 'html-to-image';
import { Table, Button, Modal } from "antd";
import baseUrl from "../../utils/constant";
function LichSuHienMau() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPro = useSelector((state) => state.user.profile.getUser);
    console.log('userPro: ',userPro)
    const currentDate = new Date();
    console.log(currentDate);
    const userEventFilter = userPro.history.filter(event => event.status_user === "1");

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
            title: "Tên sự kiện",
            dataIndex: "eventName",
            className: "no-wrap",
            key: "eventName",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address_event",
            width: 400,
            key: "address_event",
        },
        {
            title: "Lượng máu",
            dataIndex: "amount_blood",
            width: 125,
            key: "amount_blood",
            render: (amount) => `${amount}ml`, // Add 'ml' to the amount
        },
        {
            title: "Ngày hiến máu",
            dataIndex: "date",
            className: "no-wrap",
            key: "date",
            render: (text, record) => (
                moment(text).format('DD/MM/YYYY')
            ),
        },
        {
            title: "Giờ Check-in",
            dataIndex: "checkin_time",
            className: "no-wrap",
            key: "checkin_time",
            render: (text, record) => (
                moment(text).utcOffset(7).format('HH:mm DD/MM/YYYY')
            ),
        },
        {
            title: "Giờ check-out",
            dataIndex: "checkout_time",
            className: "no-wrap",
            key: "checkout_time",
            render: (text, record) => (
                moment(text).utcOffset(7).format('HH:mm DD/MM/YYYY')
            ),
        },

        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <a className="text-blue text-bold" onClick={() => handleViewCertificate(record)}>Xem e-Certificate</a>
            ),
        },
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const certificateCanvasRef = useRef();
    const handleViewCertificate = (record) => {
        setSelectedRecord(record);
        console.log('selectedRecord', record);
        setIsModalVisible(true);
        setTimeout(() => drawCertificate(record), 100);  // Ensure canvas is rendered before drawing
    };
    

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    const drawCertificate = (record) => {
        const canvas = certificateCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = "/img/certificate.png";  // Update this path to your actual template file
    
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
            ctx.font = "bold 24px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(`${userPro.fullName}`, 350, 250);
            
            // Vẽ các dòng văn bản khác từ record
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(`Ông/bà: `, 250, 250);
            ctx.fillText(`Đã tham gia "${record.eventName}"`, 180, 300);
            ctx.fillText(`Ngày hiến máu: ${ moment(record.date).format('DD-MM-YYYY')} `, 180, 350);
            ctx.fillText(`Lượng máu đã hiến: ${record.amount_blood} ml.`, 500, 350);
        };
    };
    

    const handleDownloadImage = () => {
        const canvas = certificateCanvasRef.current;
        const link = document.createElement('a');
        link.download = 'e-certificate.png';
        link.href = canvas.toDataURL();
        link.click();
    };

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
                                            <Link to="/lichhen" className="dropdown-item">
                                                Lịch hẹn của bạn
                                            </Link>
                                            <Link to="/lichsu" className="dropdown-item active">
                                                Lịch sử hiến máu
                                            </Link>
                                            <Link to="/diemthuong" className="dropdown-item">
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
                    <h3 className="display-3 font-weight-bold text-white">LỊCH SỬ HIẾN MÁU</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <Link to="/" className="text-white">
                                Trang chủ
                            </Link>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Lịch sử hiến máu</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Lịch hẹn Start */}
            {/* <div className="container-fluid pt-5 pb-3"> */}
            <div className="container">
                <div className="text-center pb-2">
                    <h1 className="mb-4">Lịch sử hiến máu của bạn</h1>
                </div>
                <div class="flex">
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
            <Modal
                title="e-Certificate"
                visible={isModalVisible}
                onCancel={handleCancel}
                width={950}
                height={700}
                footer={null}
            >
                {selectedRecord && (
                    <div>
                        <canvas
                            ref={certificateCanvasRef}
                            width={900}
                            height={540}
                            style={{ border: "1px solid #000" }}
                        ></canvas>
                    </div>
                )}
                <Button type="primary" onClick={handleDownloadImage}>
                    Download e-Certificate
                </Button>
            </Modal>
            {/* </div> */}
            {/* Lịch hẹn End */}
        </>

    );
}
export default LichSuHienMau;