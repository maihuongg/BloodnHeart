import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import isEmpty from "validator/lib/isEmpty";
import {
    eventdetailStart,
    eventdetailSuccess,
    eventdetailFailed
} from "../../../redux/eventSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import baseUrl from "../../../utils/constant";
function SuKien() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const hospitalProfile = useSelector((state) => state.hospital.profile.gethospital);
    const hospitalId = hospitalProfile?._id;
    console.log("id", hospitalId);
    const accessToken = currentAdmin?.accessToken;
    const isAdmin = currentAdmin?.isAdmin;
    const isHospital = currentAdmin?.isHospital;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showClose, setShow] = useState(false);
    const [minDate, setMinDate] = useState("");
    const dispatch = useDispatch();

    const [eventName, setEventName] = useState("");
    const [images, setImages] = useState("");
    const [imagesdefault, setImagesdefault] = useState("images/default_image_profile.jpg");
    const [date_start, setDate_start] = useState("");
    const [date_end, setDate_end] = useState("");
    const [amount, setAmount] = useState(1);
    const [address, setAddress] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const handleExport = () => {
        const wb = XLSX.utils.book_new();

        const currentDate = moment();
        const dataToExport = data.map(row => {
            const startDate = moment(row.date_start);
            const endDate = moment(row.date_end);
            let statusText = "Không xác định";

            if (row.status === "0") {
                statusText = "Đã đóng";
            } else if (row.status === "1") {
                if (endDate.isBefore(currentDate)) {
                    statusText = "Đã đóng";
                } else if (startDate.isAfter(currentDate)) {
                    statusText = "Sắp diễn ra";
                } else if (currentDate.isBetween(startDate, endDate, null, '[]')) {
                    statusText = "Đang diễn ra";
                }
            }

            return {
                "Tên sự kiện": row.eventName,
                "Ngày bắt đầu": moment(row.date_start).format('DD-MM-YYYY'),
                "Ngày kết thúc": moment(row.date_end).format('DD-MM-YYYY'),
                "Trạng thái": statusText,
                "Ngày tạo": moment(row.createdAt).format('DD-MM-YYYY')
            };
        });
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sự kiện')

        // Tạo file Excel và tải xuống
        XLSX.writeFile(wb, 'danhsachsukien.xlsx');
    };
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(currentDate);
        setMinDate(currentDate);
        if (!showModal) {
            if (isAdmin) {
                //Function to fetch data from the API
                const fetchData1 = async () => {
                    try {
                        const response1 = await fetch(`${baseUrl}/v1/admin/event`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                token: `Bearer ${accessToken}`
                            }
                        });

                        if (response1.ok) {
                            const data1 = await response1.json();
                            //data gồm count và allAccount
                            console.log(data1.allEvent)
                            setData(data1.allEvent);
                        }
                        else return 0;
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchData1();
            } else {
                if (isHospital) {
                    //Function to fetch data from the API
                    const fetchData2 = async () => {
                        try {
                            const response2 = await fetch(`${baseUrl}/v1/hospital/event/` + hospitalId, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    token: `Bearer ${accessToken}`
                                }
                            });

                            if (response2.ok) {
                                const data2 = await response2.json();
                                console.log("data ok", data2)
                                //data gồm count và allAccount
                                setData(data2.allEvent);
                            }
                            else return 0;
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        } finally {
                            setLoading(false);
                        }
                    };

                    fetchData2();
                } else {
                    console.log("Error fetching data");
                }
            }
        }
    }, [showModal]);
    const fetchDataSearcg = async (keyword) => {
        try {
            const response2 = await fetch(`${baseUrl}/v1/admin/search/event?keyword=${keyword}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // token: `Bearer ${accessToken}`
                }
            });

            if (response2.ok) {
                const data2 = await response2.json();
                //data gồm count và allAccount
                // console.log(data2.allAccount)
                setData(data2);
            }
            else return 0;
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const showNotification = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const showNotificationSuc = (message) => {
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
            title: "Tên sự kiện",
            dataIndex: "eventName",
            key: "eventName",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "date_start",
            key: "date_start",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "date_end",
            key: "date_end",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                const currentDate = moment();
                const startDate = moment(record.date_start);
                const endDate = moment(record.date_end);
                const status = record.status;

                if (status === "0") {
                    return <span style={{ color: 'red' }}>Đã đóng</span>;
                } else {
                    if (status === "1") {
                        if (endDate.isBefore(currentDate)) {
                            handleCloseEvent(record._id)
                            return <span style={{ color: 'red' }}>Đã đóng</span>;
                        } else if (startDate.isAfter(currentDate)) {
                            return <span style={{ color: 'blue' }}>Sắp diễn ra</span>;
                        } else if (currentDate.isBetween(startDate, endDate, null, '[]')) {
                            return <span style={{ color: 'green' }}>Đang diễn ra</span>;
                        } else {
                            return <span>Không xác định</span>;
                        }
                    } else {
                        return <span>Không xác định</span>;
                    }
                }

            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div className="d-flex gap-3">
                    <i
                        className="mdi mdi-eye"
                        style={{ fontSize: '20px', padding: '5px' }}
                        onClick={() => handChinhSuaSuKien(record._id)}
                    ></i>
                    <i
                        className="mdi mdi-delete-forever"
                        style={{ fontSize: '20px', padding: '5px' }}
                        onClick={() => handleCloseEvent(record._id)}
                    ></i>
                </div>
            )
        }

    ];



    const handleCloseEvent = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/v1/hospital/close/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                showNotificationErr(errorData.message);
                console.log(errorData.message);
            }
            else {
                const data = await response.json();
                console.log("data", data);
                console.log("Đóng thành công!");
                showNotificationSuc("Đóng sự kiện thành công!");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            showNotificationErr("Lỗi", error);
        }
    }

    const handChinhSuaSuKien = async (id) => {
        //e.preventDefault();
        dispatch(eventdetailStart());
        try {
            const response = await fetch(`${baseUrl}/v1/hospital/detail/${id}`, {
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
                console.log(data);
                dispatch(eventdetailSuccess(data));
                navigate(`/su-kien/chi-tiet/${id}`);
            }
        } catch (error) {
            dispatch(eventdetailFailed());
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = () => {
        if (isHospital) {
            setShowModal(true);
        }
        else showNotification("Chức năng chỉ dành cho bệnh viện hợp tác !")
    };
    const handleCloseModal = () => {
        setShowModal(false, () => {
            navigate("/su-kien");
        });
    };


    const handleAddEvent = async (e) => {
        e.preventDefault();

        if (isEmpty(eventName) || isEmpty(date_start) || isEmpty(date_end) || isEmpty(amount)) {
            setMsgErr("Vui lòng điền vào các mục (*)");
        } else {
            const newEvent = {
                hospital_id: hospitalId,
                eventName: eventName,
                date_start: date_start,
                date_end: date_end,
                amount: amount,
                address: address
            }
            try {
                const response = await fetch(`${baseUrl}/v1/hospital/event/add`, {
                    method: 'POST',
                    body: JSON.stringify(newEvent),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setMsgErr(errorData.message);
                    setSuccessMsg(null);
                } else {
                    const data = await response.json();
                    showNotificationSuc("Thêm sự kiện thành công!");
                    setMsgErr(null);
                    console.log('dataEvent', data);
                    handleCloseModal();
                }
            } catch (error) {
                setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
                setSuccessMsg(null);
            }
        }

    }

    return (
        <div className="container-scroller">
            <Navbar></Navbar>
            <div className="container-fluid page-body-wrapper">
                <Sidebar></Sidebar>
                <div class="main-panel">
                    <div class="content-wrapper">


                        {/* quản lý người dùng  */}
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">

                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Quản lý sự kiện </h3>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control"
                                                    placeholder="Vui lòng nhập tên sự kiện"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-sm btn-outline-primary btn-icon-prepend"
                                                        type="button"
                                                        onClick={() => fetchDataSearcg(searchQuery)}>
                                                        <i className="mdi mdi-magnify"></i> Search</button>
                                                    <button type="button" onClick={handleExport} class="btn btn-outline-success btn-icon-text ml-auto">
                                                        <i class="mdi mdi-file-export btn-icon-prepend" fontSize={24}></i>
                                                        Export to Excel
                                                    </button>
                                                    {/* <button class="btn btn-sm btn btn-outline-danger btn-icon-prepend " type="button">
                                                        <i class="mdi mdi-export"></i> Export</button> */}
                                                </div>

                                            </div>


                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    <Button className="btn btn-sm btn-outline-primary btn-icon-prepend text-white" type="button" onClick={handleShowModal}>
                                                        <i className="mdi mdi-note-plus"></i> Thêm sự kiện
                                                    </Button>

                                                    <Modal show={showModal} onHide={handleCloseModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Thêm sự kiện</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <form onSubmit={handleAddEvent}>
                                                                <div className="form-group">
                                                                    <label className="form-control-label">Tên sự kiện</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="VD:Sự kiện Hiến Máu A"
                                                                        onChange={(e) => setEventName(e.target.value)}
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="form-control-label label">Ngày bắt đầu sự kiện(*)</label>
                                                                    <input
                                                                        type="date"
                                                                        id="startDate"
                                                                        name="startDate"
                                                                        className="form-control border-1"
                                                                        placeholder="VD: 01/01/2000"
                                                                        required="required"
                                                                        min={minDate}
                                                                        onChange={(e) => setDate_start(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="form-control-label label">Ngày kết thúc sự kiện(*)</label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control border-1"
                                                                        placeholder="VD: 01/01/2000"
                                                                        required="required"
                                                                        min={minDate}
                                                                        onChange={(e) => setDate_end(e.target.value)}
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="form-control-label label">Số lượng tối đa</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control border-1"
                                                                        placeholder="VD: 200"
                                                                        onChange={(e) => setAmount(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="form-control-label label">Địa chỉ</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-1"
                                                                        placeholder="VD: Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM"
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    {/* Error Message */}
                                                                    {msgErr && (
                                                                        <div className="alert alert-danger" role="alert">
                                                                            {msgErr}
                                                                        </div>
                                                                    )}

                                                                </div>
                                                                <div className="form-group">
                                                                    {/* Error Message */}
                                                                    {successMsg && (
                                                                        <div className="alert alert-success" >
                                                                            {successMsg}
                                                                        </div>
                                                                    )}

                                                                </div>
                                                                <div>
                                                                    <Button variant="primary" type="submit" className="float-right">
                                                                        Thêm
                                                                    </Button>
                                                                    <Button variant="secondary" className="float-right btnclose" onClick={handleCloseModal}>
                                                                        Hủy
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Modal.Body>
                                                    </Modal>


                                                </div>
                                            </div></div>
                                        <p className="card-description"></p>
                                        <Table
                                            dataSource={data}
                                            columns={columns}
                                            loading={loading}
                                            rowKey="_id"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-4 stretch-card grid-margin"> */}

                    </div>
                </div>
            </div >
            <ToastContainer></ToastContainer>
        </div>

    )
};

export default SuKien;
