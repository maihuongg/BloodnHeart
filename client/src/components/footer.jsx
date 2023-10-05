// import logo from './logo.svg';
// import './App.css'
import React from 'react'
function Footer() {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-secondary text-white mt-4 py-4 px-sm-3 px-md-5">
                <div className="row pt-5">
                    <div className="col-lg-4 col-md-6 mb-5">
                        <a
                            href=""
                            className="navbar-brand font-weight-bold text-primary"
                            style={{ fontSize: 40}}
                        >
                            <img src="img/logo.png" width="50px" height="50px"></img>
                            <span className="text-white"> BloodnHeart</span>
                        </a>
                        <p>
                            Hiến máu không làm bạn mất đi gì, nhưng nó có thể mang lại cuộc sống mới cho người khác.
                            Mỗi lần hiến máu, bạn không chỉ cứu sống một người, mà còn trao đi sự hi vọng và tình yêu thương. 
                            Một giọt máu hiến tặng, một cuộc đời được cứu. Hãy chung tay cứu người, chia sẻ yêu thương.
                        </p>
                        <div className="d-flex justify-content-start mt-4">
                            <a
                                className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            <a
                                className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a
                                className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-linkedin-in" />
                            </a>
                            <a
                                className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-5">
                        <h3 className="text-primary mb-4">Liên Lạc</h3>
                        <div className="d-flex">
                            <h4 className="fa fa-map-marker-alt text-primary" />
                            <div className="pl-3">
                                <h5 className="text-white">Địa chỉ</h5>
                                <p>Số 1 Võ Văn Ngân, phường Linh Chiểu, Tp.Thủ Đức, Tp.HCM</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <h4 className="fa fa-envelope text-primary" />
                            <div className="pl-3">
                                <h5 className="text-white">Email</h5>
                                <p>hangn3569@gmail.com</p>
                                <p>dangmaihuong1108@gmail.com</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <h4 className="fa fa-phone-alt text-primary" />
                            <div className="pl-3">
                                <h5 className="text-white">Số điện thoại</h5>
                                <p>0387229935</p>
                                <p>0795995352</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-5">
                        <h3 className="text-primary mb-4">Links</h3>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-white mb-2" href="/">
                                <i className="fa fa-angle-right mr-2" />
                                Trang chủ
                            </a>
                            <a className="text-white mb-2" href="/sukien">
                                <i className="fa fa-angle-right mr-2" />
                                Sự kiện
                            </a>
                            <a className="text-white mb-2" href="/lienhe">
                                <i className="fa fa-angle-right mr-2" />
                                Liên hệ
                            </a>
                            <a className="text-white mb-2" href="/hoso">
                                <i className="fa fa-angle-right mr-2" />
                                Hồ sơ cá nhân
                            </a>
                            <a className="text-white mb-2" href="gioithieu">
                                <i className="fa fa-angle-right mr-2" />
                                Giới thiệu
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-primary p-3 back-to-top">
                <i className="fa fa-angle-double-up" />
            </a>
        </>

    );
}

export default Footer;
