import React, {  useEffect, useState } from 'react';
import "./Wages.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
// import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Wages() {
    // const navigate = useNavigate();

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
                                    <th>name</th>
                                    <th>month</th>
                                    <th>year</th>
                                    <th>total_earning</th>
                                    <th>total_deduction</th>
                                    <th>take_home_salary</th>
                                    <th>rank</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.surname}</td>
                                            <td>{data.month}</td>
                                            <td>{data.year}</td>
                                            <td>{data.total_earnings}</td>
                                            <td>{data.total_deductions}</td>
                                            <td>{data.take_home_salary}</td>
                                            <td>{data.rank}</td>
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