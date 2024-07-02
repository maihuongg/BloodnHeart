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
import baseUrl from "../../utils/constant";
function Gioithieu() {

    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                                        <Link to="/gioithieu" className="nav-item nav-link active">
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

                                        <Link to="/gioithieu" className="nav-item nav-link active">
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
                    <h3 className="display-3 font-weight-bold text-white">Giới thiệu</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <Link to="/" className="text-white">
                                Trang chủ
                            </Link>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Giới thiệu</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h1 className="card-title text-center">BloodnHeart - Hiến Máu vì Cộng Đồng</h1>
                                <p className="card-text" style={{ fontSize: '22px' }}>
                                    BloodnHeart là dự án nhằm khuyến khích và tổ chức các hoạt động hiến máu cứu người và hỗ trợ cộng đồng. Mục tiêu của chúng tôi là nâng cao nhận thức về tầm quan trọng của việc hiến máu và giúp mọi người hiến máu thường xuyên dễ dàng hơn.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center my-4">
                    <div className="col">
                        <h1>Thành viên sáng lập</h1>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <img src="img/female1.png" alt="Đặng Mai Hương" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                                <h2 className="card-title">Đặng Mai Hương</h2>
                                <h4 className="card-text">Student Id: 20110099</h4>
                                Email: 20110099@student.hcmute.edu.vn<br />
                                Phone: +1234567890
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <img src="img\female2.png" alt="Nguyễn Thị Thu Hằng" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                                <h2 className="card-title">Nguyễn Thị Thu Hằng</h2>
                                <h4 className="card-text">Student Id: 20110473</h4>
                                Email: 20110473@student.hcmute.edu.vn <br />
                                Phone: +1234567890

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* About Start */}
            {/* <div className="container-fluid py-5">
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
                                <span className="pr-2">Learn About Us</span>
                            </p>
                            <h1 className="mb-4">Best School For Your Kids</h1>
                            <p>
                                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
                                justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor
                            </p>
                            <div className="row pt-2 pb-4">
                                <div className="col-6 col-md-4">
                                    <img className="img-fluid rounded" src="img/about-2.jpg" alt="" />
                                </div>
                                <div className="col-6 col-md-8">
                                    <ul className="list-inline m-0">
                                        <li className="py-2 border-top border-bottom">
                                            <i className="fa fa-check text-primary mr-3" />
                                            Labore eos amet dolor amet diam
                                        </li>
                                        <li className="py-2 border-bottom">
                                            <i className="fa fa-check text-primary mr-3" />
                                            Etsea et sit dolor amet ipsum
                                        </li>
                                        <li className="py-2 border-bottom">
                                            <i className="fa fa-check text-primary mr-3" />
                                            Diam dolor diam elitripsum vero.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <a href="" className="btn btn-primary mt-2 py-2 px-4">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* About End */}
            {/* Facilities Start */}
            {/* <div className="container-fluid pt-5">
                <div className="container pb-3">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-050-fence h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Play Ground</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-022-drum h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Music and Dance</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-030-crayons h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Arts and Crafts</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-017-toy-car h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Safe Transportation</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-025-sandwich h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Healthy food</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: 30 }}
                            >
                                <i className="flaticon-047-backpack h1 font-weight-normal text-primary mb-3" />
                                <div className="pl-4">
                                    <h4>Educational Tour</h4>
                                    <p className="m-0">
                                        Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero
                                        lorem amet elitr vero...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Facilities Start */}
            {/* Team Start */}
            {/* <div className="container-fluid pt-5">
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
            </div> */}
            {/* Team End */}
        </>

    );
}
export default Gioithieu;