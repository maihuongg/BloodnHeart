import React from "react";
import { Link } from "react-router-dom";
function Blog() {
    return (
        <>
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
                                <Link to="/gallery" className="nav-item nav-link">
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
                                        <Link to="/blog" className="dropdown-item active">
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
            </>
            {/* Header Start */}
            <div className="container-fluid bg-primary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 400 }}
                >
                    <h3 className="display-3 font-weight-bold text-white">Our Blog</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="">
                                Home
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Our Blog</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Blog Start */}
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center pb-2">
                        <p className="section-title px-5">
                            <span className="px-2">Latest Blog</span>
                        </p>
                        <h1 className="mb-4">Latest Articles From Blog</h1>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-1.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-2.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-3.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-1.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-2.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 shadow-sm mb-2">
                                <img className="card-img-top mb-2" src="img/blog-3.jpg" alt="" />
                                <div className="card-body bg-light text-center p-4">
                                    <h4 className="">Diam amet eos at no eos</h4>
                                    <div className="d-flex justify-content-center mb-3">
                                        <small className="mr-3">
                                            <i className="fa fa-user text-primary" /> Admin
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-folder text-primary" /> Web Design
                                        </small>
                                        <small className="mr-3">
                                            <i className="fa fa-comments text-primary" /> 15
                                        </small>
                                    </div>
                                    <p>
                                        Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                                        eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                                        lorem. Tempor ipsum justo amet stet...
                                    </p>
                                    <a href="" className="btn btn-primary px-4 mx-auto my-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Blog End */}
        </>

    )
}
export default Blog;