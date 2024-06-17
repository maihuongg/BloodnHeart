import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
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
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import LeafletMap from "./leafmap";
function Trangchu() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [dataBestEvent, setDataBestEvent] = useState([]);

    useEffect(() => {
        const handleHospital = async () => {
            try {
                const response = await fetch("http://localhost:8000/v1/user/getfour", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    console.log("Error fetching data!");
                }
                else {
                    const hospital = await response.json();
                    setdata(hospital);
                    console.log("ok!");
                    console.log(hospital);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        handleHospital();
        const handleEvent = async () => {
            dispatch(allEventStart());
            try {
                const response1 = await fetch("http://localhost:8000/v1/user/event", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response1.ok) {
                    dispatch(allEventFailed());
                }
                else {
                    const event = await response1.json();
                    dispatch(allEventSuccess(event));
                }
            } catch (error) {
                dispatch(allEventFailed());
                console.error("Error fetching data:", error);
            }
        }
        handleEvent();
        const handleBestEvent = async () => {
            try {
                const response2 = await fetch("http://localhost:8000/v1/user/bestevent", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response2.ok) {
                    console.log("Get Best Event Fail.")
                }
                else {
                    const bestEvent = await response2.json();
                    console.log("BestEvent: ", bestEvent)
                    setDataBestEvent(bestEvent);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        handleBestEvent();
    }, [dispatch]);

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
    //MAP
    const [showMap, setShowMap] = useState(false);
    const [eventLocation, setEventLocation] = useState(null);

    const handleDirections = async (e) => {
        e.preventDefault();
        if (!eventLocation) {
            const location = await getCoordinates(dataBestEvent.address);
            setEventLocation(location);
        }
        setShowMap(true);
    };
    async function getCoordinates(address) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        return null;
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

                        {/* <i className="flaticon-blood-pressure" /> */}
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
                                    <Link to="/" className="nav-item nav-link active">
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
                                    <Link to="/" className="nav-item nav-link active">
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
            <div className="container-fluid bg-primary px-0 px-md-5 mb-6">
                <div className="row align-items-center px-3">
                    <div className="col-lg-6 text-center text-lg-left">
                        <h4 className="text-white mb-6 mt-5 mt-lg-2">Một cuộc đời ý nghĩa</h4>
                        <h1 className="display-3 font-weight-bold text-white">
                            Bắt đầu từ những giọt máu của bạn
                        </h1>
                        <p className="text-white mb-8 text-align-justify"  >
                            Khi bạn quyết định hiến máu, bạn đang chọn một cuộc sống ý nghĩa. Hành động này không chỉ
                            giúp cứu sống người khác mà còn thể hiện lòng nhân ái,
                            tình người và trách nhiệm xã hội.
                            <br />Mỗi giọt máu bạn hiến tặng có thể là cơ hội để một người khác có thể thở phào,
                            sống thêm một ngày, một tuần, hay thậm chí là một cuộc đời mới.
                        </p>

                    </div>
                    <div className="col-lg-6 text-center text-lg-right" style={{ maxWidth: '120%', height: 'auto' }}>
                        <img className="img-fluid mt-6" src="img/banners.png" alt="" />
                    </div>
                </div>
            </div>

            {/* Header End */}
            {/* Facilities Start */}
            <div className="container-fluid pt-5">
                <div className="container pb-3">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Tiêu chuẩn</span>
                        </p>
                        <h1 className="mb-4">Tiêu Chuẩn Tham Gia Hiến Máu</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/weight.png"></img>
                                <div className="pl-4">
                                    <h4> Cân Nặng</h4>
                                    <p className="m-0">
                                        Nam ≥ 45 kg
                                        <br />
                                        Nữ ≥ 45 kg
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/age.png"></img>
                                <div className="pl-4">
                                    <h4>Độ Tuổi</h4>
                                    <p className="m-0">
                                        Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/identity.jpg"></img>
                                <div className="pl-4">
                                    <h4>Giấy Tờ Tùy Thân</h4>
                                    <p className="m-0">
                                        Mang theo CCCD/CMND/Hộ chiếu
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/injection.png"></img>
                                <div className="pl-4">
                                    <h4>Chất Gây Nghiện</h4>
                                    <p className="m-0">
                                        Không nghiện ma túy, rượu bia và các chất kích thích
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/patient.png"></img>
                                <div className="pl-4">
                                    <h4>Bệnh Nền</h4>
                                    <p className="m-0">
                                        Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày…
                                        <br />
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/virus.png"></img>
                                <div className="pl-4">
                                    <h4>Bệnh Truyền Nhiễm</h4>
                                    <p className="m-0">
                                        Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV,
                                        không nhiễm viêm gan B, viêm gan C, và các virus lây qua đường truyền máu
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/distance.png"></img>
                                <div className="pl-4">
                                    <h4>Khoảng Cách</h4>
                                    <p className="m-0">
                                        Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/hemoglobin-test.png"></img>
                                <div className="pl-4">
                                    <h4>Chỉ Số Huyết Sắc Tố</h4>
                                    <p className="m-0">
                                        Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên).
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <img className="icon" src="img/blood-test.png"></img>
                                <div className="pl-4">
                                    <h4>Test Nhanh</h4>
                                    <p className="m-0">
                                        Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B.
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Facilities Start */}
            {/* About Start */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">
                            <img
                                className="img-fluid rounded mb-5 mb-lg-0 img-sukien"
                                src={dataBestEvent.images}
                            />
                        </div>

                        {/* <div className="col-lg-6">
                            <p className="section-title pr-5 no-wrap">
                                <span className="pr-2">Sự kiện hiến máu nổi bật</span>
                            </p>
                            <h2 className="mb-4 no-wrap">{dataBestEvent.eventName}</h2>
                            <p>
                                Địa chỉ: {dataBestEvent.address}
                            </p>
                            <p>
                                Ngày bắt đầu: {moment(dataBestEvent.date_start).format('DD-MM-YYYY')}
                            </p>
                            <p>
                                Ngày kết thúc: {moment(dataBestEvent.date_end).format('DD-MM-YYYY')}
                            </p>
                            {dataBestEvent.listusers?.count !== undefined && (
                                <div>
                                    Số lượng đăng ký: {dataBestEvent.listusers.count}/{dataBestEvent.amount}
                                </div>
                            )}
                            <br />
                            {dataBestEvent.listusers?.count !== undefined && dataBestEvent.listusers.count === dataBestEvent.amount ? (
                                <button className="btn btn-primary px-4 mx-auto mb-4" disabled>
                                    Đã đủ số lượng
                                </button>
                            ) : (
                                <div>
                                    <a href="" className="btn btn-primary px-4 mx-auto mb-4" onClick={(e) => handleRegisterEvent(e, dataBestEvent._id, dataBestEvent.hospital_id)}>
                                        Đăng ký
                                    </a>
                                    <a href="" className="btn btn-secondary px-4 ml-2 mb-4"
                                        onClick={handleDirections}> Xem đường đi </a>
                                </div>
                            )}
                            <div>
                                {showMap && (
                                    <LeafletMap eventLocation={eventLocation} />
                                )}
                            </div>

                        </div> */}

                        <div className="col-lg-6">
                            <p className="section-title pr-5 no-wrap">
                                <span className="pr-2">Sự kiện hiến máu nổi bật</span>
                            </p>
                            <h2 className="mb-2 no-wrap">{dataBestEvent.eventName}</h2>
                            <p>Địa chỉ: {dataBestEvent.address}</p>
                            <p>Ngày bắt đầu: {moment(dataBestEvent.date_start).format('DD-MM-YYYY')}</p>
                            <p>Ngày kết thúc: {moment(dataBestEvent.date_end).format('DD-MM-YYYY')}</p>
                            {dataBestEvent.listusers?.count !== undefined && (
                                <div>
                                    Số lượng đăng ký: {dataBestEvent.listusers.count}/{dataBestEvent.amount}
                                </div>
                            )}
                            <br />
                            {dataBestEvent.listusers?.count !== undefined && dataBestEvent.listusers.count === dataBestEvent.amount ? (
                                <button className="btn btn-primary px-4 mx-auto mb-4" disabled>
                                    Đã đủ số lượng
                                </button>
                            ) : (
                                <div>
                                    <a href="" className="btn btn-primary px-4 mx-auto mb-4" onClick={(e) => handleRegisterEvent(e, dataBestEvent._id, dataBestEvent.hospital_id)}>
                                        Đăng ký
                                    </a>
                                    <a href="" className="btn btn-secondary px-4 ml-2 mb-4" onClick={handleDirections}>
                                        Xem đường đi
                                    </a>
                                </div>
                            )}
                        </div>

                        {showMap && eventLocation && (
                            <div className="row map-container mt-4">
                                <LeafletMap eventLocation={{ ...eventLocation, address: dataBestEvent.address }} />
                            </div>
                        )}


                        <div className="col-lg-1"></div>
                    </div>
                </div>
            </div >
            {/* About End */}

            {/* Team Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Bệnh viện</span>
                        </p>
                        <h1 className="mb-4">Một số bệnh viện hợp tác đầu tiên</h1>
                    </div>
                    <div className="row">
                        {data.map(hospital => (
                            <div className="col-md-6 col-lg-3 text-center team mb-5">
                                <div
                                    className="position-relative overflow-hidden mb-4"
                                    style={{ borderRadius: "100%" }}
                                >
                                    <img className="img-fluid w-100" src={hospital.images} />
                                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                        <a
                                            className="btn btn-outline-light text-center mr-2 px-0"
                                            style={{ width: 38, height: 38 }}
                                            href="#" onClick={(e) => handleHospitalDetail(e, hospital._id)}
                                        >
                                            <i className="fas fa-eye" />
                                        </a>
                                    </div>
                                </div>
                                <h4>{hospital.hospitalName}</h4>
                                <i>{hospital.address}</i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Team End */}
        </>
    );

}
export default Trangchu;