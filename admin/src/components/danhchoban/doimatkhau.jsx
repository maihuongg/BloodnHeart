import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";
import { useNavigate } from "react-router-dom";
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

function DoiMatKhau() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentAdmin = useSelector((state) => state.admin.profile.getadmin);
    const accAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const hospitalPro = useSelector((state) => state.hospital.profile.gethospital);
    const isAdmin = accAdmin?.isAdmin;
    const isHospital = accAdmin?.isHospital;
    const accessToken = accAdmin?.accessToken;
    const id = accAdmin?._id;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //xử lý upload file - boostrap
    const showNotification = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const newInfo = {
                newPassword: password,
                confirmPassword: confirmPassword
            };

            const response = await fetch(`http://localhost:8000/v1/auth/change-password/${id}`, {
                method: 'POST',
                body: JSON.stringify(newInfo),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.log("Có lỗi xảy ra.");
            } else {
                const data = await response.json();
                showNotification('Thay đổi mật khẩu thành công.');
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <br />
                                            <br /> <h3>Thay đổi mật khẩu </h3>
                                            <br />
                                            <div className="col-lg-6 mx-auto">
                                                <form className="pt-3" onSubmit={handleChangePassword}>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-lg" placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-lg" placeholder="Xác nhận mật khẩu" onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
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
                        <ToastContainer></ToastContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoiMatKhau;
