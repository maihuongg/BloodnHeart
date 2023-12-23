import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../redux/userSlice";
import {
    eventProfileStart,
    eventProfileSuccess,
    eventProfileFailed,
} from "../redux/eventSlice";
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
function LichHen() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPro = useSelector((state) => state.user.profile.getUser);
    const currentDate = new Date();
    const [dateRegister, setDateRegister] = useState("");
    const [datemin, setDatemin] = useState("");
    const [datemax, setDatemax] = useState("");
    const [eventId, setEventId] = useState("");
    const userEventFilter = userPro.history.filter(event => event.status_user === "0");
    const [show, setShow] = useState(false);


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

    const showNotification = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const showNotificationErr = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };


    const handleClose = () => setShow(false);

    const handleShow = async (eventid) => {
        try {
            const response1 = await fetch("http://localhost:8000/v1/user/getevent/" + eventid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                console.log("fail");
            } else {
                const data = await response1.json();
                setEventId(data._id);
                setDatemin((new Date(data.date_start)).toISOString().split('T')[0]);
                setDatemax((new Date(data.date_end)).toISOString().split('T')[0]);
                setShow(true);
            }
        } catch (error) {
            console.log("fail");
        }

    }

    const handleUpdate = async () => {
        const update = {
            eventId: eventId,
            userId: userPro._id,
            date: dateRegister,
        }
        try {
            const response1 = await fetch("http://localhost:8000/v1/user/event/updateRegisterDate", {
                method: 'PUT',
                body: JSON.stringify(update),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                const err = await response1.json();
                showNotificationErr(err.message);
            } else {
                const data1 = await response1.json();
                showNotification(data1.message);
                setShow(false);
                window.location.reload();
            }
        } catch (error) {
            showNotificationErr("Cập nhật thất bại!");
        }
    }

    const handleDelete = async (id) => {
        const deleteRegister = {
            eventId: id,
            userId: userPro._id,
        }
        try {
            const response1 = await fetch("http://localhost:8000/v1/user/event/deleteRegister", {
                method: 'DELETE',
                body: JSON.stringify(deleteRegister),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                const err = await response1.json();
                showNotificationErr(err.message);
            } else {
                const data1 = await response1.json();
                showNotification(data1.message);
                window.location.reload();
            }
        } catch (error) {
            showNotificationErr("Cập nhật thất bại!");
        }
    }

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
            render: (text, record) => {
                const handleStatus = async () => {
                    try {
                        const response1 = await fetch("http://localhost:8000/v1/user/getevent/" + record.id_event, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                token: `Bearer ${accessToken}`
                            }
                        });
                        if (!response1.ok) {
                            console.log("fail");
                        } else {
                            const data = await response1.json();
                            const status = data.status;
                            if (status === "0") {
                                return 0;
                            } else {
                                return 1;
                            }
                        }
                    } catch (error) {
                        console.log("fail");
                    }
                }
                const statusevent = handleStatus();
                if (statusevent === 0) {
                    return <span style={{ color: 'red' }}>{record.eventName} (Đã đóng)</span>;
                } else {
                    return <span>{record.eventName}</span>;
                }
            }
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
            render: (text, record) => {
                const currentDate = new Date();
                const dateRe = new Date(record.date);
                if (dateRe < currentDate) {
                    handleDelete(record.id_event);
                } else {
                    return moment(text).format('DD-MM-YYYY');
                }
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div className="d-flex gap-3">
                    <i
                        className="fas fa-pencil-alt"
                        style={{ fontSize: '15px', padding: '5px' }}
                        onClick={() => handleShow(record.id_event)}
                    ></i>
                    <i
                        className="fas fa-trash-alt"
                        style={{ fontSize: '15px', padding: '5px' }}
                        onClick={() => handleDelete(record.id_event)}
                    ></i>
                </div>
            )
        }
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
                    <h3 className="display-3 font-weight-bold text-white">LỊCH HẸN</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="/">
                                Trang chủ
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Lịch hẹn</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Lịch hẹn Start */}
            <div className="container-fluid pt-5 pb-3">
                <div className="container">
                    <div className="text-center pb-2">
                        <h1 className="mb-4">Lịch hẹn của bạn</h1>
                    </div>
                    <p style={{ margin: "0px 0px 0px", fontStyle: "italic", color: "red" }}>Lưu ý: Nếu bạn hiến máu trễ hơn ngày trên lịch hẹn thì sẽ tự động cập nhập hủy đăng ký và xóa khỏi lịch hẹn. </p>
                    <div class="card">
                        <div class="card-body">
                            {userEventFilter.length > 0 ? (
                                <Table
                                    dataSource={userEventFilter}
                                    columns={columns}
                                    rowKey="_id"
                                />
                            ) : (
                                <p className="text-center">Bạn không có lịch hẹn</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Lịch hẹn End */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật ngày</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="card">
                        <div class="card-body">
                            <div>
                                <div>
                                    <label>Chọn Ngày:</label>
                                </div>
                                <br />
                                <input
                                    type="date"
                                    className="form-control border-1"
                                    placeholder="VD: 01/01/2000"
                                    required="required"
                                    min={datemin}
                                    max={datemax}
                                    style={{ width: 300 }}
                                    onChange={(e) => setDateRegister(e.target.value)}
                                />
                            </div>
                            <br />
                            <div>
                                <Button variant="primary" type="submit" className="float-right" onClick={handleUpdate}>
                                    Cập nhật
                                </Button>
                                <Button variant="secondary" className="float-right btnclose" onClick={handleClose}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer>
            </ToastContainer>
        </>

    );
}
export default LichHen;