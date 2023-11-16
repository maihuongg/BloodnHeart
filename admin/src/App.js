import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import Dangnhap from './components/dangnhap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dang-nhap" Component={Dangnhap} />
        <Route path="/" Component={Dangnhap} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </Router>
  );
} 
export default App;
