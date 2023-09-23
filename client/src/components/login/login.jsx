import React from "react";
import { Link } from "react-router-dom";
// import "../login/login.css";
function login() {
    return (
        <>
            {/* Navbar Start */}
            <div className="container-fluid bg-light position-relative shadow">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5 position-relative">
                    <a
                        href=""
                        className="navbar-brand font-weight-bold text-secondary"
                        style={{ fontSize: 50 }}
                    >
                        <img src="img/logo.png"></img>
                        <span className="text-primary" style={{ fontSize: 40 }}> BloodnHeart</span>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav font-weight-bold mx-auto py-0">

                        </div>
                        <a href="/" className="btn btn-primary m-3 position-absolute" style={{ right: "0px" }}>
                            BACK <i class="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
            <div className="container ">
                <div className="row align-items-center ">
                    <div className="col-lg-4 col-md-4" />
                    <div className="col-lg-4 col-md-4 login-box ">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true" />
                        </div>
                        <div className="col-lg-12 login-title">LOGIN</div>
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form>
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        <input type="text" className="form-control inputtext" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type="password" className="form-control" i="" />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                            {/* Error Message */}
                                        </div>
                                        <div className="col-lg-12 login-btm login-button d-flex justify-content-center align-items-center">
                                            <button type="submit" className="btn btn-outline-primary">
                                                CONTINUE <i class="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2" />
                    </div>
                </div>
            </div>



        </>
    );
}
export default login;