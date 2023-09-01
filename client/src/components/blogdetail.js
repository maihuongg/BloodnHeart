import React from "react";
import { Link } from "react-router-dom";
function BlogDetail() {
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
                                        <Link to="/blog" className="dropdown-item">
                                            Blog Grid
                                        </Link>
                                        <Link to="/single" className="dropdown-item active">
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
                    <h3 className="display-3 font-weight-bold text-white">Blog Detail</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0">
                            <a className="text-white" href="">
                                Home
                            </a>
                        </p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Blog Detail</p>
                    </div>
                </div>
            </div>
            {/* Header End */}
            {/* Detail Start */}
            <div className="container py-5">
                <div className="row pt-5">
                    <div className="col-lg-8">
                        <div className="d-flex flex-column text-left mb-3">
                            <p className="section-title pr-5">
                                <span className="pr-2">Blog Detail Page</span>
                            </p>
                            <h1 className="mb-3">Diam dolor est ipsum clita lorem</h1>
                            <div className="d-flex">
                                <p className="mr-3">
                                    <i className="fa fa-user text-primary" /> Admin
                                </p>
                                <p className="mr-3">
                                    <i className="fa fa-folder text-primary" /> Web Design
                                </p>
                                <p className="mr-3">
                                    <i className="fa fa-comments text-primary" /> 15
                                </p>
                            </div>
                        </div>
                        <div className="mb-5">
                            <img
                                className="img-fluid rounded w-100 mb-4"
                                src="img/detail.jpg"
                                alt="Image"
                            />
                            <p>
                                Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum
                                sit diam ut magna lorem. Nonumy vero labore lorem sanctus rebum et
                                lorem magna kasd, stet amet magna accusam consetetur eirmod. Kasd
                                accusam sit ipsum sadipscing et at at sanctus et. Ipsum sit
                                gubergren dolores et, consetetur justo invidunt at et aliquyam ut et
                                vero clita. Diam sea sea no sed dolores diam nonumy, gubergren sit
                                stet no diam kasd vero.
                            </p>
                            <p>
                                Voluptua est takimata stet invidunt sed rebum nonumy stet, clita
                                aliquyam dolores vero stet consetetur elitr takimata rebum sanctus.
                                Sit sed accusam stet sit nonumy kasd diam dolores, sanctus lorem
                                kasd duo dolor dolor vero sit et. Labore ipsum duo sanctus amet eos
                                et. Consetetur no sed et aliquyam ipsum justo et, clita lorem sit
                                vero amet amet est dolor elitr, stet et no diam sit. Dolor erat
                                justo dolore sit invidunt.
                            </p>
                            <h2 className="mb-4">Est dolor lorem et ea</h2>
                            <img
                                className="img-fluid rounded w-50 float-left mr-4 mb-3"
                                src="img/blog-1.jpg"
                                alt="Image"
                            />
                            <p>
                                Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
                                voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
                                kasd diam takimata justo diam lorem sed. Magna amet sed rebum eos.
                                Clita no magna no dolor erat diam tempor rebum consetetur, sanctus
                                labore sed nonumy diam lorem amet eirmod. No at tempor sea diam
                                kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren
                                at lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam
                                dolores at sadipscing stet. Clita dolor amet dolor ipsum vero ea ea
                                eos. Invidunt sed diam dolores takimata dolor dolore dolore sit. Sit
                                ipsum erat amet lorem et, magna sea at sed et eos. Accusam eirmod
                                kasd lorem clita sanctus ut consetetur et. Et duo tempor sea kasd
                                clita ipsum et. Takimata kasd diam justo est eos erat aliquyam et
                                ut. Ea sed sadipscing no justo et eos labore, gubergren ipsum magna
                                dolor lorem dolore, elitr aliquyam takimata sea kasd dolores diam,
                                amet et est accusam labore eirmod vero et voluptua. Amet labore
                                clita duo et no. Rebum voluptua magna eos magna, justo gubergren
                                labore sit voluptua eos.
                            </p>
                            <h3 className="mb-4">Est dolor lorem et ea</h3>
                            <img
                                className="img-fluid rounded w-50 float-right ml-4 mb-3"
                                src="img/blog-2.jpg"
                                alt="Image"
                            />
                            <p>
                                Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
                                voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
                                kasd diam takimata justo diam lorem sed. Magna amet sed rebum eos.
                                Clita no magna no dolor erat diam tempor rebum consetetur, sanctus
                                labore sed nonumy diam lorem amet eirmod. No at tempor sea diam
                                kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren
                                at lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam
                                dolores at sadipscing stet. Clita dolor amet dolor ipsum vero ea ea
                                eos. Invidunt sed diam dolores takimata dolor dolore dolore sit. Sit
                                ipsum erat amet lorem et, magna sea at sed et eos. Accusam eirmod
                                kasd lorem clita sanctus ut consetetur et. Et duo tempor sea kasd
                                clita ipsum et. Takimata kasd diam justo est eos erat aliquyam et
                                ut. Ea sed sadipscing no justo et eos labore, gubergren ipsum magna
                                dolor lorem dolore, elitr aliquyam takimata sea kasd dolores diam,
                                amet et est accusam labore eirmod vero et voluptua. Amet labore
                                clita duo et no.
                            </p>
                        </div>
                        {/* Related Post */}
                        <div className="mb-5 mx-n3">
                            <h2 className="mb-4 ml-3">Related Post</h2>
                            <div className="owl-carousel post-carousel position-relative">
                                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                                    <img
                                        className="img-fluid"
                                        src="img/post-1.jpg"
                                        style={{ width: 80, height: 80 }}
                                    />
                                    <div className="pl-3">
                                        <h5 className="">Diam amet eos at no eos</h5>
                                        <div className="d-flex">
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
                                    </div>
                                </div>
                                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                                    <img
                                        className="img-fluid"
                                        src="img/post-2.jpg"
                                        style={{ width: 80, height: 80 }}
                                    />
                                    <div className="pl-3">
                                        <h5 className="">Diam amet eos at no eos</h5>
                                        <div className="d-flex">
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
                                    </div>
                                </div>
                                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                                    <img
                                        className="img-fluid"
                                        src="img/post-3.jpg"
                                        style={{ width: 80, height: 80 }}
                                    />
                                    <div className="pl-3">
                                        <h5 className="">Diam amet eos at no eos</h5>
                                        <div className="d-flex">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Comment List */}
                        <div className="mb-5">
                            <h2 className="mb-4">3 Comments</h2>
                            <div className="media mb-4">
                                <img
                                    src="img/user.jpg"
                                    alt="Image"
                                    className="img-fluid rounded-circle mr-3 mt-1"
                                    style={{ width: 45 }}
                                />
                                <div className="media-body">
                                    <h6>
                                        John Doe{" "}
                                        <small>
                                            <i>01 Jan 2045 at 12:00pm</i>
                                        </small>
                                    </h6>
                                    <p>
                                        Diam amet duo labore stet elitr ea clita ipsum, tempor labore
                                        accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed
                                        sed eirmod ipsum. Gubergren clita aliquyam consetetur
                                        sadipscing, at tempor amet ipsum diam tempor consetetur at sit.
                                    </p>
                                    <button className="btn btn-sm btn-light">Reply</button>
                                </div>
                            </div>
                            <div className="media mb-4">
                                <img
                                    src="img/user.jpg"
                                    alt="Image"
                                    className="img-fluid rounded-circle mr-3 mt-1"
                                    style={{ width: 45 }}
                                />
                                <div className="media-body">
                                    <h6>
                                        John Doe{" "}
                                        <small>
                                            <i>01 Jan 2045 at 12:00pm</i>
                                        </small>
                                    </h6>
                                    <p>
                                        Diam amet duo labore stet elitr ea clita ipsum, tempor labore
                                        accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed
                                        sed eirmod ipsum. Gubergren clita aliquyam consetetur
                                        sadipscing, at tempor amet ipsum diam tempor consetetur at sit.
                                    </p>
                                    <button className="btn btn-sm btn-light">Reply</button>
                                    <div className="media mt-4">
                                        <img
                                            src="img/user.jpg"
                                            alt="Image"
                                            className="img-fluid rounded-circle mr-3 mt-1"
                                            style={{ width: 45 }}
                                        />
                                        <div className="media-body">
                                            <h6>
                                                John Doe{" "}
                                                <small>
                                                    <i>01 Jan 2045 at 12:00pm</i>
                                                </small>
                                            </h6>
                                            <p>
                                                Diam amet duo labore stet elitr ea clita ipsum, tempor
                                                labore accusam ipsum et no at. Kasd diam tempor rebum magna
                                                dolores sed sed eirmod ipsum. Gubergren clita aliquyam
                                                consetetur, at tempor amet ipsum diam tempor at sit.
                                            </p>
                                            <button className="btn btn-sm btn-light">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Comment Form */}
                        <div className="bg-light p-5">
                            <h2 className="mb-4">Leave a comment</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" className="form-control" id="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="website">Website</label>
                                    <input type="url" className="form-control" id="website" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        cols={30}
                                        rows={5}
                                        className="form-control"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="form-group mb-0">
                                    <input
                                        type="submit"
                                        defaultValue="Leave Comment"
                                        className="btn btn-primary px-3"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-5 mt-lg-0">
                        {/* Author Bio */}
                        <div className="d-flex flex-column text-center bg-primary rounded mb-5 py-5 px-4">
                            <img
                                src="img/user.jpg"
                                className="img-fluid rounded-circle mx-auto mb-3"
                                style={{ width: 100 }}
                            />
                            <h3 className="text-secondary mb-3">John Doe</h3>
                            <p className="text-white m-0">
                                Conset elitr erat vero dolor ipsum et diam, eos dolor lorem ipsum,
                                ipsum ipsum sit no ut est. Guber ea ipsum erat kasd amet est elitr
                                ea sit.
                            </p>
                        </div>
                        {/* Search Form */}
                        <div className="mb-5">
                            <form action="">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Keyword"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Category List */}
                        <div className="mb-5">
                            <h2 className="mb-4">Categories</h2>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <a href="">Web Design</a>
                                    <span className="badge badge-primary badge-pill">150</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <a href="">Web Development</a>
                                    <span className="badge badge-primary badge-pill">131</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <a href="">Online Marketing</a>
                                    <span className="badge badge-primary badge-pill">78</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <a href="">Keyword Research</a>
                                    <span className="badge badge-primary badge-pill">56</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <a href="">Email Marketing</a>
                                    <span className="badge badge-primary badge-pill">98</span>
                                </li>
                            </ul>
                        </div>
                        {/* Single Image */}
                        <div className="mb-5">
                            <img src="img/blog-1.jpg" alt="" className="img-fluid rounded" />
                        </div>
                        {/* Recent Post */}
                        <div className="mb-5">
                            <h2 className="mb-4">Recent Post</h2>
                            <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                                <img
                                    className="img-fluid"
                                    src="img/post-1.jpg"
                                    style={{ width: 80, height: 80 }}
                                />
                                <div className="pl-3">
                                    <h5 className="">Diam amet eos at no eos</h5>
                                    <div className="d-flex">
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
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                                <img
                                    className="img-fluid"
                                    src="img/post-2.jpg"
                                    style={{ width: 80, height: 80 }}
                                />
                                <div className="pl-3">
                                    <h5 className="">Diam amet eos at no eos</h5>
                                    <div className="d-flex">
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
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                                <img
                                    className="img-fluid"
                                    src="img/post-3.jpg"
                                    style={{ width: 80, height: 80 }}
                                />
                                <div className="pl-3">
                                    <h5 className="">Diam amet eos at no eos</h5>
                                    <div className="d-flex">
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
                                </div>
                            </div>
                        </div>
                        {/* Single Image */}
                        <div className="mb-5">
                            <img src="img/blog-2.jpg" alt="" className="img-fluid rounded" />
                        </div>
                        {/* Tag Cloud */}
                        <div className="mb-5">
                            <h2 className="mb-4">Tag Cloud</h2>
                            <div className="d-flex flex-wrap m-n1">
                                <a href="" className="btn btn-outline-primary m-1">
                                    Design
                                </a>
                                <a href="" className="btn btn-outline-primary m-1">
                                    Development
                                </a>
                                <a href="" className="btn btn-outline-primary m-1">
                                    Marketing
                                </a>
                                <a href="" className="btn btn-outline-primary m-1">
                                    SEO
                                </a>
                                <a href="" className="btn btn-outline-primary m-1">
                                    Writing
                                </a>
                                <a href="" className="btn btn-outline-primary m-1">
                                    Consulting
                                </a>
                            </div>
                        </div>
                        {/* Single Image */}
                        <div className="mb-5">
                            <img src="img/blog-3.jpg" alt="" className="img-fluid rounded" />
                        </div>
                        {/* Plain Text */}
                        <div>
                            <h2 className="mb-4">Plain Text</h2>
                            Aliquyam sed lorem stet diam dolor sed ut sit. Ut sanctus erat ea est
                            aliquyam dolor et. Et no consetetur eos labore ea erat voluptua et. Et
                            aliquyam dolore sed erat. Magna sanctus sed eos tempor rebum dolor,
                            tempor takimata clita sit et elitr ut eirmod.
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail End */}
        </>

    )
}
export default BlogDetail;