import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";

function ChinhSuaNguoiDung() {

    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;



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
                                            <br/> <h3 >Chỉnh sửa tài khoản </h3>
                                            <br/>
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

export default ChinhSuaNguoiDung;
