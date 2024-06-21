import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import isEmpty from "validator/lib/isEmpty";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import * as XLSX from 'xlsx';

import {
    hospitalprofileStart,
    hospitalprofileSuccess,
    hospitalrofileFailed
} from "../../../redux/hospitalSlice"
function BenhVien() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const hospitalProfile = useSelector((state) => state.hospital.profile.gethospital);
    const hospitalId = hospitalProfile?._id;
    const isAdmin = currentAdmin?.isAdmin;
    const isHospital = currentAdmin?.isHospital;
    const accessToken = currentAdmin?.accessToken;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showClose, setShow] = useState(false);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setCccd] = useState("");
    const [address, setAddress] = useState("");
    const [hospitalName, setHospitalName] = useState("")
    const [msgErr, setMsgErr] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const fetchDataSearcg = async (keyword) => {
        try {
            const response2 = await fetch(`http://localhost:8000/v1/admin/search/hospital?keyword=${keyword}`, {
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
    const fetchData = async () => {
        try {
            const response2 = await fetch('http://localhost:8000/v1/admin/hospital', {
                method: 'GET',
                headers: {

                    token: `Bearer ${accessToken}`
                }
            });

            if (response2.ok) {
                const data2 = await response2.json();
                //data gồm count và allAccount
                console.log(data2.allHospital)
                setData(data2.allHospital);
            }
            else return 0;
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response2 = await fetch('http://localhost:8000/v1/admin/hospital', {
                    method: 'GET',
                    headers: {

                        token: `Bearer ${accessToken}`
                    }
                });

                if (response2.ok) {
                    const data2 = await response2.json();
                    //data gồm count và allAccount
                    console.log(data2.allHospital)
                    setData(data2.allHospital);
                }
                else return 0;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (!showModal) {
            fetchData();
        }
    }, [showModal]);
    const handleGetInfoHospital = async (id) => {
        dispatch(hospitalprofileStart());
        try {
            const response = await fetch(`http://localhost:8000/v1/admin/hospital/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                dispatch(hospitalrofileFailed());
            }
            else {
                const data = await response.json();
                console.log(data);
                dispatch(hospitalprofileSuccess(data));
                navigate(`/benh-vien/chinh-sua/${id}`);
            }
        } catch (error) {
            dispatch(hospitalrofileFailed());
            console.error("Error fetching data:", error);
        }
    }
    const columns = [
        {
            title: "Tên bệnh viện",
            dataIndex: "hospitalName",
            key: "hospitalName",
        },
        {
            title: "Người đứng đầu",
            dataIndex: "leaderName",
            key: "leaderName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
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
                        onClick={() => handleGetInfoHospital(record._id)}

                    ></i>
                    <i
                        className="mdi mdi-delete-forever"
                        style={{ fontSize: '20px', padding: '5px' }}

                    ></i>
                </div>
            )
        }

    ];
    const handleShowModal = () => {
        if (isAdmin) {
            setShowModal(true);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false, () => {
            navigate("/benh-vien");
        });
    };

    const handleAddHospital = async (e) => {
        e.preventDefault();

        if (isEmpty(hospitalName) || isEmpty(leaderName) || isEmpty(cccd) || isEmpty(email) || isEmpty(phone) || isEmpty(address)) {
            setMsgErr("Vui lòng điền các trường thông tin còn thiếu");
        } else {
            const newHospital = {
                leaderName: leaderName,
                hospitalName: hospitalName,
                address: address,
                phone: phone,
                email: email,
                cccd: cccd
            }
            try {
                const response = await fetch("http://localhost:8000/v1/admin/hospital/add", {
                    method: 'POST',
                    body: JSON.stringify(newHospital),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setMsgErr(errorData.message);
                    setSuccessMsg(null);
                } else {
                    const data = await response.json();
                    setSuccessMsg("Thêm thành công. Mật khẩu đăng nhập mặc định dành cho bệnh viện là BnH@hospital");
                    setMsgErr(null);
                    console.log('dataAddHospital', data);

                }
            } catch (error) {
                setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
                setSuccessMsg(null);
            }
        }

    }
    const handleExport = () => {
        const wb = XLSX.utils.book_new();
        const dataToExport = data.map(row => {
            return {
                "Tên bệnh viên": row.hospitalName,
                "Tên người đứng đầu": row.leaderName,
                "Email liên hệ": row.email,
                "Số điện thoại/hotline": row.phone,
                "Ngày tạo": moment(row.createdAt).format('DD-MM-YYYY')
            };
        });
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách bệnh viện')

        // Tạo file Excel và tải xuống
        XLSX.writeFile(wb, 'danhsachbenhvien.xlsx');
    };
    return (
        <div className="container-scroller">
            <Navbar></Navbar>
            <div className="container-fluid page-body-wrapper">
                <Sidebar></Sidebar>
                <div class="main-panel">
                    <div class="content-wrapper">
                        {isAdmin ? (
                            <div class="row">
                                <div class="col-lg-12 grid-margin stretch-card">

                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Quản lý bệnh viện </h3>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text"
                                                        class="form-control"
                                                        placeholder="Vui lòng nhập tên bệnh viện"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-sm btn-outline-primary btn-icon-prepend"
                                                            type="button"
                                                            onClick={() => fetchDataSearcg(searchQuery)}>
                                                            <i class="mdi mdi-magnify"></i> Search</button>
                                                        <button type="button" onClick={handleExport} class="btn btn-outline-success btn-icon-text ml-auto">
                                                            <i class="mdi mdi-file-export btn-icon-prepend" fontSize={24}></i>
                                                            Export to Excel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <div class="input-group-append">
                                                        <Button class="btn btn-sm btn-outline-primary btn-icon-prepend" type="button" onClick={handleShowModal} >
                                                            <i class="mdi mdi-note-plus"></i> Thêm bệnh viện
                                                        </Button>
                                                        <Modal show={showModal} onHide={handleCloseModal}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Thêm bệnh viện hợp tác</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <form onSubmit={handleAddHospital}>
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên bệnh viện</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="VD: Bệnh viện A"
                                                                            onChange={(e) => setHospitalName(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label className="form-control-label label">Người đứng đầu</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="VD: Nguyễn Văn A"
                                                                            onChange={(e) => setLeaderName(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="form-control-label label">Số định danh/Mã bệnh viện</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="VD: Bệnh viện A"
                                                                            onChange={(e) => setCccd(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="form-control-label label">Email liên hệ</label>
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            placeholder="example@gmail.com"
                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label className="form-control-label label">Số điện thoại</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="VD: 0909115115"
                                                                            onChange={(e) => setPhone(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="form-control-label label">Địa chỉ</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control "
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
                                                                            Lưu Lại
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
                                            <p class="card-description"></p>
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
                        ) : (
                            <div className="row">
                                <div class="col-lg-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div className="card-body text-center">
                                            <h3 class="card-title">Xin lỗi! Chức năng này chỉ dành cho Admin hệ thống</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* quản lý người dùng  */}

                    </div>
                </div>
            </div >
        </div>
    )
};

export default BenhVien;
