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
                                                        <button class="btn btn-sm btn btn-outline-info btn-icon-prepend" type="button">
                                                            <i class="mdi mdi-file-import"></i> Import</button>
                                                        {/* <button class="btn btn-sm btn btn-outline-danger btn-icon-prepend " type="button">
                                                            <i class="mdi mdi-export"></i> Export</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <div class="input-group-append">
                                                        <Button class="btn btn-sm btn-outline-primary btn-icon-prepend" type="button" >
                                                            <i class="mdi mdi-note-plus"></i> Thêm bệnh viện
                                                        </Button>
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
