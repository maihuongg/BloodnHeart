import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import isEmpty from "validator/lib/isEmpty";


function NguoiDung() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [cccd, setCccd] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [msgErr, setMsgErr] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [successMsg, setSuccessMsg] = useState(null);   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchData = async () => {
        try {
            const response2 = await fetch("http://localhost:8000/v1/admin/users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });

            if (response2.ok) {
                const data2 = await response2.json();
                //data gồm count và allAccount
                console.log(data2.allAccount)
                setData(data2.allAccount);
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
                const response2 = await fetch("http://localhost:8000/v1/admin/users", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });

                if (response2.ok) {
                    const data2 = await response2.json();
                    //data gồm count và allAccount
                    console.log(data2.allAccount)
                    setData(data2.allAccount);
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
     
    const columns = [
        {
            title: "CCCD",
            dataIndex: "cccd",
            key: "cccd",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (text, record) => (
                // Hiển thị vai trò dựa trên điều kiện
                record.isAdmin ? "Admin" :
                    record.isHospital ? "Bệnh viện" :
                        "Người dùng"
            ),
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
                        onClick={() => {
                            navigate(`/nguoi-dung/chinh-sua/${record._id}`);
                          }}
                    ></i>
                    {/* <i
                        className="mdi mdi-grease-pencil"
                        style={{ fontSize: '20px', padding: '5px' }}

                    ></i> */}
                    <i
                        className="mdi mdi-delete-forever"
                        style={{ fontSize: '20px', padding: '5px' }}

                    ></i>
                </div>
            )
        }

    ];
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false, () => {
          navigate("/nguoi-dung");
        });
      };
   
    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            cccd: cccd,
            password: password,
            email: email
        };
        const repw = repassword;
        if (isEmpty(repassword)) {
            setMsgErr("Vui lòng điền vào các mục còn trống");
        } else {
            if (repw == newUser.password) {
                try {
                    const response = await fetch('http://localhost:8000/v1/auth/register', {
                        method: 'POST',
                        body: JSON.stringify(newUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        setMsgErr(errorData.message);
                        setSuccessMsg(null);
                    } else {
                        setSuccessMsg("Thêm thành công ! ");
                        setMsgErr(null);
                    }
                } catch (error) {

                    setMsgErr("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
                    setSuccessMsg(null);
                }
            } else {
                //e.preventDefault();
                setMsgErr("Xác nhận lại mật khẩu không trùng nhau.");
                setSuccessMsg(null);
            }
        }
    }

    return (<>
        <div className="container-scroller">
            <Navbar></Navbar>
            <div className="container-fluid page-body-wrapper">
                <Sidebar></Sidebar>
                <div className="main-panel">
                    <div className="content-wrapper">
                        {/* quản lý người dùng  */}
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">

                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Quản lý tài khoản </h3>
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
                                                    <button
                                                        className="btn btn-sm btn-outline-primary btn-icon-prepend"
                                                        onClick={handleShowModal}
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                    >
                                                        <i className="mdi mdi-note-plus"></i> Thêm tài khoản
                                                    </button>
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
        {showModal && (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleRegister} className="forms-sample">
                                {/* ... (other form fields) */}
                                <div className="form-group">
                                    <label className="form-control-label">CCCD/CMND/Số định danh</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="CCCD/CMND/Số định danh"
                                        onChange={(e) => setCccd(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" >Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" >Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleSelectGender">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => setRepassword(e.target.value)} />
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
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-light" data-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
};

export default NguoiDung;
