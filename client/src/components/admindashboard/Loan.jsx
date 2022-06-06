import React, {  useEffect, useState } from 'react';
import "./Loan.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import axios from "axios";
const FileDownload = require('js-file-download');


export default function Loan() {
    // const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://amalitechipayroll.herokuapp.com/loans/all`)
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
                    <button className="button1" onClick={async() => {
                       axios({
                        url: 'https://amalitechipayroll.herokuapp.com/report/loans',
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
                                    <th>employee_id</th>
                                    <th>month</th>
                                    <th>year</th>
                                    <th>initial_amount</th>
                                    <th>amount_left</th>
                                    <th>deduction_rate</th>
                                    <th>approval_status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.employee_id}</td>
                                            <td>{data.month}</td>
                                            <td>{data.year}</td>
                                            <td>{data.initial_amount}</td>
                                            <td>{data.amount_left}</td>
                                            <td>{data.loan_deduction_rate}</td>
                                            <td>{data.approval_status?"Approved":"Pending"}</td>
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