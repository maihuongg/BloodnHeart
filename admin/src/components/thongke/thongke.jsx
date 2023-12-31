import React from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from 'moment'
import Sidebar from "../dashboard/sidebar";
import Navbar from "../dashboard/navbar";
import footer from "../dashboard/footer";
import Chart from "chart.js/auto";

function ThongKe() {
    const currentAdmin = useSelector((state) => state.auth.login.currentAdmin);
    const adminProfile = useSelector((state) => state.admin.profile.getadmin);
    const hospitalProfile = useSelector((state) => state.hospital.profile.gethospital);
    const accountId = currentAdmin?._id
    const accessToken = currentAdmin?.accessToken;
    const isAdmin = currentAdmin?.isAdmin;
    const isHospital = currentAdmin?.isHospital;
    const [isAdminOrHospital, setAdminOrHospital] = useState(null);
    const [userStatistics, setUserStatistics] = useState(null);
    const [eventStatistics, setEventStatistic] = useState(null);
    const [hospitalStatistics, setHospitalStatistics] = useState(null);
    const [accountbyDate, setAccountbyDate] = useState(null);
    const [lineChart, setLineChart] = useState(null);

    const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [userTotal, setUserTotal] = useState(null);
    useEffect(() => {
        // Fetch data from your API endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/v1/admin/statistic/account', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setUserStatistics(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchDataBar = async () => {
            try {
                const response = await fetch('http://localhost:8000/v1/admin/statistic/event', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setEventStatistic(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchHospitalStatistics = async () => {
            try {
                const response = await fetch('http://localhost:8000/v1/admin/statistic/hospital', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch hospital statistics');
                }

                const data = await response.json();
                setHospitalStatistics(data);
            } catch (error) {
                console.error('Error fetching hospital statistics:', error);
            }
        };
        const fetchAccountbyDate = async () => {
            try {
                const response = await fetch('http://localhost:8000/v1/admin/statistic/account-register', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch account statistics by date');
                }

                const data = await response.json();
                console.log('API Response:', data); // Log the API response

                setAccountbyDate(data);
            } catch (error) {
                console.error('Error fetching account statistics by date:', error);
            }
        };

        fetchAccountbyDate();
        fetchHospitalStatistics();
        fetchDataBar();
        fetchData();
    }, [accessToken]);

    useEffect(() => {
        // Render
        if (userStatistics) {
            const pieCtx = document.getElementById('pieAccount').getContext('2d');
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Người dùng', 'Quản trị viên', 'Bệnh viện'],
                    datasets: [{
                        data: [userStatistics.totalUsers - (userStatistics.totalAdmins + userStatistics.totalHospitals), userStatistics.totalAdmins, userStatistics.totalHospitals],
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                    }],
                },


            });
        }
    }, [userStatistics]);
    useEffect(() => {
        // Render bar chart for event statistics
        if (eventStatistics) {
            const barChartCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Sắp diễn ra', 'Đang diễn ra', 'Đã kết thúc'],
                    datasets: [{
                        label: 'Số lượng',
                        data: [eventStatistics.upcoming, eventStatistics.ongoing, eventStatistics.finished],
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                        borderWidth: 5,
                    }],
                },
                // options: {
                //     scales: {
                //         y: {
                //             beginAtZero: true,
                //         },
                //     }, indexAxis: 'y',
                // }, barThickness: 30,
            });
        }
    }, [eventStatistics]);
    useEffect(() => {
        // Render donut chart for hospital statistics
        if (hospitalStatistics) {
            const donutCtx = document.getElementById('scatterChart').getContext('2d');
            new Chart(donutCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Đang hợp tác', 'Chờ duyệt'],
                    datasets: [{
                        data: [hospitalStatistics.approvedCount, hospitalStatistics.notApprovedCount],
                        backgroundColor: ['#36A2EB', '#FFCE56'],
                    }],
                },
            });
        }
    }, [hospitalStatistics]);

    // useEffect(() => {
    //     if (accountbyDate) {
    //         const { dayBeforeYesterday, today, yesterday } = accountbyDate;
    //         const registrationCounts = [dayBeforeYesterday, yesterday, today];

    //         // Check if the lineChartCanvas element exists
    //         const lineChartCanvas = document.getElementById('lineChart');

    //         // Check if the lineChartCanvas is not null before creating the chart
    //         if (lineChartCanvas) {
    //             new Chart(lineChartCanvas, {
    //                 type: 'line',
    //                 data: {
    //                     labels: ['Day before yesterday', 'Yesterday', 'Today'],
    //                     datasets: [{
    //                         label: 'Number of Registrations',
    //                         data: registrationCounts,
    //                         borderColor: 'rgb(255, 99, 132)',
    //                         borderWidth: 2,
    //                         pointRadius: 5,
    //                         fill: false,
    //                     }],
    //                 },
    //                 options: {
    //                     scales: {
    //                         y: {
    //                             beginAtZero: true,
    //                             ticks: {
    //                                 stepSize: 1,
    //                             },
    //                         },
    //                     },
    //                 },
    //             });
    //         }
    //     }
    // }, [accountbyDate]);

    useEffect(() => {
        if (accountbyDate) {
            const lineChartCanvas = document.getElementById('lineChart');
    
            if (lineChartCanvas) {
                new Chart(lineChartCanvas, {
                    type: 'line',
                    data: {
                        labels: ['4 ngày trước', '3 ngày trước', '2 ngày trước', '3 ngày trước', 'Hôm nay'],
                        datasets: [
                            {
                                label: 'isAdmin',
                                data: [
                                    accountbyDate.fourDaysAgo.isAdmin,
                                    accountbyDate.threeDaysAgo.isAdmin,
                                    accountbyDate.dayBeforeYesterday.isAdmin,
                                    accountbyDate.yesterday.isAdmin,
                                    accountbyDate.today.isAdmin,
                                ],
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 2,
                                pointRadius: 5,
                                fill: false,
                            },
                            {
                                label: 'Bệnh viện',
                                data: [
                                    accountbyDate.fourDaysAgo.isHospital,
                                    accountbyDate.threeDaysAgo.isHospital,
                                    accountbyDate.dayBeforeYesterday.isHospital,
                                    accountbyDate.yesterday.isHospital,
                                    accountbyDate.today.isHospital,
                                ],
                                borderColor: 'rgb(75, 192, 192)',
                                borderWidth: 2,
                                pointRadius: 5,
                                fill: false,
                            },
                            {
                                label: 'Người dùng',
                                data: [
                                    accountbyDate.fourDaysAgo.user,
                                    accountbyDate.threeDaysAgo.user,
                                    accountbyDate.dayBeforeYesterday.user,
                                    accountbyDate.yesterday.user,
                                    accountbyDate.today.user,
                                ],
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 2,
                                pointRadius: 5,
                                fill: false,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    },
                });
            }
        }
    }, [accountbyDate]);
    
    return (
        <div className="container-scroller">
            <Navbar />
            <div class="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">

                            <div class="col-lg-4 grid-margin grid-margin-lg-0 stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Thống kê bệnh viện hợp tác</h4>
                                        <canvas id="scatterChart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 ">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Thống kê tài khoản</h4>
                                        <canvas id="pieAccount" ></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 ">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Thống kê số lượng sự kiện</h4>
                                        <canvas id="barChart" ></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Thống kê số lượng đăng ký tài khoản mới</h4>
                                        <canvas id="lineChart" ></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <footer />
            </div>
        </div>
    )
}


export default ThongKe;
