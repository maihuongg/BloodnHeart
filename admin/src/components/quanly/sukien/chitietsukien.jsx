import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Table } from "antd";
import {
    eventdetailStart,
    eventdetailSuccess,
    eventdetailFailed
} from "../../../redux/eventSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChiTietSuKien() {

    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const isHospital = currentAdmin?.isHospital;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector((state) => state.event.eventdetail.getevent);
    const { id } = useParams();
    const data = event.listusers.user;
    const [images, setImages] = useState(event.images);
    const [eventName, setEventName] = useState(event.eventName);
    const [date_start, setDate_start] = useState(event.date_start);
    const [date_end, setDate_end] = useState(event.date_end);
    const [amount, setAmount] = useState(event.amount);
    const [address, setAddress] = useState(event.address);

    const [cccd, setCCCD] = useState("");
    const [fullName, setfullName] = useState("");
    const [gender, setgender] = useState("");
    const [birthDay, setbirthDay] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [address_user, setaddressuser] = useState("");
    const [bloodgroup, setbloodgroup] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    useEffect(() => {
        const fetchData = async () => {
            dispatch(eventdetailStart());
            try {
                const response = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    dispatch(eventdetailFailed());
                }
                else {
                    const data = await response.json();
                    dispatch(eventdetailSuccess(data));
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id, dispatch]);

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

    const columns = [
        {
            title: "Tên người đăng ký",
            dataIndex: "username",
            key: "username",
            render: (text, record) => (
                <a className="nav-item nav-link" onClick={() => handleUserInfo(record.userid)}>{text}</a>
            )
        },
        {
            title: "Ngày hiến",
            dataIndex: "dateregister",
            key: "dateregister",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
        {
            title: "Nhóm máu",
            dataIndex: "bloodgroup",
            key: "bloodgroup",
        },
        {
            title: "Trạng thái",
            dataIndex: "status_user",
            key: "status_user",
            render: (text, record) => {
                const status = record.status_user;

                if (status === "0") {
                    return <span style={{ color: 'red' }}>Chưa hiến</span>;
                } else {
                    if (status === "1") {
                        return <span style={{ color: 'blue' }}>Đã hiến</span>;
                    } else {
                        return <span>Không xác định</span>;
                    }
                }
            }
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                const status = record.status_user;
                if (status === "1") {
                    return <span style={{ color: 'blue' }}>Đã cập nhập</span>;
                } else {
                    if (status === "0") {
                        return (
                            <Button className="btn btn-sm btn-outline-primary btn-icon-prepend text-white"
                                onClick={() => handleUpdate(record.userid)}>Cập nhật</Button>
                        )
                    } else {
                        return <span>Không xác định</span>;
                    }
                }

            }
        }

    ]



    const onChange = e => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImages(base64Image);
                // console.log('imageform', base64Image);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleUserInfo = async (userid) => {
        try {
            const response = await fetch(`http://localhost:8000/v1/hospital/userprofile/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            if (!response.ok) {
                console.log("error");
            } else {
                const data = await response.json();
                setCCCD(data.user.cccd);
                setfullName(data.user.fullName);
                setgender(data.user.gender);
                setbirthDay(data.user.birthDay);
                setphone(data.user.phone);
                setemail(data.user.email);
                setaddressuser(data.user.address);
                setbloodgroup(data.user.bloodgroup);
                setShow(true);
            }
        } catch (error) {
            console.log("error");
        }
    }

    const handleUpdateImage = async (e) => {
        e.preventDefault();
        if (isHospital) {
            dispatch(eventdetailStart());
            try {
                console.log("image", images)
                const formData = new FormData();
                formData.append('images', images);
                console.log("formdata", formData);
                const response = await fetch(`http://localhost:8000/v1/hospital/update-image/${id}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
                console.log(response)
                if (!response.ok) {
                    showNotificationErr("Cập nhật thất bại!");
                    dispatch(eventdetailFailed());
                } else {
                    const data = await response.json();
                    dispatch(eventdetailSuccess(data));
                    showNotification('Đã thay đổi avatar thành công!');

                }
            } catch (error) {
                dispatch(eventdetailFailed());
                showNotificationErr("Cập nhật thất bại!");
            }
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }

    const handleUpdate = async (userId) => {
        const update = {
            eventId: id,
            userId: userId,
        }
        if (isHospital) {
            try {
                const response1 = await fetch("http://localhost:8000/v1/hospital/update-status", {
                    method: 'PUT',
                    body: JSON.stringify(update),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response1.ok) {
                    const err = await response1.json();
                    dispatch(eventdetailFailed());
                    showNotificationErr(err.message);
                } else {
                    const data1 = await response1.json();
                    dispatch(eventdetailSuccess(data1.event));
                    showNotification(data1.message);
                    //window.location.reload();
                    navigate(`/su-kien/chi-tiet/${id}`);
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                showNotificationErr("Cập nhật thất bại!");
            }
        } else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }

    const handleUploadInfo = async (e) => {
        e.preventDefault();
        if (isHospital) {
            try {
                const newInfo = {
                    eventName: eventName,
                    date_start: date_start,
                    date_end: date_end,
                    amount: amount,
                    address: address
                }
                console.log("NewInfo: ", newInfo)
                const response = await fetch(`http://localhost:8000/v1/hospital/update-profile/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newInfo),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    showNotificationErr("Cập nhật thất bại!");
                    dispatch(eventdetailFailed());
                } else {
                    const data = await response.json();
                    dispatch(eventdetailSuccess(data));
                    navigate(`/su-kien/chi-tiet/${id}`);
                    showNotification('Đã thay đổi thông tin thành công!');
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                showNotificationErr("Cập nhật thất bại!");
            }
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }
    const handleGoBack = () => {
        navigate("/su-kien");
    };

    return (
        <>
            <div className="container-scroller">
                <Navbar></Navbar>
                <div className="container-fluid page-body-wrapper">
                    <Sidebar></Sidebar>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <i
                                className="mdi mdi-keyboard-backspace"
                                style={{ fontSize: "24px", padding: "5px" }}
                                onClick={handleGoBack}
                            ></i>
                            <br />
                            <br /> <h3>Chỉnh sửa sự kiện </h3>
                            <br />
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body text-center">
                                            <form onSubmit={handleUpdateImage}>
                                                <br />
                                                <br />
                                                <img
                                                    src={images}
                                                    alt="Profile Image"
                                                    className="img-fluid rounded-circle"
                                                    style={{ width: "200px", height: "200px" }}
                                                />
                                                <h4 className="card-title mt-10"></h4>
                                                <p className="card-description">Ảnh sự kiện</p>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        className="custom-file-input"
                                                        required="required"
                                                        accept="image/*"
                                                        onChange={onChange}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">
                                                        Chọn ảnh
                                                    </label>
                                                </div>
                                                <button className="btn btn-primary mt-2" type="submit" disabled={!images}>
                                                    Lưu ảnh
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <form className="forms-sample" onSubmit={handleUploadInfo}>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Tên Sự kiện</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="VD: Sự kiện A"
                                                        defaultValue={event.eventName}
                                                        onChange={(e) => setEventName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Ngày bắt đầu sự kiện</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        defaultValue={moment(event.date_start).format('DD-MM-YYYY')}
                                                        onChange={(e) => setDate_start(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Ngày kết thúc sự kiện</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        defaultValue={moment(event.date_end).format('DD-MM-YYYY')}
                                                        onChange={(e) => setDate_end(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Số lượng đăng ký tối đa</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="VD: 200"
                                                        defaultValue={event.amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Địa chỉ diễn ra sự kiện</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Vui lòng nhập địa chỉ diễn ra sự kiện"
                                                        defaultValue={event.address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <button type="submit" className="btn btn-primary mr-2">
                                                        Lưu lại
                                                    </button>
                                                    <button className="btn btn-light" >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="col-lg-12">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <br /> <h4>Danh sách người đăng ký sự kiện</h4>
                                        <br />
                                        <Table
                                            dataSource={data}
                                            columns={columns}
                                            rowKey="_id"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Thông tin người đăng ký</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        CCCD/CMND:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{cccd}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Họ và tên:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{fullName}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Giới tính:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{gender}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Ngày sinh:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{moment(birthDay).format('DD-MM-YYYY')}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Nhóm máu:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{bloodgroup}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Địa chỉ liên lạc:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{address_user}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Email:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{email}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Số điện thoại:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <div>
                                        <Button variant="secondary" className="float-right" onClick={handleClose}>
                                            Quay lại
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div >
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
};

export default ChiTietSuKien;
