// import logo from './logo.svg';
// import './App.css'
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/header';
// import Slider from './components/slider';
import Trangchu from './components/trangchu';
import Footer from './components/footer';
import Gioithieu from './components/gioithieu';
//import Blog from './components/blog';
import Sukien  from './components/sukien';
//import Teachers from './components/teacher';
//import Gallery from './components/gallery';
import Lienhe from './components/lienhe';
import Hoso from './components/hoso';
import Dangnhap from './components/dangnhap/dangnhap';
import Dangky from './components/dangky/dangky';
import ResetMatKhau from './components/quenmatkhau/reset-matkhau'
import QuenMatKhau from './components/quenmatkhau/quenmatkhau'
import DangkySukien from './components/dangkySukien';
import ChitietBenhvien from './components/chitietbenhvien';
import LichHen from './components/lichhen';
import LichSuHienMau from './components/lichsuhienmau';
import DiemThuong from './components/diemthuong';
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/lienhe" Component={Lienhe} />
        <Route path="/hoso" Component={Hoso} />
        <Route path="/gioithieu" Component= {Gioithieu} />
        {/*<Route path="/blog" Component= {Blog} />*/}
        <Route path="/sukien" Component= {Sukien} />
        {/*<Route path="/team" Component= {Teachers} />*/}
        {/*<Route path="/gallery" Component= {Gallery} />*/}
        <Route path="/dangnhap" Component= {Dangnhap} />
        <Route path="/dangky" Component= {Dangky} />
        <Route path="/reset-password/" Component= {ResetMatKhau} />
        <Route path="/forgot-password/" Component= {QuenMatKhau} />
        <Route path="/dangky-sukien" Component= {DangkySukien} />
        <Route path="/chitietbenhvien" Component= {ChitietBenhvien} />
        <Route path="/lichhen" Component= {LichHen} />
        <Route path="/lichsu" Component= {LichSuHienMau} />
        <Route path="/diemthuong" Component={DiemThuong} />

        <Route path="/" Component= {Trangchu} /> {/* Example of the Home route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
