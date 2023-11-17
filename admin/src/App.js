import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import Dangnhap from './components/dangnhap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NguoiDung from './components/quanly/nguoidung';
import SuKien from './components/quanly/sukien';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dang-nhap" Component={Dangnhap} />
        <Route path="/" Component={Dangnhap} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/nguoi-dung" Component={NguoiDung} />
        <Route path="/su-kien" Component={SuKien} />
      </Routes>
    </Router>
  );
} 
export default App;
