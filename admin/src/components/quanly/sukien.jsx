import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";
import { useSelector } from "react-redux";
import moment from "moment";
function SuKien() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const hospitalProfile = useSelector((state) => state.hospital.profile.gethospital);
    const hospitalId = hospitalProfile?._id;
    const accessToken = currentAdmin?.accessToken;
    const isAdmin = currentAdmin?.isAdmin;
    const isHospital = currentAdmin?.isHospital;
    useEffect(() => {
        if (isAdmin) {
            //Function to fetch data from the API
            const fetchData1 = async () => {
                try {
                    const response1 = await fetch("http://localhost:8000/v1/admin/event", {
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
                        const response2 = await fetch("http://localhost:8000/v1/hospital/event/" + hospitalId, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                token: `Bearer ${accessToken}`
                            }
                        });

                        if (response2.ok) {
                            const data2 = await response2.json();
                            //data gồm count và allAccount
                            console.log(data2.allEvent)
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
    }, []);

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
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "date_end",
            key: "date_end",
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

                    ></i>
                    <i
                        className="mdi mdi-grease-pencil"
                        style={{ fontSize: '20px', padding: '5px' }}

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


                        {/* quản lý người dùng  */}
                        <div class="row">
                            <div class="col-lg-12 grid-margin stretch-card">

                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">Quản lý sự kiện </h3>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" />
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-outline-primary btn-icon-prepend" type="button"><i class="mdi mdi-magnify"></i> Search</button>
                                                    <button class="btn btn-sm btn btn-outline-info btn-icon-prepend" type="button">
                                                        <i class="mdi mdi-file-import"></i> Import</button>
                                                    <button class="btn btn-sm btn btn-outline-danger btn-icon-prepend " type="button">
                                                        <i class="mdi mdi-export"></i> Export</button>
                                                </div>

                                            </div>


                                        </div>

                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-outline-primary btn-icon-prepend" type="button"><i class="mdi mdi-note-plus"></i> Thêm sự kiện</button>
                                                    
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
                        {/* <div className="col-md-4 stretch-card grid-margin"> */}

                    </div>
                </div>
            </div >
        </div>
    )
};

export default SuKien;
