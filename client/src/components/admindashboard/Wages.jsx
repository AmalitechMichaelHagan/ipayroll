import React, {  useEffect, useState } from 'react';
import "./Wages.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
const FileDownload = require('js-file-download');


export default function Wages() {
    // const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://amalitechipayroll.herokuapp.com/wages/all`)
            .then(response => {
                setAPIData(response.data);
            })
    }, [])

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])

    return (
        <>
            <Topbar />
            <main2>
            <Sidebar />
            <div className="admin2">
                    <div className="Add-User">
                        <button className="button2" onClick={() => {
                           
                        }}>
                            Send employee payslips
                        </button>
                        <button className="button2" onClick={async() => {
                       axios({
                        url: 'https://amalitechipayroll.herokuapp.com/report/wages',
                        method: 'GET',
                        responseType: 'blob', // Important
                      }).then((response) => {
                          FileDownload(response.data, 'report.xlsx');
                      });   
                       
                       }}>
                            Download Report
                        </button>
                    </div>

                    <form action="/" method="POST">
                        <table className="table">
                            <thead className="thead-color">
                                <tr>
                                    <th>Employee_ID</th>
                                    <th>User_Name</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Total_earnings</th>
                                    <th>Total_deductions</th>
                                    <th>Net_salary</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.employee_id}</td>
                                            <td>{data.surname}</td>
                                            <td>{data.month}</td>
                                            <td>{data.year}</td>
                                            <td>{data.total_earnings}</td>
                                            <td>{data.total_deductions}</td>
                                            <td>{data.take_home_salary}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>
                </div>
                </main2>

            < Footer />
        </>
    );

}