import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
function ChiTietSuKien() {

    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.eventdetail.getevent);

    return (
        <>
            <div className="container-scroller">
                <Navbar></Navbar>
                <div className="container-fluid page-body-wrapper">
                    <Sidebar></Sidebar>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <i className="mdi mdi-keyboard-backspace" style={{ fontSize: "24px", padding: "5px" }}></i>
                                            <br/>
                                            <br/> <h3>Chi tiết sự kiện </h3>
                                            <br/> <h4>Thông tin sự kiện</h4>
                                            <form className="forms-sample">
                                                <div className="col-8 form-group">
                                                    <label className="form-control-label">CCCD/CMND/Số định danh</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                      
                                                    />
                                                </div>
                                                <div className="col-8 form-group">
                                                    <label className="form-control-label" >Email address</label>
                                                    <input type="email" className="form-control" placeholder="Email" />
                                                </div>
                                                <div className="col-8 form-group">
                                                    <label className="form-control-label" >Password</label>
                                                    <input type="password" className="form-control" placeholder="Password" />
                                                </div>
                                                <div className="col-8 form-group">
                                                    <label for="exampleSelectGender">Confirm Password</label>
                                                    <input type="password" className="form-control" placeholder="Password" />

                                                </div>
                                                <div className="col-8 form-group">
                                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                <button className="btn btn-light">Cancel</button></div>
                                            </form>
                                            <br/> <h4>Danh sách người đăng ký sự kiện</h4>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
};

export default ChiTietSuKien;
