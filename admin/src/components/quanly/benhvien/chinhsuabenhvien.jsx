import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed
} from "../../../redux/adminSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChinhSuaBenhVien() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [images, setImages] = useState("");
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const proHospital = useSelector((state) => state.hospital.profile.gethospital);
    const accessToken = currentAdmin?.accessToken;
    //id
    const { id } = useParams();
   
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setCccd] = useState("");
    const [address, setAddress] = useState("");
    const [hospitalName, setHospitalName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [isHospital, setIsHospital] = useState(false);
    const handleGoBack = () => {
        navigate("/benh-vien");
    };
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/v1/admin/hospital/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    console.log("Có lỗi xảy ra.");
                } else {
                    const data = await response.json();
                    console.log(data);
                    setCccd(data.cccd);
                    setLeaderName(data.leaderName);                  
                    setHospitalName(data.hospitalName);
                    setAddress(data.address);
                    setPhone(data.phone);
                    setEmail(data.email);
                    setImages(data.images);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, accessToken]);
    //xử lý upload file - boostrap
    const showNotification = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };
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
    const handleUpdateImage = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('images', images);
            const response = await fetch(`http://localhost:8000/v1/admin/hospital/update-image/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    token: `Bearer ${accessToken}`
                }
            });
            console.log(response)
            if (!response.ok) {
                console.log("Có lỗi xảy ra.");
                // dispatch(userprofileFailed());
            } else {
                const data = await response.json();
                // dispatch(userprofileSuccess(data));
                showNotification('Đã thay đổi avatar thành công.');
                console.log(data);
            }
        } catch (error) {
            // dispatch(userprofileFailed());
            console.log("Có lỗi xảy ra.");
        }
    }
    const handleUploadInfo = async (e) => {
        e.preventDefault();
        try {
            const newInfo = {
                leaderName: leaderName,
                hospitalName: hospitalName,
                phone: phone,
                address: address
            }
            console.log("NewInfo: ", newInfo)
            const response = await fetch(`http://localhost:8000/v1/admin/hospital/update-info/${id}`, {
                method: 'PUT',
                body: JSON.stringify(newInfo),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                console.log("Có lỗi xảy ra.");
            } else {
                const data = await response.json();
                showNotification('Cập nhật thông tin thành công.');
                console.log(data);
            }
        } catch (error) {
            console.log("Có lỗi xảy ra.");
        }
    }
    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <i
                                className="mdi mdi-keyboard-backspace"
                                style={{ fontSize: "24px", padding: "5px" }}
                                onClick={handleGoBack}
                            ></i>
                            <br />
                            <br /> <h3>Chỉnh sửa thông tin bệnh viện</h3>
                            <br />
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body text-center">
                                            <form onSubmit={handleUpdateImage}>
                                                <br />
                                                <br />
                                                <img
                                                    src={images ? images : "https://res.cloudinary.com/bloodnheart/image/upload/v1700060680/image-default/default_image_profile_mdpdlu.jpg"}
                                                    alt="Profile Image"
                                                    className="img-fluid rounded-circle"
                                                    style={{ width: "200px", height: "200px" }}
                                                />
                                                <h4 className="card-title mt-10">{hospitalName}</h4>
                                                <p className="card-description">Tài khoản bệnh viện</p>
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
                                                    <label className="form-control-label">CCCD/CMND/Số định danh</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={cccd}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Email address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        disabled
                                                        value={email}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Tên bệnh viện</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={hospitalName}
                                                        placeholder="Vui lòng nhập tên bệnh viện"
                                                        onChange={(e) => setHospitalName(e.target.value)}
                                                    />
                                                </div>
                                                

                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Tên người đứng đầu</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={leaderName}
                                                        placeholder="Vui lòng nhập tên người đứng đầu"
                                                        onChange={(e) => setLeaderName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Số điện thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={phone}
                                                        placeholder="Vui lòng nhập số điện thoại"
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Địa chỉ</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={address}
                                                        placeholder="Vui lòng nhập địa chỉ"

                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-10 form-group">
                                                    <button type="submit" className="btn btn-primary mr-2">
                                                        Lưu lại
                                                    </button>
                                                    <button className="btn btn-light" onClick={handleGoBack}>
                                                        Hủy
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>

        </>
    );
}

export default ChinhSuaBenhVien;
