import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "./Hresource.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from "../footer/Footer";
const FileDownload = require('js-file-download');


export default function Hresource() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://amalitechipayroll.herokuapp.com/employees/all`)
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

            <main>
                <div className="">
                    <Sidebar />

                </div>
                <div className="admin">
                    <div className="Add-User">
                        <button className="button1" onClick={() => {
                            navigate("/form")
                        }}>
                            Add Employee
                        </button>
                        <button className="button1" onClick={async() => {
                       axios({
                        url: 'https://amalitechipayroll.herokuapp.com/report/employees',
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
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>E-mail</th>
                                    <th>Phone </th>
                                    <th>SSNIT</th>
                                    <th>TIN</th>
                                    <th>Department</th>
                                    <th>Rank</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.firstname}</td>
                                            <td>{data.surname}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone_number}</td>
                                            <td>{data.ssnit_number}</td>
                                            <td>{data.tin_number}</td>
                                            <td>{data.department}</td>
                                            <td>{data.rank}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>
                </div>
            </main>
            <Footer />
        </>

    )
}


