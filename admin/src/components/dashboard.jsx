import React from "react";
import Footer from "./dashboard/footer";
import Navbar from "./dashboard/navbar";
import Sidebar from "./dashboard/sidebar";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Dangnhap from "./dangnhap";
import Panel from "./dashboard/panel";
import "../redux/adminSlice"
import "../redux/authSlice"
import { adminprofileFailed, adminprofileStart, adminprofileSuccess } from "../redux/adminSlice";
function Dashboard() {
  const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
  const accountId = currentAdmin?._id  
  const isAdmin = currentAdmin?.isAdmin;
  const accessToken = currentAdmin?.accessToken;
  // console.log("accessToken", accessToken);
  const adminProfile = useSelector((state) => state.admin.profile.getadmin);
  const adminanem =adminProfile?.adminName
  console.log("admin name", adminanem)

  return (
    <div className="container-scroller">
      {isAdmin ? (
        <>
          <Navbar />
          <Sidebar />

          <Footer />
        </>
      ) : (
        <Dangnhap />
      )}
    </div>
  );
}

export default Dashboard;
