import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
    userup1Start,
    userup1Success,
    userup1Failed
} from "../redux/userSlice";
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

    
    const [fullName, setfullName] = useState(userPro?.fullName);
    const [birthDay, setbirthDay] = useState(userPro?.birthDay);
    const [gender, setGender] = useState(userPro?.gender);
    const [bloodgroup, setbloodGroup] = useState(userPro?.bloodgroup);
    const [address, setAddress] = useState(userPro?.address);
    const [phone, setPhone] = useState(userPro?.phone);
    const [email, setEmail] = useState(userPro?.email);

    const handleUpdate1 = async (e) => {
        e.preventDefault();
        const updateUser = {
            fullName: fullName,
            birthDay: birthDay,
            gender: gender,
            bloodgroup: bloodgroup,
        };
        dispatch(userup1Start());
        try {
            const response = await fetch("http://localhost:8000/v1/user/profile/"+userId, {
                method: 'PUT',
                body: JSON.stringify(updateUser),
                headers: {
                    token: `Bearer ${accessToken}`
                }
            });

            if(!response.ok) {
                dispatch(userup1Failed());
            }else{
                const data = await response.json();
                dispatch(userup1Success(data));
                navigate("/hoso")
                console.log(data);
            }
        } catch (error) {
            dispatch(userup1Failed());
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
                                        className="nav-link dropdown-toggle active"
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
                            {user ? (
                                <>
                                    <a href="" className="nav-item" style={{ margin: "10px 10px" }}>
                                        <span> {user.cccd} </span>
                                    </a>
                                    <a href="/dangxuat" className="btn btn-primary">
                                        Đăng xuất
                                    </a>
                                </>
                            ) : (
                                <>
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
                            <img
                                src="img/user.jpg"
                                className="img-fluid rounded-circle mx-auto mb-3"
                                style={{ width: 200 }}
                            />
                            <h3 className="text-secondary mb-3">John Doe</h3>
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
                                            fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 
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
                                                        class="form-control border-1"
                                                        required="required"
                                                        value={userPro?.cccd} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Họ và tên(*)</label>
                                                    <input
                                                        type="text"
                                                        class="form-control border-1"
                                                        placeholder="VD: Nguyễn Văn A"
                                                        required="required"
                                                        defaultValue={userPro?.fullName}
                                                        onChange={(e) => setfullName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label label">Ngày sinh(*)</label>
                                                    <input
                                                        type="text"
                                                        class="form-control border-1"
                                                        placeholder="VD: 01/01/2000"
                                                        required="required"
                                                        defaultValue={userPro?.birthDay}
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
                                    <p style={{ margin: "0px 0px 0px" }}>{userPro?.birthDay}</p>
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
                                            <form action="">
                                                <div className="form-group">
                                                    <label className="form-control-label label">Địa chỉ liên lạc</label>
                                                    <input
                                                        type="text"
                                                        class="form-control border-1"
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
                                                        class="form-control border-1"
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
                                                        class="form-control border-1"
                                                        placeholder="VD: a@gmail.com"
                                                        required="required"
                                                        defaultValue={userPro?.email}
                                                    />
                                                </div>
                                                <div>
                                                    <Button variant="primary" type="submit" className="float-right">
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

// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// function Hoso() {

//     const user = useSelector((state) => state.auth.login.currentUser);
//     const accessToken = user?.accessToken
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [show1, setShow1] = useState(false);

//     const handleClose1 = () => setShow1(false);
//     const handleShow1 = () => setShow1(true);

//     return (
//         <>
//             {/* Navbar Start */}
//             <div className="container-fluid bg-light position-relative shadow">
//                 <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
//                     <a
//                         href=""
//                         className="navbar-brand font-weight-bold text-secondary"
//                         style={{ fontSize: 50 }}
//                     >
//                         <img src="img/logo.png"></img>
//                         <span className="text-primary" style={{ fontSize: 40 }}> BloodnHeart</span>
//                     </a>
//                     <button
//                         type="button"
//                         className="navbar-toggler"
//                         data-toggle="collapse"
//                         data-target="#navbarCollapse"
//                     >
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                     <div
//                         className="collapse navbar-collapse justify-content-between"
//                         id="navbarCollapse"
//                     >
//                         <div className="navbar-nav font-weight-bold mx-auto py-0">
//                             <Link to="/" className="nav-item nav-link">
//                                 Trang chủ
//                             </Link>
//                             <Link to="/sukien" className="nav-item nav-link">
//                                 Sự kiện
//                             </Link>

//                             <Link to="/lienhe" className="nav-item nav-link">
//                                 Liên hệ
//                             </Link>
//                             <div className="nav-item dropdown">
//                                 <a
//                                     href="#"
//                                     className="nav-link dropdown-toggle active"
//                                     data-toggle="dropdown"
//                                 >
//                                     Hồ sơ cá nhân
//                                 </a>
//                                 <div className="dropdown-menu rounded-0 m-0">
//                                     <Link to="/hoso" className="dropdown-item active">
//                                         Thông tin cá nhân
//                                     </Link>
//                                     <Link to="#" className="dropdown-item">
//                                         Lịch hẹn của bạn
//                                     </Link>
//                                     <Link to="#" className="dropdown-item">
//                                         Lịch sử hiến máu
//                                     </Link>
//                                 </div>
//                             </div>
//                             <Link to="/gioithieu" className="nav-item nav-link">
//                                 Giới thiệu
//                             </Link>
//                         </div>
//                         {user ? (
//                             <>
//                                 <a href="" className="nav-item" style={{ margin: "10px 10px" }}>
//                                     <span> {user.cccd} </span>
//                                 </a>
//                                 <a href="/dangxuat" className="btn btn-primary">
//                                     Đăng xuất
//                                 </a>
//                             </>
//                         ) : (
//                             <>
//                                 <a href="/dangnhap" className="btn btn-primary" style={{ margin: "10px 10px" }}>
//                                     Đăng nhập
//                                 </a>
//                                 <a href="/dangky" className="btn btn-primary">
//                                     Đăng ký
//                                 </a>
//                             </>
//                         )}
//                     </div>
//                 </nav>
//             </div>
//             {/* Navbar End */}

//             {/* Header Start */}
//             <div className="container-fluid bg-primary mb-5">
//                 <div
//                     className="d-flex flex-column align-items-center justify-content-center"
//                     style={{ minHeight: 400 }}
//                 >
//                     <h4 className="display-4 font-weight-bold text-white">THÔNG TIN CÁ NHÂN</h4>
//                 </div>
//             </div>
//             {/* Header End */}
//             {/* <!-- Detail Start --> */}
//             <div class="container py-5">
//                 <div class="row pt-5">
//                     <div class="col-lg-3 mt-5 mt-lg-0">
//                         <div class="d-flex flex-column text-center bg-primary rounded mb-5 py-5 px-4">
//                             <img src="img/user.jpg" class="img-fluid rounded-circle mx-auto mb-3" style="width: 200px;" />
//                             <h3 class="text-secondary mb-3">John Doe</h3>
//                         </div>
//                     </div>
//                     <div class="col-lg-9">
//                         <div class="d-flex flex-column text-left mb-3" style="margin: 0px 0px 0px;">
//                             <p class="section-title pr-5" style="margin: 8px 0px 4px 0px;">
//                                 <span class="pr-2">Thông tin chi tiết</span>
//                             </p>
//                         </div>
//                         <div class="infor_box">
//                             <div class="row">
//                                 <div class="col-lg-12">
//                                     <button class="btn btn-primary float-right" style="padding: 0px 16px;" onclick="handleShow()">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//                                             <path d="..." />
//                                         </svg>
//                                         &nbsp; Chỉnh sửa
//                                     </button>

//                                     {/* <!-- Modal for Thông tin cá nhân --> */}
//                                     <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
//                                         <div class="modal-dialog">
//                                             <div class="modal-content">
//                                                 <div class="modal-header">
//                                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                                         <span aria-hidden="true">&times;</span>
//                                                     </button>
//                                                     <h4 class="modal-title">Thông tin cá nhân</h4>
//                                                 </div>
//                                                 <div class="modal-body">
//                                                     <form action="">
//                                                         <div class="form-group">
//                                                             <label class="form-control-label label">CCCD/CMND/Số định danh</label>
//                                                             <input disabled type="text" class="form-control border-1" required="required" />
//                                                         </div>
//                                                         {/* <!-- Other form fields go here --> */}
//                                                         <div>
//                                                             <button type="button" class="btn btn-primary float-right" onclick="handleClose()">
//                                                                 Lưu
//                                                             </button>
//                                                             <button type="button" class="btn btn-secondary float-right btnclose" onclick="handleClose()">
//                                                                 Hủy
//                                                             </button>
//                                                         </div>
//                                                     </form>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <!-- Detail End --> */}


//         </>

//     )
// }
// export default Hoso;

