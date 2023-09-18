// import logo from './logo.svg';
// import './App.css'
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/header';
// import Slider from './components/slider';
import Home from './components/home';
import Footer from './components/footer';
import About from './components/about';
import Blog from './components/blog';
import Event  from './components/event';
import Teachers from './components/teacher';
import Gallery from './components/gallery';
import Contact from './components/contact';
import Profile from './components/profile';
import login from './components/login/login';
import signUP from './components/signup/signup';
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/contact" Component={Contact} />
        <Route path="/profile" Component={Profile} />
        <Route path="/about" Component= {About} />
        <Route path="/blog" Component= {Blog} />
        <Route path="/event" Component= {Event} />
        <Route path="/team" Component= {Teachers} />
        <Route path="/gallery" Component= {Gallery} />
        <Route path="/login" Component= {login} />
        <Route path="/sign-up" Component= {signUP} />

        <Route path="/" Component= {Home} /> {/* Example of the Home route */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
