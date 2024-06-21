import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
import {
    hospitalStart,
    hospitalSuccess,
    hospitalFailed
} from "../redux/eventSlice";
function DangkySukien() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken
    const eventDetail = useSelector((state) => state.event.eventProfile.getEvent);
    const hospitalDetail = useSelector((state) => state.event.hospital.getHospital);
    const userProfile = useSelector((state) => state.user.profile.getUser);
    const [dateRegister, setDateRegister] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [min, setMin] = useState("");
    const [amount_blood, setAmountblood] = useState(350);



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


    useEffect(() => {
        const currentDate = new Date();
        const minDate = new Date(eventDetail.date_start);
        if (currentDate < minDate) {
            setMin(new Date(eventDetail.date_start).toISOString().split('T')[0]);
        } else {
            setMin(new Date().toISOString().split('T')[0]);
        }
        console.log("date", min);
    }, [setMin]);

    const handleClose = () => setShow(false);
    const handleShow = async () => {

        const checkdate = {
            userId: userProfile._id,
            date: dateRegister,
        };
        try {
            const response = await fetch("http://localhost:8000/v1/user/event/checkdate", {
                method: 'POST',
                body: JSON.stringify(checkdate),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                showNotificationErr("Thất bại!");
            } else {
                const data = await response.json();
                const result = data.result;
                if (result === 0) {
                    showNotificationErr('Bạn không thể đăng ký vì chưa đủ tối thiểu 90 ngày so với ngày hiến máu gần nhất.')
                } else {
                    setShow(true);
                }
            }
        } catch (error) {
            showNotificationErr('Đã xảy ra lỗi không mong muốn.');
        }
    }
    const handleRegisterEvent = async (e) => {
        e.preventDefault();
        const register = {
            eventId: eventDetail._id,
            userId: userProfile._id,
            bloodGroup: userProfile.bloodgroup,
            dateRegister: dateRegister,
            amount_blood: amount_blood,
        };
        if (userProfile.fullName === null
            || userProfile.gender === null
            || userProfile.birthDay === null
            || userProfile.phone === null
            || userProfile.address === null
            || userProfile.bloodgroup === null) {
            showNotificationErr("Cần cập nhập hồ sơ đầy đủ!");
        } else {
            try {
                const response = await fetch("http://localhost:8000/v1/user/event/register", {
                    method: 'POST',
                    body: JSON.stringify(register),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    const err = await response.json();
                    setShow(false);
                    showNotificationErr(err.message);
                    //setMsgErr(err.message);
                } else {
                    setShow(false);
                    showNotification("Đăng ký thành công!");
                    //setSuccessMsg("Đăng ký sự kiện thành công!");
                }
            } catch (error) {
                showNotificationErr("Đăng ký thất bại!");
                //setMsgErr("Xác nhận không thành công!");
            }
        }

    }

    const handleHospitalDetail = async (e, hospitalId) => {
        e.preventDefault();
        dispatch(hospitalStart());
        try {
            const response2 = await fetch("http://localhost:8000/v1/user/hospital/" + hospitalId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response2.ok) {
                dispatch(hospitalFailed());
            } else {
                const data2 = await response2.json();
                dispatch(hospitalSuccess(data2));
                navigate("/chitietbenhvien")
            }
        } catch (error) {
            dispatch(hospitalFailed());
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
            </>
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h4 className="display-4 font-weight-bold text-white">ĐĂNG KÝ SỰ KIỆN</h4>
                </div>
            </div>
            {/* Header End */}
            {/* Detail Start */}
            <div className="container py-2">
                <div className="row pt-1">
                    <div className="col-lg-12 mt-5 mt-lg-0">
                        <h3 className="text-center">{eventDetail.eventName}</h3>
                    </div>
                    <div className="col-lg-3 mt-5 mt-lg-0">
                        <div>
                            <img
                                src={eventDetail.images}
                                className="img-fluid rounded-square mx-auto"
                                style={{ width: 300 }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex flex-column text-left mb-3" style={{ margin: "0px 0px 0px" }}>
                            <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                <span className="pr-2">Thông tin chi tiết sự kiện</span>
                            </p>
                        </div>
                        <div className="infor_box">
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Đơn vị thực hiện:
                                    </li>
                                </div>
                                <div className="col-lg-8 break" style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ margin: "0px 0px 0px", flex: "1" }}>{hospitalDetail.hospitalName}</p>
                                    <a
                                        className="btn text-center mr-2 px-0"
                                        style={{ width: 25, height: 25 }}
                                        href="#" onClick={(e) => handleHospitalDetail(e, hospitalDetail._id)}
                                    >
                                        <i className="fas fa-eye" />
                                    </a>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Địa chỉ diễn ra sự kiện:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{eventDetail.address}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Ngày bắt đầu:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{moment(eventDetail.date_start).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Ngày kết thúc:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{moment(eventDetail.date_end).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Số lượng người đăng ký:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{eventDetail.listusers.count}/{eventDetail.amount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column text-left mb-3" style={{ margin: "0px 0px 0px" }}>
                            <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                <span className="pr-2">Đăng ký tham gia sự kiện</span>
                            </p>
                        </div>
                        <div className="infor_box">
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <label>Chọn Ngày:</label>
                                </div>
                                <input
                                    type="date"
                                    className="form-control border-1"
                                    placeholder="VD: 01/01/2000"
                                    required="required"
                                    min={min}
                                    max={(new Date(eventDetail.date_end)).toISOString().split('T')[0]}
                                    style={{ width: 500 }}
                                    onChange={(e) => setDateRegister(e.target.value)}
                                />
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <label>Chọn lượng máu:</label>
                                </div>
                                <select name="amount_blood" required defaultValue={amount_blood} onChange={(e) => setAmountblood(e.target.value)}>
                                    <option value={350}>350 ml</option>
                                    <option value={250}>250 ml</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <Button className="nav-item nav-link float-right" style={{ padding: "0px 16px" }} onClick={handleShow}>
                            Đăng ký
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác thực thông tin đăng ký</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="infor_box">
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                CCCD/CMND:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.cccd}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Họ và tên:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Giới tính:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.gender}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Ngày sinh:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{moment(userProfile.birthDay).format('DD-MM-YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Nhóm máu:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.bloodgroup}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Địa chỉ liên lạc:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.address}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Email:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.email}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Số điện thoại:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{userProfile.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Sự kiện đăng ký:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{eventDetail.eventName}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Ngày đăng ký hiến máu:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{moment(dateRegister).format('DD-MM-YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className="row padding">
                                        <div className="col-lg-5">
                                            <li>
                                                Lượng máu đăng ký hiến:
                                            </li>
                                        </div>
                                        <div className="col-lg-7 break">
                                            <p style={{ margin: "0px 0px 0px" }}>{amount_blood} ml</p>
                                        </div>
                                    </div>
                                    <p style={{ margin: "0px 0px 0px", fontStyle: "italic", color: "red" }}>Lưu ý: Thông tin cá nhân và liên lạc được lấy từ hồ sơ, nên kiểm tra kỹ và cập nhật tại hồ sơ trước khi đăng ký.</p>
                                </div>

                                <br />
                                <div>
                                    <Button variant="primary" type="button" className="float-right" onClick={handleRegisterEvent}>
                                        Xác nhận
                                    </Button>
                                    <Button variant="secondary" className="float-right btnclose" onClick={handleClose}>
                                        Hủy
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
            <ToastContainer>
            </ToastContainer>
        </>

    )
}
export default DangkySukien;

