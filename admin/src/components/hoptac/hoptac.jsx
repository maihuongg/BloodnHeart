import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import isEmpty from "validator/lib/isEmpty";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function HopTac() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showClose, setShow] = useState(false);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const [msgErr, setMsgErr] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [cccd, setCccd] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const isAdmin = currentAdmin.isAdmin;
    const isHospital = currentAdmin.isHospital;
    const [password1, setPassword1] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const handleShowAccept = async (record) => {
        const cccd = record.cccd;
        console.log("cccd:", cccd);
        setCccd(cccd);
        setShowModal(true);

    }
    const handleCloseModal = () => {
        setShowModal(false, () => {
            navigate("/hop-tac");
        });
    };
    const handleAccept = async (e) => {
        e.preventDefault();
        try {
            const request = {
                cccd: cccd,
                password1: password1,
                repeatPassword: repeatPassword
            };
            console.log("request", request)
            const response = await fetch('http://localhost:8000/v1/admin/accept-hospital', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            }
            );
            if (!response.ok) {
                setMsgErr('Đã xảy ra lỗi. Vui lòng thử lại sau!');
            } else {
                const data = await response.json();
                console.log(data);
                setSuccessMsg(
                    " Thành công"
                );
            }
        } catch (error) {

            console.error(" error:", error);
            setMsgErr("Đã xảy ra lỗi. Vui lòng thử lại sau!");
        }
    };

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response2 = await fetch("http://localhost:8000/v1/admin/hospital-profile-accid", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response2.ok) {
                    const data2 = await response2.json();
                    //data gồm count và allAccount                   
                    setData(data2);
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
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Mã số",
            dataIndex: "cccd",
            key: "cccd",
        },
        {
            title: "Người đứng đầu",
            dataIndex: "leaderName",
            key: "leaderName",
            render: (text, record) => (
                record.profile && record.profile.length > 0)
                ?
                record.profile[0].leaderName : "Không xác định",
        },
        {
            title: "Tên bệnh viện",
            dataIndex: "hospitalName",
            key: "hospitalName",
            render: (text, record) => (
                record.profile && record.profile.length > 0)
                ?
                record.profile[0].hospitalName : "Không xác định",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Ngày gửi yêu cầu",
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
                        className="mdi mdi-check"
                        style={{ fontSize: '20px', padding: '5px' }}
                        onClick={() => handleShowAccept(record)}
                    ></i>
                    <i
                        className="mdi mdi-close-box"
                        style={{ fontSize: '20px', padding: '5px' }}

                    ></i>
                </div>
            )
        }

    ];

    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        {isAdmin ? (
                            < div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title"> Danh sách các yêu cầu hợp tác  </h3>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-sm btn-outline-primary btn-icon-prepend" type="button"><i className="mdi mdi-magnify"></i> Search</button>
                                                        <button className="btn btn-sm btn btn-outline-info btn-icon-prepend" type="button">
                                                            <i className="mdi mdi-file-import"></i> Import</button>
                                                        <button className="btn btn-sm btn btn-outline-danger btn-icon-prepend " type="button">
                                                            <i className="mdi mdi-export"></i> Export</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-append">

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
                        )};
                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Phê duyệt yêu cầu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleAccept}>

                            <div className="form-group">
                                <label className="form-control-label">Cấp mật khẩu lần đầu</label>
                                <input
                                    type="password"
                                    className="form-control"

                                    onChange={(e) => setPassword1(e.target.value)}
                                />
                            </div>


                            <div className="form-group">
                                <label className="form-control-label">Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"

                                    onChange={(e) => setRepeatPassword(e.target.value)}
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
            </div >
        </div >
    )
}

export default HopTac;
