import React from "react";
import { Link } from "react-router-dom";
function Gallery() {
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
                        <img src="img/logo.png"></img>
                        <span className="text-primary" style={{ fontSize: 40 }}> BloodnHeart</span>
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
                            <Link to="/" className="nav-item nav-link">
                                Home
                            </Link>
                            <Link to="/about" className="nav-item nav-link">
                                About
                            </Link>
                            <Link to="/class" className="nav-item nav-link">
                                Classes
                            </Link>
                            <Link to="/team" className="nav-item nav-link">
                                Teachers
                            </Link>
                            <Link to="/gallery" className="nav-item nav-link active">
                                Gallery
                            </Link>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    Pages
                                </a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/blog" className="dropdown-item">
                                        Blog Grid
                                    </Link>
                                    <Link to="/single" className="dropdown-item">
                                        Blog Detail
                                    </Link>
                                </div>
                            </div>
                            <Link to="/contact" className="nav-item nav-link">
                                Contact
                            </Link>
                        </div>
                        <a href="" className="btn btn-primary px-4">
                            Join Class
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h3 className="display-3 font-weight-bold text-white">Gallery</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="">
                                Home
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Gallery</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Gallery Start */}
            <div className="container-fluid pt-5 pb-3">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Our Gallery</span>
                        </p>
                        <h1 className="mb-4">Our Kids School Gallery</h1>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mb-2">
                            <ul className="list-inline mb-4" id="portfolio-flters">
                                <li className="btn btn-outline-primary m-1 active" data-filter="*">
                                    All
                                </li>
                                <li className="btn btn-outline-primary m-1" data-filter=".first">
                                    Playing
                                </li>
                                <li className="btn btn-outline-primary m-1" data-filter=".second">
                                    Drawing
                                </li>
                                <li className="btn btn-outline-primary m-1" data-filter=".third">
                                    Reading
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row portfolio-container">
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-1.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-1.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-2.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-2.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-3.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-3.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-4.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-4.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-5.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-5.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
                            <div className="position-relative overflow-hidden mb-2">
                                <img className="img-fluid w-100" src="img/portfolio-6.jpg" alt="" />
                                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                                    <a href="img/portfolio-6.jpg" data-lightbox="portfolio">
                                        <i className="fa fa-plus text-white" style={{ fontSize: 60 }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gallery End */}
        </>

    );
}
export default Gallery;