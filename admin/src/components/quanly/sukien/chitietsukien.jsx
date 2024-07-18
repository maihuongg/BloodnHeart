import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../dashboard/navbar";
import Sidebar from "../../dashboard/sidebar";
import { useNavigate, useParams } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Table } from "antd";
import {
    eventdetailStart,
    eventdetailSuccess,
    eventdetailFailed
} from "../../../redux/eventSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import baseUrl from "../../../utils/constant";
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button, Box, Paper,
    Typography,
    TextField,
    MenuItem
} from '@mui/material';
function ChiTietSuKien() {

    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const accessToken = currentAdmin?.accessToken;
    const isHospital = currentAdmin?.isHospital;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector((state) => state.event.eventdetail.getevent);
    const { id } = useParams();
    // console.log("EventID: ", id);
    const data = event.listusers.user;
    const [images, setImages] = useState(event.images);
    const [eventName, setEventName] = useState(event.eventName);
    // const [date_start, setDate_start] = useState(moment(event.date_start).format('DD-MM-YYYY'));
    // const [date_end, setDate_end] = useState(moment(event.date_end).format('DD-MM-YYYY'));
    const [amount, setAmount] = useState(event.amount);
    const [address, setAddress] = useState(event.address);

    const [cccd, setCCCD] = useState("");
    const [fullName, setfullName] = useState("");
    const [gender, setgender] = useState("");
    const [birthDay, setbirthDay] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [address_user, setaddressuser] = useState("");
    const [bloodgroup, setbloodgroup] = useState("");
    const [reward, setReward] = useState(0);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [userid, setUserid] = useState("");
    const [status, setStatus] = useState("-1");
    const handleClose = () => setShow(false);
    const handleClose1 = () => {
        setShow1(false);
        setRefresh(true);
    }
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleShow4 = () => {
        setShow3(false);
        setShow4(true);
        setRefresh(false);
    }
    const handleClose4 = () => setShow4(false);
    const [dateRegister, setDateRegister] = useState("");
    const [amount_blood, setAmountblood] = useState(350);
    const [min, setMin] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [dataEventStatistic, setDataEventStatistic] = useState(null);
    const [eventDetailAmountBlood, setEventDetailAmountBlood] = useState(null)
    const [dataEventBlood, setDataEventBlood] = useState(null);
    const [date_start, setDate_start] = useState('');
    const [date_end, setDate_end] = useState('');

    const [activeStep, setActiveStep] = useState(1);
    const [bloodStatus, setBloodStatus] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (event && event.date_start) {
            setDate_start(moment(event.date_start).format('YYYY-MM-DD'));
        }
        if (event && event.date_end) {
            setDate_end(moment(event.date_end).format('YYYY-MM-DD'));
        }
    }, [event]);

    useEffect(() => {
        const currentDate = new Date();
        const minDate = new Date(event.date_start);
        if (currentDate < minDate) {
            setMin(new Date(event.date_start).toISOString().split('T')[0]);
        } else {
            setMin(new Date().toISOString().split('T')[0]);
        }
        console.log("date", min);
    }, [setMin]);

    useEffect(() => {
        if (refresh) {
            const fetchData = async () => {
                dispatch(eventdetailStart());
                try {
                    // Fetch event detail
                    const responseDetail = await fetch(`${baseUrl}/v1/hospital/detail/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!responseDetail.ok) {
                        dispatch(eventdetailFailed());
                    } else {
                        const dataDetail = await responseDetail.json();
                        dispatch(eventdetailSuccess(dataDetail));
                    }

                    // Fetch event statistics
                    const responseStatistic = await fetch(`${baseUrl}/v1/admin/statistic/event/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!responseStatistic.ok) {
                        console.log("fetchDataStatistic error");
                    } else {
                        const dataEventStatistic = await responseStatistic.json();
                        setDataEventStatistic(dataEventStatistic);
                    }

                    // Fetch event amount blood
                    const responseAmountBlood = await fetch(`${baseUrl}/v1/admin/statistic/event/amountblood/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!responseAmountBlood.ok) {
                        console.log("fetchDataAmountBlood error");
                    } else {
                        const dataAmountBlood = await responseAmountBlood.json();
                        setEventDetailAmountBlood(dataAmountBlood);
                    }
                } catch (error) {
                    dispatch(eventdetailFailed());
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
        const fetchData = async () => {
            dispatch(eventdetailStart());
            try {
                // Fetch event detail
                const responseDetail = await fetch(`${baseUrl}/v1/hospital/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseDetail.ok) {
                    dispatch(eventdetailFailed());
                } else {
                    const dataDetail = await responseDetail.json();
                    dispatch(eventdetailSuccess(dataDetail));
                }

                // Fetch event statistics
                const responseStatistic = await fetch(`${baseUrl}/v1/admin/statistic/event/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseStatistic.ok) {
                    console.log("fetchDataStatistic error");
                } else {
                    const dataEventStatistic = await responseStatistic.json();
                    setDataEventStatistic(dataEventStatistic);
                    setDataEventBlood(dataEventStatistic.countAmountBlood);
                    console.log(dataEventBlood);
                }

                // Fetch event amount blood
                const responseAmountBlood = await fetch(`${baseUrl}/v1/admin/statistic/event/amountblood/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!responseAmountBlood.ok) {
                    console.log("fetchDataAmountBlood error");
                } else {
                    const dataAmountBlood = await responseAmountBlood.json();
                    setEventDetailAmountBlood(dataAmountBlood);
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, dispatch, refresh]);

    // biểu đồ
    useEffect(() => {
        if (eventDetailAmountBlood) {
            const data = [
                eventDetailAmountBlood.detailAmountBlood['O'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['A'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['B'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['AB'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['Rh+'] ?? 0,
                eventDetailAmountBlood.detailAmountBlood['Rh-'] ?? 0
            ];
            // console.log("DATA DỬA: ", data)
            const labels = ['O', 'A', 'B', 'AB', 'Rh+', 'Rh-'];
            // Vẽ biểu đồ
            const barCtx = document.getElementById('barDetailBlood').getContext('2d');
            const newChartInstance = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Lượng máu (ml)',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                    },
                    responsive: true,

                },
            });

            // Cleanup function to destroy the chart when component unmounts or before creating a new one
            return () => {
                newChartInstance.destroy();
            };
        }
    }, [eventDetailAmountBlood]);
    const showNotification = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const showNotificationErr = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
            // position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const columns = [
        {
            title: "Tên người đăng ký",
            dataIndex: "username",
            key: "username",
            render: (text, record) => (
                <a className="nav-item nav-link" onClick={() => handleUserInfo(record.userid)}>{text}</a>
            )
        },
        {
            title: "Ngày hiến",
            dataIndex: "dateregister",
            key: "dateregister",
            render: (text, record) => (
                moment(text).format('DD-MM-YYYY')
            ),
        },
        {
            title: "Nhóm máu",
            dataIndex: "bloodgroup",
            key: "bloodgroup",
        },
        {
            title: "Trạng thái",
            dataIndex: "status_user",
            key: "status_user",
            render: (text, record) => {
                const status = record.status_user;

                if (status === "-1") {
                    return <span style={{ color: 'red' }}>Chưa hiến</span>;
                } else {
                    if (status === "0") {
                        return <span style={{ color: 'blue' }}>Đang chờ hiến</span>;
                    } else {
                        if (status === "1") {
                            return <span style={{ color: 'blue' }}>Đã hiến</span>;
                        } else {
                            return <span>Không xác định</span>;
                        }
                    }
                }
            }
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                const status = record.status_user;
                if (status === "1") {
                    return <span style={{ color: 'blue' }}>Hiến thành công</span>;
                } else {
                    if (status === "-1" || status === "0") {
                        return (
                            <a className="btn btn-sm btn-primary btn-icon-prepend text-white"
                                onClick={() => handleOpenModal(record.userid)}>Cập nhật</a>
                        )
                    } else {
                        return <span>Không xác định</span>;
                    }
                }

            }
        }

    ]

    const onChange = e => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImages(base64Image);
                // console.log('imageform', base64Image);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleUserInfo = async (userid) => {
        try {
            const response = await fetch(`${baseUrl}/v1/hospital/userprofile/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            if (!response.ok) {
                console.log("error");
            } else {
                const data = await response.json();
                setCCCD(data.user.cccd);
                setfullName(data.user.fullName);
                setgender(data.user.gender);
                setbirthDay(data.user.birthDay);
                setphone(data.user.phone);
                setemail(data.user.email);
                setaddressuser(data.user.address);
                setbloodgroup(data.user.bloodgroup);
                setReward(data.user.reward);
                setShow(true);
            }
        } catch (error) {
            console.log("error");
        }
    }

    const handleUpdateImage = async (e) => {
        e.preventDefault();
        if (isHospital) {
            dispatch(eventdetailStart());
            try {
                console.log("image", images)
                const formData = new FormData();
                formData.append('images', images);
                console.log("formdata", formData);
                const response = await fetch(`${baseUrl}/v1/hospital/update-image/${id}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
                console.log(response)
                if (!response.ok) {
                    showNotificationErr("Cập nhật thất bại!");
                    dispatch(eventdetailFailed());
                } else {
                    const data = await response.json();
                    dispatch(eventdetailSuccess(data));
                    showNotification('Đã thay đổi avatar thành công!');

                }
            } catch (error) {
                dispatch(eventdetailFailed());
                showNotificationErr("Cập nhật thất bại!");
            }
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }

    const handleOpenModal = async (userId) => {
        setUserid(userId);
        console.log("UserID selected: ", userId)
        setRefresh(false);
        setShow1(true);
        try {
            const response1 = await fetch(`${baseUrl}/v1/hospital/find-user-in-event/?eventId=${id}&userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response1.ok) {
                const err = await response1.json();
                // showNotificationErr(err.message);
            } else {
                const dataUserProfile = await response1.json();
                console.log('dataUserProfile:', dataUserProfile)

                const blood_status = dataUserProfile.blood_status;
                console.log(' blood_status: ', blood_status)
                setBloodStatus(blood_status);

                const status_user = dataUserProfile.status_user;
                if (blood_status == null)
                    setActiveStep(0);
                if (bloodStatus == 0) {
                    setActiveStep(1); // Directly set to end step if not qualified
                }
                if (blood_status == 1 && status_user == -1) {
                    setActiveStep(1);
                }
                if (blood_status == 1 && status_user == 0) {
                    setActiveStep(2);
                }
                if (blood_status == 1 && status_user == 1) {
                    setActiveStep(3);
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    const fetchUserData = async () => {
        if (!userid) return;

        try {
            const response1 = await fetch(`${baseUrl}/v1/hospital/find-user-in-event/?eventId=${id}&userId=${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response1.ok) {
                const err = await response1.json();
                console.error(err.message);
            } else {
                const dataUserProfile = await response1.json();
                const blood_status = dataUserProfile.blood_status;
                console.log("blood_status:", blood_status)
                const status_user = dataUserProfile.status_user;
                setBloodStatus(blood_status)
                if (blood_status == null) setActiveStep(0);
                else if (blood_status === 0) setActiveStep(1); // Directly set to step 1 if not qualified
                else if (blood_status === 1 && status_user === -1) setActiveStep(1);
                else if (blood_status === 1 && status_user === 0) setActiveStep(2);
                else if (blood_status === 1 && status_user === 1) setActiveStep(3);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userid, refresh, show1]);
    const handleUpdate = async () => {
        const update = {
            eventId: id,
            userId: userid,
            status: status,
        }
        if (isHospital) {
            try {
                const response1 = await fetch(`${baseUrl}/v1/hospital/update-status1`, {
                    method: 'PUT',
                    body: JSON.stringify(update),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response1.ok) {
                    const err = await response1.json();
                    showNotificationErr(err.message);
                } else {
                    const data1 = await response1.json();
                    showNotification(data1.message);
                    setShow1(false);
                    setRefresh(true);
                }
            } catch (error) {

                showNotificationErr("Cập nhật thất bại!");
            }
        } else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }

    const handleUploadInfo = async (e) => {
        e.preventDefault();
        if (isHospital) {
            try {
                const newInfo = {
                    eventName: eventName,
                    date_start: date_start,
                    date_end: date_end,
                    amount: amount,
                    address: address
                }
                console.log("NewInfo: ", newInfo)
                const response = await fetch(`${baseUrl}/v1/hospital/update-profile/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newInfo),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    showNotificationErr("Cập nhật thất bại!");
                    dispatch(eventdetailFailed());
                } else {
                    const data = await response.json();
                    dispatch(eventdetailSuccess(data));
                    navigate(`/su-kien/chi-tiet/${id}`);
                    showNotification('Đã thay đổi thông tin thành công!');
                }
            } catch (error) {
                dispatch(eventdetailFailed());
                showNotificationErr("Cập nhật thất bại!");
            }
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }
    const handleGoBack = () => {
        navigate("/su-kien");
    };
    const handleExport = () => {
        if (isHospital) {
            const wb = XLSX.utils.book_new();
            const exportData = data.map(item => ({
                'Tên người đăng ký': item.username,
                'Ngày đăng ký hiến máu': item.dateregister,
                'Nhóm máu': item.bloodgroup,
                'Trạng thái': item.status_user === "1" ? 'Đã hiến' : item.status_user === "0" ? 'Đang chờ' : 'Chưa hiến',
                'Số lượng máu (ml)': item.amount_blood,
            }));
            const ws = XLSX.utils.json_to_sheet(exportData);
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách đăng ký sự kiện')

            // Tạo file Excel và tải xuống
            XLSX.writeFile(wb, 'danhsachdangkysukien.xlsx');
        }
        else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")

    };
    // STEPPER
    const steps = [
        {
            label: 'Kiểm tra tiêu chuẩn máu',
            description: `Đang kiểm tra chất lượng máu của người hiến.`,
        },
        {
            label: 'Đang chờ hiến máu',
            description: 'Người dùng đang chờ để hiến máu.',
        },
        {
            label: 'Đang hiến máu',
            description: 'Người dùng đang hiến máu.',
        },
        {
            label: 'Đã hiến máu xong',
            description: 'Người dùng đã hoàn thành quá trình hiến máu.',
        },
    ];

    const handleNext = async (e) => {

        // 
        if (activeStep === 0) {
            // Gọi API để cập nhật blood_status và description
            try {
                const updateBloodStatus = {
                    eventId: id,
                    userId: userid,
                    bloodStatus: bloodStatus,
                    description: description,
                }
                const response = await fetch(`${baseUrl}/v1/hospital/update-blood-status`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', token: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updateBloodStatus),
                });
                if (!response.ok) {
                    throw new Error('Cập nhật không thành công');
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } catch (error) {
                console.error('Lỗi khi cập nhật:', error);
                // Xử lý lỗi khi cập nhật không thành công
            }
        }
        if (activeStep === 1) {
            // 
            try {
                const updateCheckinData = {
                    eventId: id,
                    userId: userid,
                    checkin_time: new Date(), // Assuming this is the current time
                    status_user: 0, // Assuming this is the status update value
                };

                const response = await fetch(`${baseUrl}/v1/hospital/update-checkin`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', token: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updateCheckinData),
                });

                if (!response.ok) {
                    throw new Error('Cập nhật không thành công');
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } catch (error) {
                console.error('Lỗi khi cập nhật:', error);
                // Xử lý lỗi khi cập nhật không thành công
            }
        }
        if (activeStep === 2) {
            // 
            try {
                const updateCheckoutData = {
                    eventId: id,
                    userId: userid,
                    checkout_time: new Date(), // Assuming this is the current time
                    status_user: 1, // Assuming this is the status update value
                };

                const response = await fetch(`${baseUrl}/v1/hospital/update-checkout`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', token: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updateCheckoutData),
                });

                if (!response.ok) {
                    throw new Error('Cập nhật không thành công');
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } catch (error) {
                console.error('Lỗi khi cập nhật:', error);
                // Xử lý lỗi khi cập nhật không thành công
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleAddUserNotAccount = async (e) => {
        e.preventDefault();
        if (isHospital) {
            const user = {
                cccd: cccd,
                fullName: fullName,
                gender: gender,
                birthDay: birthDay,
                bloodgroup: bloodgroup,
                address: address_user,
                email: email,
                phone: phone
            };
            try {
                const response = await fetch(`${baseUrl}/v1/hospital/addusernotaccount`, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
    
                if (!response.ok) {
                    showNotificationErr("Đăng ký thất bại!");
                } else {
                    const data = await response.json();
                    setUserid(data._id);
                    setShow3(true);
                }
            } catch (error) {
                showNotificationErr("Đăng ký thất bại!");
            }
        } else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")
    }
    const handleRegisterEvent = async (e) => {
        e.preventDefault();
        if (isHospital) {
            const register = {
                eventId: event._id,
                userId: userid,
                bloodGroup: bloodgroup,
                dateRegister: dateRegister,
                amount_blood: amount_blood,
            };
            try {
                const response = await fetch(`${baseUrl}/v1/hospital/event/register`, {
                    method: 'POST',
                    body: JSON.stringify(register),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    const err = await response.json();
                    setShow(false);
                    showNotificationErr(err.message);
                } else {
                    setShow4(false);
                    setRefresh(true);
                    showNotification("Đăng ký thành công!");
                }
            } catch (error) {
                showNotificationErr("Đăng ký thất bại!");
            }

        } else showNotificationErr("Chức năng chỉ dành cho bệnh viện hợp tác !")

    }
    return (
        <>
            <div className="container-scroller">
                <Navbar></Navbar>
                <div className="container-fluid page-body-wrapper">
                    <Sidebar></Sidebar>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <i
                                className="mdi mdi-keyboard-backspace"
                                style={{ fontSize: "24px", padding: "5px" }}
                                onClick={handleGoBack}
                            ></i>
                            <br />
                            <br /> <h3>Chỉnh sửa sự kiện </h3>
                            <br />
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body text-center">
                                            <form onSubmit={handleUpdateImage}>
                                                <br />
                                                <br />
                                                <img
                                                    src={images}
                                                    alt="Profile Image"
                                                    className="img-fluid rounded-circle"
                                                    style={{ width: "200px", height: "200px" }}
                                                />
                                                <h4 className="card-title mt-10"></h4>
                                                <p className="card-description">Ảnh sự kiện</p>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        className="custom-file-input"
                                                        required="required"
                                                        accept="image/*"
                                                        onChange={onChange}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">
                                                        Chọn ảnh
                                                    </label>
                                                </div>
                                                <button className="btn btn-primary mt-2" type="submit" disabled={!images}>
                                                    Lưu ảnh
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <form className="forms-sample" onSubmit={handleUploadInfo}>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Tên Sự kiện</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="VD: Sự kiện A"
                                                        defaultValue={event.eventName}
                                                        onChange={(e) => setEventName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Ngày bắt đầu sự kiện</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={date_start}

                                                        // defaultValue={moment(event.date_start).format('DD-MM-YYYY')}
                                                        onChange={(e) => setDate_start(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Ngày kết thúc sự kiện</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={date_end}

                                                        // defaultValue={moment(event.date_end).format('DD-MM-YYYY')}
                                                        onChange={(e) => setDate_end(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Số lượng đăng ký tối đa</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="VD: 200"
                                                        defaultValue={event.amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <label className="form-control-label">Địa chỉ diễn ra sự kiện</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Vui lòng nhập địa chỉ diễn ra sự kiện"
                                                        defaultValue={event.address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-10 form-group">
                                                    <button type="submit" className="btn btn-primary mr-2">
                                                        Lưu lại
                                                    </button>
                                                    <button className="btn btn-light" >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* THỐNG KÊ TỪNG SỰ KIỆN */}
                            <div className="col-lg-12">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <br />
                                        <h3>Thống kê về sự kiện</h3>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-green text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Tổng số người đăng ký</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.total ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-danger text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Chưa hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.chuahien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đang chờ hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.danghien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-dark-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đã hoàn thành hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUser?.daxong ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-green text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Tổng số người đăng ký trên hệ thống</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.usersWithAccountId ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-danger text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Chưa hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserAccount?.chuahien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đang chờ hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserAccount?.danghien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-dark-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đã hoàn thành hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserAccount?.daxong ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-green text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Tổng số người đăng ký vãng lai</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.usersWithNonAccountId ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-danger text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Chưa hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserNotAccount?.chuahien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-light-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đang chờ hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserNotAccount?.danghien ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-2 stretch-card transparent">
                                                <div className="card card-dark-blue text-center">
                                                    <div className="card-body">
                                                        <h5 className="mb-2">Đã hoàn thành hiến máu</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countStatusUserNotAccount?.daxong ?? 'Loading...'}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <h3>Thống kê chung về lượng máu</h3><br />
                                        <div className="row">
                                            <div className="col-md-6 mb-2 stretch-card transparent">
                                                <div className="card card-inverse-info text-center">
                                                    <div className="card-body d-flex justify-content-between align-items-center">
                                                        <h5 className="mb-2">Số lượng máu dự kiến nhận được</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countAmountBlood?.dukiennhanduoc ?? 'Loading...'} ml</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-2 stretch-card transparent">
                                                <div className="card card-inverse-success text-center">
                                                    <div className="card-body d-flex justify-content-between align-items-center ">
                                                        <h5 className="mb-2">Số lượng máu thực tế nhận được</h5>
                                                        <h3 className="fs-30">{dataEventStatistic?.countAmountBlood?.thucte ?? 'Loading...'} ml</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <br />
                                        <h3>Thống kê chi tiết lượng máu</h3><br />

                                        <div className="row justify-content-center">
                                            <div className="col-lg-8">
                                                <div className="card" style={{ height: "100%" }}>
                                                    <div className="card-body">
                                                        <canvas id="barDetailBlood"></canvas>
                                                        {/* <canvas ref={chartRef}></canvas> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="col-lg-12">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <div className="row align-items-center mx-auto">
                                            <h3>Danh sách người đăng ký sự kiện</h3>
                                            <div style={{ marginLeft: "500px" }}>
                                                <button type="button" onClick={handleShow2} class="btn btn-outline-primary btn-icon-text mx-2">
                                                    <i class="mdi mdi-file-export btn-icon-prepend" fontSize={24}></i>
                                                    Thêm đăng ký
                                                </button>
                                                <button type="button" onClick={handleExport} class="btn btn-outline-success btn-icon-text">
                                                    <i class="mdi mdi-magnify btn-icon-prepend" fontSize={24}></i>
                                                    Export to Excel
                                                </button>
                                            </div>
                                        </div>
                                        <br />

                                        <Table
                                            dataSource={data}
                                            columns={columns}
                                            rowKey="_id"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Thông tin người đăng ký</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        CCCD/CMND:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{cccd}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Họ và tên:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{fullName}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Giới tính:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{gender}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Ngày sinh:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{moment(birthDay).format('DD-MM-YYYY')}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Nhóm máu:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{bloodgroup}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Địa chỉ liên lạc:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{address_user}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Email:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{email}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Số điện thoại:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{phone}</p>
                                                </div>
                                            </div>
                                            <div className="row padding">
                                                <div className="col-lg-5">
                                                    <li>
                                                        Điểm thưởng:
                                                    </li>
                                                </div>
                                                <div className="col-lg-7 break">
                                                    <p style={{ margin: "0px 0px 0px" }}>{reward}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <div>
                                        <a variant="secondary" className="float-right" onClick={handleClose}>
                                            Quay lại
                                        </a>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cập nhật trạng thái người dùng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <div className="row padding">
                                                <div className="col-lg-4">
                                                    <label>Chọn trạng thái:</label>
                                                </div>
                                                <select name="status" required defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="-1">Chưa hiến</option>
                                                    <option value="0">Đang chờ hiến</option>
                                                    <option value="1">Đã hiến</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* stepp cũ  */}
                                    <div>
                                        <Stepper activeStep={activeStep} orientation="vertical">
                                            {steps.map((step, index) => (
                                                <Step key={step.label}>
                                                    <StepLabel>{step.label}</StepLabel>
                                                    <StepContent>
                                                        <Typography>{step.description}</Typography>
                                                        {index === 0 && (
                                                            <>
                                                                <TextField
                                                                    select
                                                                    label="Chọn trạng thái máu"
                                                                    value={bloodStatus}
                                                                    onChange={(e) => setBloodStatus(e.target.value)}
                                                                    fullWidth
                                                                    margin="normal"
                                                                >
                                                                    <MenuItem value="1">Máu đạt tiêu chuẩn</MenuItem>
                                                                    <MenuItem value="0">Máu không đạt tiêu chuẩn</MenuItem>
                                                                </TextField>
                                                                {bloodStatus === '0' && (
                                                                    <TextField
                                                                        select
                                                                        label="Lý do không đạt tiêu chuẩn"
                                                                        value={description}
                                                                        onChange={(e) => setDescription(e.target.value)}
                                                                        fullWidth
                                                                        margin="normal"
                                                                    >
                                                                        <MenuItem value="Vừa uống rượu, bia">Vừa uống rượu, bia</MenuItem>
                                                                        <MenuItem value="Có các bệnh mãn tính">Có các bệnh mãn tính</MenuItem>
                                                                        <MenuItem value="Đang mắc các bệnh cấp tính">Đang mắc các bệnh cấp tính</MenuItem>
                                                                        <MenuItem value="Đã nhiễm nhiễm HIV, viêm gan B, C">Đã nhiễm nhiễm HIV, viêm gan B, C</MenuItem>
                                                                        <MenuItem value="Có nguy cơ cao lây nhiễm HIV, viêm gan B, C">Có nguy cơ cao lây nhiễm HIV, viêm gan B, C</MenuItem>
                                                                        <MenuItem value="Nghiện ma túy">Nghiện ma túy</MenuItem>
                                                                        <MenuItem value="Có quan hệ tình dục không an toàn">Có quan hệ tình dục không an toàn</MenuItem>
                                                                        <MenuItem value="Nam giới có quan hệ tình dục với người cùng giới khác">Nam giới có quan hệ tình dục với người cùng giới khác</MenuItem>
                                                                        <MenuItem value="Người đang bị bệnh thiếu máu">Người đang bị bệnh thiếu máu</MenuItem>
                                                                    </TextField>
                                                                )}
                                                            </>
                                                        )}

                                                        {(activeStep === 0 || (activeStep === 1 && bloodStatus !== '0') || (bloodStatus !== '0')) && (
                                                            <div style={{ marginTop: 12 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={handleNext}
                                                                    style={{ marginRight: 8 }}
                                                                >
                                                                    {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                                                                </Button>

                                                            </div>
                                                        )}

                                                        {activeStep === 1 && bloodStatus === '0' && (
                                                            <Typography variant="h8" color="error">
                                                                Không đủ điều kiện hiến máu
                                                            </Typography>
                                                        )}
                                                        <div style={{ marginTop: 12 }}>
                                                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                                                Quay lại
                                                            </Button></div>
                                                    </StepContent>
                                                </Step>
                                            ))}
                                        </Stepper>

                                        {activeStep === steps.length - 1 && (
                                            // <Paper square elevation={0} style={{ padding: 20, textAlign: 'center' }}>
                                            //     <Typography variant="h8" gutterBottom>
                                            //         Quá trình hoàn thành
                                            //     </Typography>


                                            //     <Button
                                            //         variant="contained"
                                            //         color="primary"
                                            //         onClick={handleReset}
                                            //         style={{ marginLeft: 10 }}
                                            //     >
                                            //         Đặt lại
                                            //     </Button>

                                            // </Paper>
                                            <Paper square elevation={0} style={{ padding: 20, textAlign: 'center' }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {bloodStatus === '0' ? 'Không đủ tiêu chuẩn hiến máu' : 'Quá trình hoàn thành'}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleReset}
                                                    style={{ marginTop: 20 }}
                                                >
                                                    Đặt lại
                                                </Button>

                                            </Paper>
                                        )}
                                    </div>


                                    <br />
                                    <div>
                                        <a className="btn btn-sm btn-primary btn-icon-prepend text-white float-right" onClick={handleClose1}>
                                            Hủy
                                        </a>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Điền thông tin người đăng ký</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={handleAddUserNotAccount}>
                                        <div className="form-group">
                                            <label className="form-control-label label">CCCD/CMND/Số định danh</label>
                                            <input
                                                type="text"
                                                className="form-control border-1"
                                                required="required"
                                                onChange={(e) => setCCCD(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Họ và tên(*)</label>
                                            <input
                                                type="text"
                                                className="form-control border-1"
                                                placeholder="VD: Nguyễn Văn A"
                                                required="required"
                                                onChange={(e) => setfullName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Ngày sinh(*)</label>
                                            <input
                                                type="date"
                                                className="form-control border-1"
                                                onChange={(e) => setbirthDay(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Giới tính(*)</label>
                                            <select className="form-control" name="gender" required onChange={(e) => setgender(e.target.value)}>
                                                <option value="" disabled selected>Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Nhóm máu(*)</label>
                                            <p style={{ margin: "0px 0px 0px", fontStyle: "italic" }}>Chọn 1 trong các nhóm A, B, AB, O, Rh+, Rh-</p>
                                            <p style={{ margin: "0px 0px 0px", fontStyle: "italic" }}>Nếu chưa biết nhóm máu vui lòng chọn "Không rõ"</p>
                                            <select className="form-control" name="bloodType" required onChange={(e) => setbloodgroup(e.target.value)}>
                                                <option value="" disabled selected>Chọn nhóm máu</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="AB">AB</option>
                                                <option value="O">O</option>
                                                <option value="Rh+">Rh+</option>
                                                <option value="Rh-">Rh-</option>
                                                <option value="Không rõ">Không rõ</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Địa chỉ liên lạc</label>
                                            <input
                                                type="text"
                                                className="form-control border-1"
                                                placeholder="VD: Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM"
                                                required="required"
                                                onChange={(e) => setaddressuser(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Số điện thoại</label>
                                            <input
                                                type="number"
                                                className="form-control border-1"
                                                placeholder="VD: 0303030303"
                                                required="required"
                                                onChange={(e) => setphone(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control border-1"
                                                placeholder="VD: a@gmail.com"
                                                required="required"
                                                onChange={(e) => setemail(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Button variant="contained" color="primary" type="submit" className="float-right" onClick={handleClose2}>
                                                Tiếp tục
                                            </Button>
                                            <Button variant="contained" color="secondary" className="float-right btnclose mx-2" onClick={handleClose2}>
                                                Hủy
                                            </Button>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                            <Modal show={show3} onHide={handleClose3}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Đăng ký tham gia sự kiện</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="infor_box">
                                        <div className="row padding">
                                            <div className="col-lg-4">
                                                <label>Chọn Ngày:</label>
                                            </div>
                                            <input
                                                type="date"
                                                className="form-control border-1"
                                                placeholder="VD: 01/01/2000"
                                                required="required"
                                                min={min}
                                                max={(new Date(event.date_end)).toISOString().split('T')[0]}
                                                style={{ width: 500 }}
                                                onChange={(e) => setDateRegister(e.target.value)}
                                            />
                                        </div>
                                        <br />
                                        <div className="row padding">
                                            <div className="col-lg-4">
                                                <label>Chọn lượng máu:</label>
                                            </div>
                                            <select name="amount_blood" required defaultValue={amount_blood} onChange={(e) => setAmountblood(e.target.value)}>
                                                <option value={350}>350 ml</option>
                                                <option value={250}>250 ml</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Button variant="contained" color="primary" className=" btn-primary float-right" onClick={handleShow4}>
                                                Tiếp tục
                                            </Button>
                                            <Button variant="contained" color="secondary" className="float-right btn-secondary mx-2" onClick={handleClose3}>
                                                Hủy
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            <Modal show={show4} onHide={handleClose4}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Xác thực thông tin đăng ký</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="infor_box">
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    CCCD/CMND:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{cccd}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Họ và tên:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{fullName}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Giới tính:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{gender}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Ngày sinh:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{moment(birthDay).format('DD-MM-YYYY')}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Nhóm máu:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{bloodgroup}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Địa chỉ liên lạc:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{address_user}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Email:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{email}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Số điện thoại:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{phone}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Sự kiện đăng ký:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{event.eventName}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Ngày đăng ký hiến máu:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{moment(dateRegister).format('DD-MM-YYYY')}</p>
                                            </div>
                                        </div>
                                        <div className="row padding">
                                            <div className="col-lg-5">
                                                <li>
                                                    Lượng máu đăng ký hiến:
                                                </li>
                                            </div>
                                            <div className="col-lg-7 break">
                                                <p style={{ margin: "0px 0px 0px" }}>{amount_blood} ml</p>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <br />
                                    <div>
                                        <Button variant="contained" color="primary" type="button" className="float-right" onClick={handleRegisterEvent}>
                                            Xác nhận
                                        </Button>
                                        <Button variant="contained" color="secondary" className="float-right mx-2" onClick={handleClose4}>
                                            Hủy
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div >
            </div >
            <ToastContainer></ToastContainer>
        </>
    )
};

export default ChiTietSuKien;

// const [eventChuaHien, setEventChuaHien] = useState(null);
// const [eventDangHien, setEventDangHien] = useState(null);
// const [eventDaHien, setEventDaHien] = useState(null);
// useEffect(() => {
//     if (refresh) {
//         const fetchData = async () => {
//             dispatch(eventdetailStart());
//             try {
//                 const response = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (!response.ok) {
//                     dispatch(eventdetailFailed());
//                 }
//                 else {
//                     const data = await response.json();
//                     dispatch(eventdetailSuccess(data));
//                 }
//             } catch (error) {
//                 dispatch(eventdetailFailed());
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }
//     const fetchData = async () => {
//         dispatch(eventdetailStart());
//         try {
//             const response = await fetch(`http://localhost:8000/v1/hospital/detail/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 dispatch(eventdetailFailed());
//             }
//             else {
//                 const data = await response.json();
//                 dispatch(eventdetailSuccess(data));
//             }
//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     };
//     fetchData();
// }, [id, dispatch, refresh]);
// useEffect(() => {
//     const fetchDataStatistic = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/v1/admin/statistic/event/${id}`, {

//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 console.log("fetchDataStatistic error")
//             }

//             const dataEventStatistic = await response.json();
//             // console.log("dataEventStatistic : ", dataEventStatistic);
//             setDataEventStatistic(dataEventStatistic);
//             // setEventDetailAmountBlood(dataEventStatistic.detailAmountBlood);

//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     }
//     const fetchDataAmountBlood = async () => {
//         try {
//             const responseBlood = await fetch(`http://localhost:8000/v1/admin/statistic/event/amountblood/${id}`, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!responseBlood.ok) {
//                 console.log("fetchDataStatistic error")
//             }
//             const dataAmountBlood = await responseBlood.json();
//             // console.log("dataEventStatistic : ", dataAmountBlood);
//             setEventDetailAmountBlood(dataAmountBlood);

//         } catch (error) {
//             dispatch(eventdetailFailed());
//             console.error("Error fetching data:", error);
//         }
//     }
//     fetchDataStatistic();
//     fetchDataAmountBlood();
// })