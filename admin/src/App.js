import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import Dangnhap from './components/dangnhap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NguoiDung from './components/quanly/nguoidung/nguoidung';
import SuKien from './components/quanly/sukien/sukien';
import ChinhSuaNguoiDung from './components/quanly/nguoidung/chinhsuanguoidung';
<<<<<<< Updated upstream
import ChiTietSuKien from './components/quanly/sukien/chitietsukien';
=======
import HopTac from './components/hoptac/hoptac';

>>>>>>> Stashed changes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dang-nhap" Component={Dangnhap} />
        <Route path="/" Component={Dangnhap} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/nguoi-dung" Component={NguoiDung} />
        <Route path="/nguoi-dung/chinh-sua/:id" Component={ChinhSuaNguoiDung} />
        <Route path="/su-kien" Component={SuKien} />
<<<<<<< Updated upstream
        <Route path="/su-kien/chi-tiet/:id" Component={ChiTietSuKien}/>
=======
        <Route path="/hop-tac" Component={HopTac} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
} 
export default App;
