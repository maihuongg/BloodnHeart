import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed
} from "../redux/userSlice";
import {
    logOutStart,
    logOutSuccess,
    logOutFailed
} from "../redux/authSlice";
function Trangchu() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfile = async () => {
        dispatch(userprofileStart());
        try {
            const response = await fetch("http://localhost:8000/v1/user/profile/" + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                dispatch(userprofileFailed());
            } else {
                const data = await response.json();
                dispatch(userprofileSuccess(data));
                navigate("/hoso");
            }
        } catch (error) {
            dispatch(userprofileFailed());
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
                                        Liên hệ
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
                                            <Link to="/hoso" className="dropdown-item" onClick={handleProfile}>
                                                Thông tin cá nhân
                                            </Link>
                                            <Link to="#" className="dropdown-item">
                                                Lịch hẹn của bạn
                                            </Link>
                                            <Link to="#" className="dropdown-item">
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
                                    <Link to="/" className="nav-item nav-link active">
                                        Trang chủ
                                    </Link>
                                    <Link to="/sukien" className="nav-item nav-link">
                                        Sự kiện
                                    </Link>

                                    <Link to="/lienhe" className="nav-item nav-link">
                                        Liên hệ
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
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
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
                                        <br/>
                                        <br/>
                                        <br/>
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
                                        <br/>
                                        <br/>
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
                                        <br/>
                                        <br/>
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
                        <div className="col-lg-5">
                            <img
                                className="img-fluid rounded mb-5 mb-lg-0"
                                src="img/about-1.jpg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-7">
                            <p className="section-title pr-5">
                                <span className="pr-2">Nổi Bật</span>
                            </p>
                            <h1 className="mb-4">Sự kiện hiến máu nổi bật nhất</h1>
                            <p>
                                Địa Chỉ
                            </p>
                            
                            <a href="" className="btn btn-primary mt-2 py-2 px-4">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Blog Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Latest Blog</span>
                        </p>
                        <h1 className="mb-4">Latest Articles From Blog</h1>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-1.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-2.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-3.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Blog End */}
            {/* Team Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Our Teachers</span>
                        </p>
                        <h1 className="mb-4">Meet Our Teachers</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 text-center team mb-5">
                            <div
                                className="position-relative overflow-hidden mb-4"
                                style={{ borderRadius: "100%" }}
                            >
                                <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
                                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <h4>Julia Smith</h4>
                            <i>Music Teacher</i>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center team mb-5">
                            <div
                                className="position-relative overflow-hidden mb-4"
                                style={{ borderRadius: "100%" }}
                            >
                                <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
                                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <h4>Jhon Doe</h4>
                            <i>Language Teacher</i>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center team mb-5">
                            <div
                                className="position-relative overflow-hidden mb-4"
                                style={{ borderRadius: "100%" }}
                            >
                                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <h4>Mollie Ross</h4>
                            <i>Dance Teacher</i>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center team mb-5">
                            <div
                                className="position-relative overflow-hidden mb-4"
                                style={{ borderRadius: "100%" }}
                            >
                                <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
                                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center mr-2 px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light text-center px-0"
                                        style={{ width: 38, height: 38 }}
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <h4>Donald John</h4>
                            <i>Art Teacher</i>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team End */}
        </>
    );

}
export default Trangchu;