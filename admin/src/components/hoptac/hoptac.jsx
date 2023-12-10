import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import isEmpty from "validator/lib/isEmpty";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";


function HopTac() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const [msgErr, setMsgErr] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [cccd, setCccd] = useState("");
    const [hospitalName, setHospitalName] = useState("");

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
                        {/* quản lý người dùng  */}
                        <div className="row">
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
                    </div>
                </div>
            </div >

        </div>

    )
}

export default HopTac;
