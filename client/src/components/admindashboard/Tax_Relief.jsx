import React, {  useEffect, useState } from 'react';
import "./Rate.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FileDownload = require('js-file-download');

export default function Rate() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://amalitechipayroll.herokuapp.com/tax_relief/all`)
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
            <div className="admin4">
                    <div className="Add-User">
                        <button className="button2" onClick={() => {
                            navigate("/rform")
                        }}>
                            Add Tax Relief
                        </button>
                        <button className="button2" onClick={async() => {
                       axios({
                        url: 'https://amalitechipayroll.herokuapp.com/report/tax_relief',
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
                                    <th>id</th>
                                    <th>Employee_email</th>
                                    <th>Type</th>
                                    <th>Annual_amount</th>
                                    <th>Monthly_amount</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.employee_email}</td>
                                            <td>{data.tax_relief_type}</td>
                                            <td>{data.annual_amount}</td>
                                            <td>{data.monthly_amount}</td>
                                            <td>{data.relief_desc}</td>
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