import React, {  useEffect, useState } from 'react';
import "./Loan.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Loan() {
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
            <main2>
            <Sidebar />
            <div className="admin2">
                    <div className="Add-User">
                        <button className="button2" onClick={() => {
                            // navigate("/form")
                        }}>
                            Send employee payslip
                        </button>
                    </div>

                    <form action="/" method="POST">
                        <table className="table">
                            <thead className="thead-color">
                                <tr>
                                    <th>id</th>
                                    <th>employee_id</th>
                                    <th>name</th>
                                    <th>initial_amount</th>
                                    <th>amount_left</th>
                                    <th>loan_deduction</th>
                                    <th>approval_status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.employee_id}</td>
                                            <td>{data.surname}</td>
                                            <td>{data.initial_amount}</td>
                                            <td>{data.amount_left}</td>
                                            <td>{data.loan_deduction_rate}</td>
                                            <td>{data.approval_status}</td>
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