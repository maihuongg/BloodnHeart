import React from "react";
import { Link } from "react-router-dom";
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
function Lienhe() {

    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msgErr, setMsgErr] = useState(null);
    const [msgSucess, setMsgSucess] = useState(null);
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setCccd] = useState("");
    const [address, setAddress] = useState("");
    const [hospitalName, setHospitalName] = useState("")
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
    const handleToBeHospital = async (e) => {
        e.preventDefault();
        const tobeHospital = {
            sdd: cccd,
            leaderName: leaderName,
            hospitalName: hospitalName,
            phone: phone,
            address: address,
            email: email,
        };
        console.log(tobeHospital)
        console.log('Request Payload:', JSON.stringify(tobeHospital));

        try {
            const response = await fetch('http://localhost:8000/v1/hospital/be-hospital/', {
                method: 'POST',
                body: JSON.stringify(tobeHospital),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
            console.log('Response Status:', response.status);

            if (!response.ok) {
                setMsgErr('Đã xảy ra lỗi. Vui lòng thử lại sau!');
            } else {
                const data = await response.json();
                console.log(data);
                setMsgSucess(
                    'Bạn đã gửi yêu cầu thành công. Chúng tôi sẽ sớm liên lạc với bạn trong vòng 2-3 ngày làm việc!'
                );
            }
        } catch (error) {
            setMsgErr('Đã xảy ra lỗi. Vui lòng thử lại sau!');
            console.log('error: ', error);
        }
    };
    
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

                                        <Link to="/lienhe" className="nav-item nav-link active">
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
                                        <Link to="/" className="nav-item nav-link">
                                            Trang chủ
                                        </Link>
                                        <Link to="/sukien" className="nav-item nav-link">
                                            Sự kiện
                                        </Link>

                                        <Link to="/lienhe" className="nav-item nav-link active">
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
            </>
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h3 className="display-3 font-weight-bold text-white">HỢP TÁC</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="">
                                Trang chủ
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Hợp tác</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Contact Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Hợp tác</span>
                        </p>
                        <h1 className="mb-4">Đăng ký trở thành bệnh viện hợp tác</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p>
                                BloodnHeart xin trân trọng kính mời các bệnh viện, các trung tâm y tế cộng đồng,
                                các tổ chức y tế có lòng nhân ái và sẵn sàng hỗ trợ cộng đồng,
                                tham gia vào dự án hiến máu nhân đạo cùng chúng tôi.
                            </p>
                        </div>

                        <div className="col-md-12 mt-6">
                            <h3>Mục Đích Dự Án</h3>
                            <p>
                                Dự án hiến máu nhân đạo của chúng tôi được tạo ra với mục tiêu chính là
                                xây dựng một nguồn cung máu ổn định, đáp ứng nhu cầu y tế cộng đồng và
                                giúp cải thiện tình hình sức khỏe của những người cần máu khẩn cấp.
                            </p>
                        </div>
                        <div className="col-md-12 mt-6">
                            <h3>Lợi Ích của Bệnh Viện Hợp Tác</h3>
                            <ul>
                                <li>Tăng cường uy tín và nhận thức trong cộng đồng y tế.</li>
                                <li>Thúc đẩy tinh thần hiến máu và trách nhiệm xã hội.</li>
                                <li>Được hỗ trợ thông tin và quản lý chất lượng hiệu quả.</li>
                                <li>Tham gia vào một mạng lưới liên kết mạnh mẽ với các đối tác y tế.</li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <p>
                                Để đăng ký và biết thêm chi tiết, vui lòng để lại thông tin bên dưới
                                Chúng tôi sẽ nhanh chóng xem xét đăng ký của quý đối tác và cung cấp phản hồi chi tiết thông qua email.
                                Chúng tôi rất mong đợi sự hợp tác tích cực từ các bệnh viện nhân đạo để cùng nhau giúp đỡ và
                                lan tỏa tình người qua dự án hiến máu nhân đạo.
                                Cảm ơn bạn đã chú ý và đồng lòng chung tay xây dựng một cộng đồng khỏe mạnh hơn.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mx-auto">
                            <div className="contact-form">
                                <h3>Thông tin đăng ký</h3>
                                <form
                                    
                                    id="contactForm"
                                    noValidate="novalidate"
                                    onSubmit={handleToBeHospital}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="leaderName" className="form-label fw-bold">Tên người đứng đầu</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="leaderName"
                                            placeholder="Tên người đứng đầu"
                                            required="required"
                                            onChange={(e) => setLeaderName(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter the leader's name.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            required="required"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a valid email address.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="fax" className="form-label fw-bold">Số điện thoại / Fax</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fax"
                                            placeholder="Số điện thoại / Fax"
                                            required="required"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter the fax number.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="hospitalName" className="form-label fw-bold">Tên bệnh viện/cơ sở</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="hospitalName"
                                            placeholder="Tên bệnh viện/cơ sở"
                                            required="required"
                                            onChange={(e) => setHospitalName(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter the hospital name.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="hospitalId" className="form-label fw-bold">Mã bệnh viện/cơ sở</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="hospitalId"
                                            placeholder="Mã bệnh viện/cơ sở"
                                            required="required"
                                            onChange={(e) => setCccd(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter the hospital ID.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label fw-bold">Địa chỉ</label>
                                        <input
                                            className="form-control"
                                            id="address"
                                            placeholder="Địa chỉ"
                                            required="required"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter the hospital address.</div>
                                    </div>
                                    <div className="mb-3">
                                        {/* Error Message */}
                                        {msgSucess && (
                                            <div className="alert alert-success" role="alert">
                                                {msgSucess}
                                            </div>
                                        )}
                                    </div>
                                    {/* msgErr */}
                                    <div className="mb-3">
                                        {/* Error Message */}
                                        {msgErr && (
                                            <div className="alert alert-danger" role="alert">
                                                {msgErr}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary py-2 px-4"
                                            type="submit"
                                            
                                        >
                                            Gửi yêu cầu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

            {/* Contact End */}
        </>

    )
}
export default Lienhe;