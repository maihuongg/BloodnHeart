import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
    adminprofileFailed,
    adminprofileStart,
    adminprofileSuccess
} from "../../redux/adminSlice";
import {
    hospitalprofileStart,
    hospitalprofileSuccess,
    hospitalrofileFailed
} from "../../redux/hospitalSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from "../../utils/constant";
function ChinhSuaCaNhan() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentAdmin = useSelector((state) => state.admin.profile.getadmin);
    const accAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const hospitalPro = useSelector((state) => state.hospital.profile.gethospital);
    const isAdmin = accAdmin?.isAdmin;
    const isHospital = accAdmin?.isHospital;
    const accessToken = accAdmin?.accessToken;
    //accountId
    // const { id } = useParams();
    const id = accAdmin?._id;
    console.log("id từ current là :", id)
    const [cccd, setCCCd] = useState(accAdmin?.cccd);
    const [adminName, setadminName] = useState(currentAdmin?.adminName);
    const [birthDay, setBirthDay] = useState(currentAdmin?.birthday);
    const [gender, setGender] = useState(currentAdmin?.gender);
    const [bloodGroup, setBloodGroup] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState(currentAdmin?.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [leaderName, setLeaderName] = useState(hospitalPro?.leaderName);
    const [hospitalName, setHospitalName] = useState(hospitalPro?.hospitalName)
    const [images, setImages] = useState("");

    useEffect(() => {
        if (isAdmin) {
            console.log(currentAdmin?.images);
            setImages(currentAdmin?.images);
            setPhone(currentAdmin?.phone);
            setAddress(currentAdmin?.address);
        } else {
            setImages(hospitalPro?.images);
            setPhone(hospitalPro?.phone);
            setAddress(hospitalPro?.address);
        }
    }, [isAdmin, currentAdmin, hospitalPro]);

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
            const urlAPI = isAdmin
                ? `${baseUrl}/v1/admin/profile-update-image/${id}`
                : `${baseUrl}/v1/admin/hospital-update-image/${id}`;

            const response = await fetch(urlAPI, {
                method: 'PUT',
                body: formData,
                headers: {
                    // ...other headers

                },
            });
            console.log(response)
            if (!response.ok) {
                console.log("Có lỗi xảy ra.");
                // dispatch(userprofileFailed());
            } else {
                const data = await response.json();
                if (isAdmin) {
                    dispatch(adminprofileSuccess(data));
                } else {
                    dispatch(hospitalprofileSuccess(data));
                }
                showNotification('Đã thay đổi avatar thành công.');
                console.log(data);
            }
        } catch (error) {
            // dispatch(userprofileFailed());
            console.log("Có lỗi xảy ra.");
        }
    };

    const handleUploadInfo = async (e) => {
        e.preventDefault();
        try {
            const newInfo = isAdmin
                ? {
                    adminName,
                    gender,
                    phone,
                    birthDay: moment(birthDay, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    address,
                }
                : {
                    leaderName,
                    hospitalName,
                    phone,
                    address,
                };

            const urlAPI = isAdmin
                ? `${baseUrl}/v1/admin/profile-update-info/${id}`
                : `${baseUrl}/v1/admin/hospital-update-info/${id}`;
            const response = await fetch(urlAPI, {
                method: 'PUT',
                body: JSON.stringify(newInfo),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error updating information:", errorData);
                console.log("Có lỗi xảy ra.");
            } else {
                const data = await response.json();
                if (isAdmin) {
                    dispatch(adminprofileSuccess(data));
                } else {
                    dispatch(hospitalprofileSuccess(data));
                }
                showNotification('Cập nhật thông tin thành công.');
                console.log(data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
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

                            <br />
                            <br /> <h3>Chỉnh sửa tài khoản </h3>
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
                                                {isAdmin ? (<div>
                                                    <h4 className="card-title mt-10">{adminName}</h4>
                                                    <p className="card-description">Admin</p>
                                                </div>) : (<div>
                                                    <h4 className="card-title mt-10">{hospitalName}</h4>
                                                    <p className="card-description">Bệnh viện hợp tác</p>
                                                </div>)}

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
                                                {isAdmin ? (<div className="col-10 form-group">
                                                    <label className="form-control-label">Họ và tên</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={adminName}
                                                        placeholder="Vui lòng nhập họ tên"

                                                        onChange={(e) => setadminName(e.target.value)}
                                                    />
                                                </div>) : (
                                                    <div>
                                                        <div className="col-10 form-group">
                                                            <label className="form-control-label">Tên bệnh viện</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={hospitalName}
                                                                placeholder="Vui lòng nhập họ tên"

                                                                onChange={(e) => setHospitalName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-10 form-group">
                                                            <label className="form-control-label">Người đứng đầu</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={leaderName}
                                                                placeholder="Vui lòng nhập họ tên"

                                                                onChange={(e) => setLeaderName(e.target.value)}
                                                            />
                                                        </div></div>
                                                )}
                                                {isAdmin ? (<div><div className="col-10 form-group ">
                                                    <label className="form-control-label">Giới tính</label>
                                                    <select
                                                        className="form-control"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">Chọn giới tính</option>
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                </div>


                                                    <div className="col-10 form-group">
                                                        <label className="form-control-label">Ngày sinh</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={birthDay}
                                                            onChange={(e) => setBirthDay(e.target.value)}
                                                        />
                                                    </div></div>
                                                ) : (<div></div>)}
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
                                                    <button className="btn btn-light" >
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

export default ChinhSuaCaNhan;
