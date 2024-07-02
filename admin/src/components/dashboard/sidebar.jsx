import React from "react";
import "@fortawesome/fontawesome-free"
import {
  logOutStart,
  logOutSuccess,
  logOutFailed
} from "../../redux/authSlice";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from '../../utils/constant'
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar() {
  const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
  const accessToken = currentAdmin?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logOutStart());
    try {
        const res = await fetch(`${baseUrl}/v1/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            dispatch(logOutFailed());
        } else {
            dispatch(logOutSuccess());
            dispatch(adminprofileSuccess());
            hospitalprofileSuccess();
            navigate("/");
        }
    } catch (error) {
        dispatch(logOutFailed());
    }
}
  return (
    <>
      {/* <div className="container-fluid page-body-wrapper"> */}
      {/* partial:partials/_settings-panel.html */}
      <div className="theme-setting-wrapper">
        <div id="settings-trigger">
          <i className="ti-settings" />
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close ti-close" />
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3" />
            Light
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3" />
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success" />
            <div className="tiles warning" />
            <div className="tiles danger" />
            <div className="tiles info" />
            <div className="tiles dark" />
            <div className="tiles default" />
          </div>
        </div>
      </div>
      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close ti-close" />
        <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="todo-tab"
              data-toggle="tab"
              href="#todo-section"
              role="tab"
              aria-controls="todo-section"
              aria-expanded="true"
            >
              TO DO LIST
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="chats-tab"
              data-toggle="tab"
              href="#chats-section"
              role="tab"
              aria-controls="chats-section"
            >
              CHATS
            </a>
          </li>
        </ul>
        <div className="tab-content" id="setting-content">
          <div
            className="tab-pane fade show active scroll-wrapper"
            id="todo-section"
            role="tabpanel"
            aria-labelledby="todo-section"
          >
            <div className="add-items d-flex px-3 mb-0">
              <form className="form w-100">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control todo-list-input"
                    placeholder="Add To-do"
                  />
                  <button
                    type="submit"
                    className="add btn btn-primary todo-list-add-btn"
                    id="add-task"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="list-wrapper px-3">
              <ul className="d-flex flex-column-reverse todo-list">
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Team review meeting at 3.00 PM
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Prepare for presentation
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Resolve all the low priority tickets due today
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Schedule meeting for next week
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Project review
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
              </ul>
            </div>
            <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">
              Events
            </h4>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary mr-2" />
                <span>Feb 11 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Creating component page build a js
              </p>
              <p className="text-gray mb-0">The total number of sessions</p>
            </div>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary mr-2" />
                <span>Feb 7 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Meeting with Alisa
              </p>
              <p className="text-gray mb-0 ">Call Sarah Graves</p>
            </div>
          </div>
          {/* To do section tab ends */}
          <div
            className="tab-pane fade"
            id="chats-section"
            role="tabpanel"
            aria-labelledby="chats-section"
          >
            <div className="d-flex align-items-center justify-content-between border-bottom">
              <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                Friends
              </p>
              <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                See All
              </small>
            </div>
            <ul className="chat-list">
              <li className="list active">
                <div className="profile">
                  <img src="images/faces/face1.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Thomas Douglas</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">19 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="images/faces/face2.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <div className="wrapper d-flex">
                    <p>Catherine</p>
                  </div>
                  <p>Away</p>
                </div>
                <div className="badge badge-success badge-pill my-auto mx-2">
                  4
                </div>
                <small className="text-muted my-auto">23 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="images/faces/face3.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Daniel Russell</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">14 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="images/faces/face4.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <p>James Richardson</p>
                  <p>Away</p>
                </div>
                <small className="text-muted my-auto">2 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="images/faces/face5.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Madeline Kennedy</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">5 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="images/faces/face6.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Sarah Graves</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">47 min</small>
              </li>
            </ul>
          </div>
          {/* chat tab ends */}
        </div>
      </div>
      {/* partial */}
      {/* partial:partials/_sidebar.html */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item ">
            <a className="nav-link " href="/dashboard">
              <i className="icon-grid menu-icon" />
              <span className="menu-title">Trang chủ</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="icon-layout menu-icon" />
              <span className="menu-title">Quản lý</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/nguoi-dung">
                    Người dùng
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/su-kien">
                    Sự kiện
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="/benh-vien"
                  >
                    Bệnh viện
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/hop-tac">
              <i className="menu-icon mdi mdi-clipboard-check"></i>

              <span className="menu-title">Hợp tác</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"

              href="/thong-ke"
              aria-expanded="false"
              aria-controls="charts"
            >
              <i className="icon-bar-graph menu-icon" />
              <span className="menu-title">Biểu đồ</span>

            </a>

          </li>


          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i className="icon-head menu-icon" />
              <span className="menu-title">Dành cho bạn</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/me">
                    {" "}
                    Chỉnh sửa thông tin{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/mat-khau">
                    {" "}
                    Đổi mật khẩu{" "}
                  </a>
                </li>

              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/dang-xuat" onClick={handleLogout}>
              <i className="icon-paper menu-icon" />
              <span className="menu-title">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* partial */}
      {/* </div> */}



    </>




  )

}