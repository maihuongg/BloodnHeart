// import logo from './logo.svg';
// import './App.css'
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slider from './components/slider';
import Home from './components/home';
import Footer from './components/footer';
import About from './components/about';
function App() {
  return (
    <Router>
      <Header />
      <Slider />
      {/* <Home/> */}
      <Routes>
        <Route path="/about" Component= {About} />
        <Route path="/" Component= {Home} /> {/* Example of the Home route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
