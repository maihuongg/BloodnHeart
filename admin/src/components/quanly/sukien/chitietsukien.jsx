import React, { useEffect, useState, useRef } from "react";
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
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
function ChiTietSuKien() {

    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const isHospital = currentAdmin?.isHospital;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector((state) => state.event.eventdetail.getevent);
    const { id } = useParams();
    // console.log("EventID: ", id);
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
    const [reward, setReward] = useState(0);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [userid, setUserid] = useState("");
    const [status, setStatus] = useState("-1");
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const [refresh, setRefresh] = useState(false);
    const [dataEventStatistic, setDataEventStatistic] = useState(null);
    const [eventDetailAmountBlood, setEventDetailAmountBlood] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(eventdetailStart());
            try {
                // Fetch event detail
                const responseDetail = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseDetail.ok) {
                    dispatch(eventdetailFailed());
                } else {
                    const dataDetail = await responseDetail.json();
                    dispatch(eventdetailSuccess(dataDetail));
                }

                // Fetch event statistics
                const responseStatistic = await fetch(`http://localhost:8000/v1/admin/statistic/event/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseStatistic.ok) {
                    console.log("fetchDataStatistic error");
                } else {
                    const dataEventStatistic = await responseStatistic.json();
                    setDataEventStatistic(dataEventStatistic);
                }

                // Fetch event amount blood
                const responseAmountBlood = await fetch(`http://localhost:8000/v1/admin/statistic/event/amountblood/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseAmountBlood.ok) {
                    console.log("fetchDataAmountBlood error");
                } else {
                    const dataAmountBlood = await responseAmountBlood.json();
                    setEventDetailAmountBlood(dataAmountBlood);
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, dispatch]);

    // biểu đồ
    useEffect(() => {
        if (eventDetailAmountBlood) {
            const data = [
                eventDetailAmountBlood.detailAmountBlood['O'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['A'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['B'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['AB'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['Rh+'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['Rh-'] ?? 0
            ];
            // console.log("DATA DỬA: ", data)
            const labels = ['O', 'A', 'B', 'AB', 'Rh+', 'Rh-'];
            // Vẽ biểu đồ
            const barCtx = document.getElementById('barDetailBlood').getContext('2d');
            const newChartInstance = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Lượng máu (ml)',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                    },
                    responsive: true,

                },
            });

            // Cleanup function to destroy the chart when component unmounts or before creating a new one
            return () => {
                newChartInstance.destroy();
            };
        }
    }, [eventDetailAmountBlood]);
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

                if (status === "-1") {
                    return <span style={{ color: 'red' }}>Chưa hiến</span>;
                } else {
                    if (status === "0") {
                        return <span style={{ color: 'blue' }}>Đang chờ hiến</span>;
                    } else {
                        if (status === "1") {
                            return <span style={{ color: 'blue' }}>Đã hiến</span>;
                        } else {
                            return <span>Không xác định</span>;
                        }
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
                    return <span style={{ color: 'blue' }}>Hiến thành công</span>;
                } else {
                    if (status === "-1" || status === "0") {
                        return (
                            <Button className="btn btn-sm btn-outline-primary btn-icon-prepend text-white"
                                onClick={() => handleOpenModal(record.userid)}>Cập nhật</Button>
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
                setReward(data.user.reward);
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

    const handleOpenModal = (userId) => {
        setUserid(userId);
        setRefresh(false);
        setShow1(true);
    }

    const handleUpdate = async () => {
        const update = {
            eventId: id,
            userId: userid,
            status: status,
        }
        if (isHospital) {
            try {
                const response1 = await fetch("http://localhost:8000/v1/hospital/update-status1", {
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
                    setShow1(false);
                    setRefresh(true);
                }
            } catch (error) {

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
    const handleExport = () => {
        if (isHospital) {
            const wb = XLSX.utils.book_new();
            const exportData = data.map(item => ({
                'Tên người đăng ký': item.username,
                'Ngày đăng ký hiến máu': item.dateregister,
                'Nhóm máu': item.bloodgroup,
                'Trạng thái': item.status_user === "1" ? 'Đã hiến' : item.status_user === "0" ? 'Đang chờ' : 'Chưa hiến',
                'Số lượng máu (ml)': item.amount_blood,
            }));
            const ws = XLSX.utils.json_to_sheet(exportData);
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách đăng ký sự kiện')
    
            // Tạo file Excel và tải xuống
            XLSX.writeFile(wb, 'danhsachdangkysukien.xlsx');
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")

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
                            {/* THỐNG KÊ TỪNG SỰ KIỆN */}
                            <div className="col-lg-12">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <br />
                                        <h3>Thống kê về sự kiện</h3>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-green text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Tổng số người đăng ký</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.total ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-danger text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Chưa hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.chuahien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đang chờ hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.danghien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-dark-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đã hoàn thành hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.daxong ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <h3>Thống kê chi tiết lượng máu</h3>

                                        <div className="row justify-content-center">
                                            <div className="col-lg-8">
                                                <div className="card" style={{ height: "100%" }}>
                                                    <div className="card-body">
                                                        <canvas id="barDetailBlood"></canvas>
                                                        {/* <canvas ref={chartRef}></canvas> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="col-lg-12">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <div className="row align-items-center mx-auto">
                                            <h3>Danh sách người đăng ký sự kiện</h3>
                                            <button type="button" onClick={handleExport} class="btn btn-outline-success btn-icon-text ml-auto">
                                                <i class="mdi mdi-file-export btn-icon-prepend" fontSize={24}></i>
                                                Export to Excel
                                            </button>
                                        </div>
                                        <br/>

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
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Điểm thưởng:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{reward}</p>
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
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cập nhật trạng thái người dùng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <div className="row padding">
                                                <div className="col-lg-4">
                                                    <label>Chọn trạng thái:</label>
                                                </div>
                                                <select name="status" required defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="-1">Chưa hiến</option>
                                                    <option value="0">Đang chờ hiến</option>
                                                    <option value="1">Đã hiến</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <Button variant="primary" type="button" className="float-right" onClick={handleUpdate}>
                                            Cập nhật
                                        </Button>
                                        <Button variant="secondary" className="float-right btnclose" onClick={handleClose1}>
                                            Hủy
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div >
            </div >
            <ToastContainer></ToastContainer>
        </>
    )
};

export default ChiTietSuKien;

// const [eventChuaHien, setEventChuaHien] = useState(null);
// const [eventDangHien, setEventDangHien] = useState(null);
// const [eventDaHien, setEventDaHien] = useState(null);
// useEffect(() => {
//     if (refresh) {
//         const fetchData = async () => {
//             dispatch(eventdetailStart());
//             try {
//                 const response = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (!response.ok) {
//                     dispatch(eventdetailFailed());
//                 }
//                 else {
//                     const data = await response.json();
//                     dispatch(eventdetailSuccess(data));
//                 }
//             } catch (error) {
//                 dispatch(eventdetailFailed());
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }
//     const fetchData = async () => {
//         dispatch(eventdetailStart());
//         try {
//             const response = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 dispatch(eventdetailFailed());
//             }
//             else {
//                 const data = await response.json();
//                 dispatch(eventdetailSuccess(data));
//             }
//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     };
//     fetchData();
// }, [id, dispatch, refresh]);
// useEffect(() => {
//     const fetchDataStatistic = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/v1/admin/statistic/event/${id}`, {

//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 console.log("fetchDataStatistic error")
//             }

//             const dataEventStatistic = await response.json();
//             // console.log("dataEventStatistic : ", dataEventStatistic);
//             setDataEventStatistic(dataEventStatistic);
//             // setEventDetailAmountBlood(dataEventStatistic.detailAmountBlood);

//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     }
//     const fetchDataAmountBlood = async () => {
//         try {
//             const responseBlood = await fetch(`http://localhost:8000/v1/admin/statistic/event/amountblood/${id}`, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!responseBlood.ok) {
//                 console.log("fetchDataStatistic error")
//             }
//             const dataAmountBlood = await responseBlood.json();
//             // console.log("dataEventStatistic : ", dataAmountBlood);
//             setEventDetailAmountBlood(dataAmountBlood);

//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     }
//     fetchDataStatistic();
//     fetchDataAmountBlood();
// })