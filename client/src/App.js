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
import Class  from './components/class';
import Teachers from './components/teacher';
import Gallery from './components/gallery';
import Contact from './components/contact';
import BlogDetail from './components/blogdetail';
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/contact" Component={Contact} />
        <Route path="/single" Component={BlogDetail} />
        <Route path="/about" Component= {About} />
        <Route path="/blog" Component= {Blog} />
        <Route path="/class" Component= {Class} />
        <Route path="/team" Component= {Teachers} />
        <Route path="/gallery" Component= {Gallery} />
        <Route path="/" Component= {Home} /> {/* Example of the Home route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
