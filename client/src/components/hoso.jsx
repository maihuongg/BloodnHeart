import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
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
function Hoso() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPro = useSelector((state) => state.user.profile.getUser);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const [fullName, setfullName] = useState(userPro?.fullName);
    const [birthDay, setbirthDay] = useState(moment(userPro?.birthDay).format('DD-MM-YYYY'));   
     console.log('bday:', moment(userPro?.birthDay).format('DD-MM-YYYY'))

    const [gender, setGender] = useState(userPro?.gender);
    const [bloodgroup, setbloodGroup] = useState(userPro?.bloodgroup);
    const [address, setAddress] = useState(userPro?.address);
    const [phone, setPhone] = useState(userPro?.phone);
    const [email, setEmail] = useState(userPro?.email);
    const [images, setImages] = useState('');
    const [imagesdefault, setImagesdefault] = useState(userPro?.images);

    const handleUpdate1 = async (e) => {
        e.preventDefault();
        const updateUser = {
            fullName: fullName,
            birthDay: birthDay,
            gender: gender,
            bloodgroup: bloodgroup,
        };
        dispatch(userprofileStart());
        try {
            const response = await fetch("http://localhost:8000/v1/user/profile/" + userId, {
                method: 'PUT',
                body: JSON.stringify(updateUser),
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
                navigate("/hoso")
                console.log(data);
            }
        } catch (error) {
            dispatch(userprofileFailed());
        }
    }

    const handleUpdate2 = async (e) => {
        e.preventDefault();
        const updateUser = {
            address: address,
            phone: phone,
            email: email,
        };
        dispatch(userprofileStart());
        try {
            const response = await fetch("http://localhost:8000/v1/user/profile/" + userId, {
                method: 'PUT',
                body: JSON.stringify(updateUser),
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
                navigate("/hoso")
                console.log(data);
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

    const handleUpdateImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('images', images);
    
        dispatch(userprofileStart());

        console.log('Fetch URL:', "http://localhost:8000/v1/user/profileimage/" + userId);
    
        try {
            const response = await fetch("http://localhost:8000/v1/user/profileimage/" + userId, {
                method: 'PUT',
                body: formData,
                headers: {
                    token: `Bearer ${accessToken}`
                }
            });
    
            if (!response.ok) {
                dispatch(userprofileFailed());
            } else {
                const data = await response.json();
                dispatch(userprofileSuccess(data));
                navigate("/hoso");
                console.log(data);
            }
        } catch (error) {
            dispatch(userprofileFailed());
        }
    }
    
    const onChange = e => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImages(base64Image);
                setImagesdefault(base64Image);
                console.log('imageform', base64Image);
            };
    
            reader.readAsDataURL(file);
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
                                                <Link to="/hoso" className="dropdown-item active">
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
            </>
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h4 className="display-4 font-weight-bold text-white">THÔNG TIN CÁ NHÂN</h4>
                </div>
            </div>
            {/* Header End */}
            {/* Detail Start */}
            <div className="container py-5">
                <div className="row pt-5">
                    <div className="col-lg-3 mt-5 mt-lg-0">
                        <div className="d-flex flex-column text-center bg-primary rounded mb-5 py-5 px-4">
                            <div>
                                <Button className="nav-item nav-link float-right" style={{ padding: "0px 16px", width: "20px", margin: "0px 0px 0px 600px" }} onClick={handleShow2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 
                                        1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4
                                        1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5
                                        0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0
                                        0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                    </svg>
                                </Button>

                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Ảnh đại diện</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleUpdateImage}>
                                            <div className="form-group">
                                                <div>
                                                    <figure className="avatar item-rtl">
                                                        <img
                                                            src={imagesdefault}
                                                            className="img-fluid rounded-circle mx-auto"
                                                            alt="Images"
                                                        />
                                                    </figure>
                                                </div>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        className="custom-file-input"
                                                        required="required"
                                                        accept="image/*"
                                                        onChange={onChange}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">Chọn ảnh</label>
                                                </div>
                                            </div>
                                            <div>
                                                <Button variant="primary" type="submit" className="float-right" onClick={handleClose2}>
                                                    Lưu Lại
                                                </Button>
                                                <Button variant="secondary" className="float-right btnclose" onClick={handleClose2}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                            </div>
                            <div>
                                <img
                                    src={imagesdefault}
                                    className="img-fluid rounded-circle mx-auto mb-3"
                                    style={{ width: 200 }}
                                />
                                <h3 className="text-secondary mb-3">{userPro?.fullName}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex flex-column text-left mb-3" style={{ margin: "0px 0px 0px" }}>
                            <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                <span className="pr-2">Thông tin chi tiết</span>
                            </p>
                        </div>
                        <div className="infor_box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Button className="nav-item nav-link float-right" style={{ padding: "0px 16px" }} onClick={handleShow}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 
                                    1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4
                                     1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5
                                      0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0
                                       0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                        </svg>
                                        &nbsp;
                                        Chỉnh sửa
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Thông tin cá nhân</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={handleUpdate1}>
                                                <div className="form-group">
                                                    <label className="form-control-label label">CCCD/CMND/Số định danh</label>
                                                    <input disabled
                                                        type="text"
                                                        className="form-control border-1"
                                                        required="required"
                                                        value={userPro?.cccd}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Họ và tên(*)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-1"
                                                        placeholder="VD: Nguyễn Văn A"
                                                        required="required"
                                                        defaultValue={userPro?.fullName}
                                                        onChange={(e) => setfullName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Ngày sinh(*)</label>
                                                    <input
                                                        type="date"
                                                        class="form-control border-1"
                                                        placeholder="VD: 01/01/2000"
                                                        required="required"
                                                        defaultValue={ moment(userPro?.birthDay).format('DD-MM-YYYY')}
                                                        onChange={(e) => setbirthDay(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Giới tính(*)</label>
                                                    <select className="form-control" name="gender" required defaultValue={userPro?.gender} onChange={(e) => setGender(e.target.value)}>
                                                        <option value="" disabled selected>Chọn giới tính</option>
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Nhóm máu(*)</label>
                                                    <p style={{ margin: "0px 0px 0px", fontStyle: "italic" }}>Chọn 1 trong các nhóm A, B, AB, O, Rh+, Rh-</p>
                                                    <p style={{ margin: "0px 0px 0px", fontStyle: "italic" }}>Nếu chưa biết nhóm máu vui lòng chọn "Không rõ"</p>
                                                    <select className="form-control" name="bloodType" required defaultValue={userPro?.bloodgroup} onChange={(e) => setbloodGroup(e.target.value)}>
                                                        <option value="" disabled selected>Chọn nhóm máu</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="AB">AB</option>
                                                        <option value="O">O</option>
                                                        <option value="Rh+">Rh+</option>
                                                        <option value="Rh-">Rh-</option>
                                                        <option value="Không rõ">Không rõ</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <Button variant="primary" type="submit" className="float-right" onClick={handleClose}>
                                                        Lưu Lại
                                                    </Button>
                                                    <Button variant="secondary" className="float-right btnclose" onClick={handleClose}>
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        CCCD/CMND/Số định danh:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.cccd}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Họ và tên:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.fullName}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Ngày sinh:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{moment(userPro?.birthDay).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Giới tính:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.gender}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Nhóm máu:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.bloodgroup}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column text-left mb-3">
                            <p className="section-title pr-5" style={{ margin: "8px 0px 4px 0px" }}>
                                <span className="pr-2">Thông tin liên hệ</span>
                            </p>
                        </div>
                        <div className="infor_box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Button className="nav-item nav-link float-right" style={{ padding: "0px 16px" }} onClick={handleShow1}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 
                                    1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4
                                     1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5
                                      0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0
                                       0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                        </svg>
                                        &nbsp;
                                        Chỉnh sửa
                                    </Button>

                                    <Modal show={show1} onHide={handleClose1}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Thông tin liên hệ</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={handleUpdate2}>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Địa chỉ liên lạc</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-1"
                                                        placeholder="VD: Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM"
                                                        required="required"
                                                        defaultValue={userPro?.address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Số điện thoại</label>
                                                    <input
                                                        type="number"
                                                        className="form-control border-1"
                                                        placeholder="VD: 0303030303"
                                                        required="required"
                                                        defaultValue={userPro?.phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control border-1"
                                                        placeholder="VD: a@gmail.com"
                                                        required="required"
                                                        defaultValue={userPro?.email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Button variant="primary" type="submit" className="float-right" onClick={handleClose1}>
                                                        Lưu Lại
                                                    </Button>
                                                    <Button variant="secondary" className="float-right btnclose" onClick={handleClose1}>
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Địa chỉ liên lạc:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.address}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Số điện thoại:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.phone}</p>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4">
                                    <li>
                                        Email:
                                    </li>
                                </div>
                                <div className="col-lg-8 break">
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail End */}
        </>

    )
}
export default Hoso;

