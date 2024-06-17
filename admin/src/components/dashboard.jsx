import React from "react";
import Footer from "./dashboard/footer";
import Navbar from "./dashboard/navbar";
import Sidebar from "./dashboard/sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Dangnhap from "./dangnhap";
import Panel from "./dashboard/panel";
import "../redux/adminSlice"
import "../redux/authSlice"
import moment from 'moment'
async function totalUser(accessToken) {

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
      return data2.count;
    }
    else return 0;
  } catch (error) {

  }
}
async function totalEvents(){
  try {
    const responseTotalEvent = await fetch("http://localhost:8000/v1/admin/totalEvent", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseTotalEvent.ok) {
      const dataTotalEvent = await responseTotalEvent.json();
      console.log('dataTotalEvent: ', dataTotalEvent)
      return dataTotalEvent.totalEvent;
    }
    else return 0;
  } catch (error) {
    
  }
}

function Dashboard() {
  const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
  const adminProfile = useSelector((state) => state.admin.profile.getadmin);
  const hospitalProfile = useSelector((state) => state.hospital.profile.gethospital);
  const accountId = currentAdmin?._id
  const accessToken = currentAdmin?.accessToken;
  const isAdmin = currentAdmin?.isAdmin;
  const isHospital = currentAdmin?.isHospital;
  const [isAdminOrHospital, setAdminOrHospital] = useState(null);
  const [name, setName] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [userTotal, setUserTotal] = useState(null);
  const [eventTotal, setEventTotal] = useState(null);

  useEffect(() => {

    const fetchTotalUser = async () => {
      try {
        const userTotal = await totalUser(accessToken);
        // console.log("totalUser:", userTotal);
        setUserTotal(userTotal);
      } catch (error) {
        console.error("Error fetching totalUser:", error);
      }
    };
    const fetchTotalEvent = async () => {
      try {
        const eventTotal = await totalEvents();
        // console.log("totalUser:", userTotal);
        setEventTotal(eventTotal);
      } catch (error) {
        console.error("Error fetching eventTotal:", error);
      }
    };

    fetchTotalUser();
    fetchTotalEvent();
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('DD-MM-YYYY HH:mm:ss'));
    }, 1000);
    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setAdminOrHospital(isAdmin);
      setName(adminProfile?.adminName);
    } else if (isHospital) {
      setAdminOrHospital(isHospital);
      setName(hospitalProfile?.hospitalName);
    }
  }, [isAdmin, isHospital, adminProfile, hospitalProfile]);


  return (
    <div className="container-scroller">
      {isAdminOrHospital ? (
        <>
          <Navbar />
          <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-md-12 grid-margin">
                    <div className="row">
                      <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                        <h3 className="font-weight-bold">Xin chào {name}</h3>
                        <h6 className="font-weight-normal mb-0">
                          Chúc bạn ngày mới tràn đầy năng lượng !
                          <span className="text-primary"></span>
                        </h6>
                      </div>
                      <div className="col-12 col-xl-4">
                        <div className="justify-content-end d-flex">
                          <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                            <button
                              className="btn btn-sm btn-light bg-white "
                              type="button"
                              disabled
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="mdi mdi-calendar" /> {currentTime}
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 grid-margin stretch-card">
                    <div className="card tale-bg">
                      <div className="card-people mt-auto">
                        <img src="images/dashboard/people.svg" alt="people" />
                        <div className="weather-info">
                          <div className="d-flex">
                            <div>
                              <h2 className="mb-0 font-weight-normal">
                                <i className="icon-sun mr-2" />

                              </h2>
                            </div>
                            <div className="ml-2">
                              <h4 className="location font-weight-normal">Tp.HCM</h4>
                              <h6 className="font-weight-normal">Việt Nam</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 grid-margin transparent">
                    <div className="row">
                      <div className="col-md-6 mb-4 stretch-card transparent">
                        <div className="card card-tale">
                          <div className="card-body">
                            <p className="mb-4">Tổng số người dùng</p>
                            <p className="fs-30 mb-2">{userTotal !== null ? userTotal : 'Loading...'}</p>

                            {/* <p className="fs-30 mb-2">{userTotal}</p> */}
                            {/* <p>10.00% (30 days)</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 stretch-card transparent">
                        <div className="card card-dark-blue">
                          <div className="card-body">
                            <p className="mb-4">Sự kiện</p>
                            <p className="fs-30 mb-2">{eventTotal !== null ? eventTotal : 'Loading...'}</p>
                            {/* <p>22.00% (30 days)</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                        <div className="card card-light-blue">
                          <div className="card-body">
                            <p className="mb-4">Số bệnh viện hợp tác</p>
                            <p className="fs-30 mb-2">7</p>
                            {/* <p>2.00% (30 days)</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 stretch-card transparent">
                        <div className="card card-light-danger">
                          <div className="card-body">
                            <p className="mb-4">Số lượng đăng ký sự kiện</p>
                            <p className="fs-30 mb-2">5</p>
                            {/* <p>0.22% (30 days)</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Dangnhap />
      )}
    </div>
  )
}

export default Dashboard;
