import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    allEventStart,
    allEventSuccess,
    allEventFailed
} from "../redux/userSlice";
import {
    eventProfileStart,
    eventProfileSuccess,
    eventProfileFailed,
    hospitalStart,
    hospitalSuccess,
    hospitalFailed
} from "../redux/eventSlice";
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
import Button from "react-bootstrap/Button";
import moment from "moment";
function Sukien() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataEvent = useSelector((state) => state.user.allevent.getEvent);
    const allEvent = dataEvent.allEvent;
    const [date_start, setDate_start] = useState(null)
    const [date_end, setDate_end] = useState(null)
    const [hospitalName, setHospitalName] = useState("all");
    const [dataHospital, setDataHospital] = useState([]);


    useEffect(() => {
        const handleEvent = async () => {
            dispatch(allEventStart());
            try {
                const response = await fetch("http://localhost:8000/v1/user/event", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    dispatch(allEventFailed());
                }
                else {
                    const data = await response.json();
                    dispatch(allEventSuccess(data));
                }
            } catch (error) {
                dispatch(allEventFailed());
                console.error("Error fetching data:", error);
            }
        }
        handleEvent();
        const AllHospital = async () => {
            try {
                const response1 = await fetch("http://localhost:8000/v1/user/allhospital", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response1.ok) {
                    console.log("Error fetching data");
                }
                else {
                    const data1 = await response1.json();
                    setDataHospital(data1);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        AllHospital();
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

    const handleRegisterEvent = async (e, eventId, hospitalId) => {
        e.preventDefault();
        if (user) {
            dispatch(eventProfileStart());
            try {
                const response1 = await fetch("http://localhost:8000/v1/user/getevent/" + eventId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response1.ok) {
                    dispatch(eventProfileFailed());
                } else {
                    const data1 = await response1.json();
                    dispatch(eventProfileSuccess(data1));
                }
            } catch (error) {
                dispatch(eventProfileFailed());
            }

            dispatch(hospitalStart());
            try {
                const response2 = await fetch("http://localhost:8000/v1/user/gethospital/" + hospitalId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response2.ok) {
                    dispatch(hospitalFailed());
                } else {
                    const data2 = await response2.json();
                    dispatch(hospitalSuccess(data2));
                }
            } catch (error) {
                dispatch(hospitalFailed());
            }

            navigate("/dangky-sukien");
        } else {
            navigate("/dangnhap");
        }

    }

    const handlefilter = async () => {
        const filter = {
            date_start: date_start,
            date_end: date_end,
            hospitalName: hospitalName
        }
        dispatch(allEventStart());
        try {
            const response = await fetch("http://localhost:8000/v1/user/event/filter", {
                method: 'POST',
                body: JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                dispatch(allEventFailed());
            }
            else {
                const data = await response.json();
                dispatch(allEventSuccess(data));
                navigate("/sukien");
            }
        } catch (error) {
            dispatch(allEventFailed());
            console.error("Error fetching data:", error);
        }
    }

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
                                    <Link to="/sukien" className="nav-item nav-link active">
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
                    <h3 className="display-3 font-weight-bold text-white">Sự kiện</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="/">
                                Trang chủ
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Sự kiện</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Class Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Sự kiện</span>
                        </p>
                        <h1 className="mb-4">Danh Sách các sự kiện</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="infor_box">
                                <div className="d-flex flex-column text-left mb-3" style={{ margin: "0px 0px 0px" }}>
                                    <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                        <span className="pr-2">Bộ lọc</span>
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="form-control-label label">Từ ngày:</label>
                                        <input
                                            type="date"
                                            className="form-control border-1"
                                            placeholder="VD: 01/01/2000"
                                            required="required"
                                            onChange={(e) => setDate_start(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className="col-lg-6">
                                        <label className="form-control-label label">Đến ngày:</label>
                                        <input
                                            type="date"
                                            className="form-control border-1"
                                            placeholder="VD: 01/01/2000"
                                            required="required"
                                            onChange={(e) => setDate_end(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-lg-6 break">
                                        <label className="form-control-label label">Bệnh viện:</label>
                                        <select className="form-control" defaultValue="all" onChange={(e) => setHospitalName(e.target.value)}>
                                            <option value="" disabled selected>Chọn bệnh viện</option>
                                            <option value="all">Tất cả</option>
                                            {dataHospital.map(hospital => (
                                                <option value={hospital.hospitalName}>{hospital.hospitalName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-6 ">
                                        <br/>
                                        <Button className="nav-item nav-link float-right" onClick={handlefilter}>Lọc</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                    <br/>
                    <div className="row">
                        {allEvent.map(event => (
                            <div className="col-lg-4 mb-5">
                                <div className="card border-0 bg-light shadow-sm pb-2">
                                    <img className="card-img-top mb-2" src={event.images} />
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{event.eventName}</h4>
                                        <p className="card-text">
                                            Địa chỉ: {event.address}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent py-4 px-5">
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Ngày bắt đầu</strong>
                                            </div>
                                            <div className="col-6 py-1">{moment(event.date_start).format('DD-MM-YYYY')}</div>
                                        </div>
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Ngày kết thúc</strong>
                                            </div>
                                            <div className="col-6 py-1">{moment(event.date_end).format('DD-MM-YYYY')}</div>
                                        </div>
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Số lượng</strong>
                                            </div>
                                            <div className="col-6 py-1">{event.listusers.count}/{event.amount}</div>
                                        </div>
                                    </div>

                                    {event.listusers.count === event.amount ? (
                                        <button className="btn btn-primary px-4 mx-auto mb-4" disabled>
                                            Đã đủ số lượng
                                        </button>
                                    ) : (
                                        <a href="" className="btn btn-primary px-4 mx-auto mb-4" onClick={(e) => handleRegisterEvent(e, event._id, event.hospital_id)}>
                                            Đăng ký
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Class End */}
            {/* Registration Start */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <p className="section-title pr-5">
                                <span className="pr-2">Book A Seat</span>
                            </p>
                            <h1 className="mb-4">Book A Seat For Your Kid</h1>
                            <p>
                                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
                                justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor
                            </p>
                            <ul className="list-inline m-0">
                                <li className="py-2">
                                    <i className="fa fa-check text-success mr-3" />
                                    Labore eos amet dolor amet diam
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-success mr-3" />
                                    Etsea et sit dolor amet ipsum
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-success mr-3" />
                                    Diam dolor diam elitripsum vero.
                                </li>
                            </ul>
                            <a href="" className="btn btn-primary mt-4 py-2 px-4">
                                Book Now
                            </a>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0">
                                <div className="card-header bg-secondary text-center p-4">
                                    <h1 className="text-white m-0">Book A Seat</h1>
                                </div>
                                <div className="card-body rounded-bottom bg-primary p-5">
                                    <form>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Name"
                                                required="required"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Email"
                                                required="required"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select border-0 px-4"
                                                style={{ height: 47 }}
                                            >
                                                <option selected="">Select A Class</option>
                                                <option value={1}>Class 1</option>
                                                <option value={2}>Class 1</option>
                                                <option value={3}>Class 1</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-secondary btn-block border-0 py-3"
                                                type="submit"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Registration End */}
        </>

    );
}
export default Sukien;