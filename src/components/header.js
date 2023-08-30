// import logo from './logo.svg';
// import './App.css'
import React from 'react'
function Header() {
    return (
        <>
            {/* Navbar Start */}
            <div className="container-fluid bg-light position-relative shadow">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
                    <a
                        href=""
                        className="navbar-brand font-weight-bold text-secondary"
                        style={{ fontSize: 50 }}
                    >
                        <i className="flaticon-043-teddy-bear" />
                        <span className="text-primary">KidKinder</span>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav font-weight-bold mx-auto py-0">
                            <a href="index.html" className="nav-item nav-link active">
                                Home
                            </a>
                            <a href="about.html" className="nav-item nav-link">
                                About
                            </a>
                            <a href="class.html" className="nav-item nav-link">
                                Classes
                            </a>
                            <a href="team.html" className="nav-item nav-link">
                                Teachers
                            </a>
                            <a href="gallery.html" className="nav-item nav-link">
                                Gallery
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    Pages
                                </a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="blog.html" className="dropdown-item">
                                        Blog Grid
                                    </a>
                                    <a href="single.html" className="dropdown-item">
                                        Blog Detail
                                    </a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">
                                Contact
                            </a>
                        </div>
                        <a href="" className="btn btn-primary px-4">
                            Join Class
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
        </>

    );
}

export default Header;
