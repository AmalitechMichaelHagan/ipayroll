import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "./Hresource.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from "../footer/Footer";


export default function Hresource() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`postgres://rhuijitkydpord:14ec022c01b999a5f15363cf63b18f3bb9180f48f1b5c7fa9aabd4cbd336380f@ec2-3-226-163-72.compute-1.amazonaws.com:5432/d6q5704oqrvd16/employees/all`)
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
                    </div>

                    <form action="/" method="POST">
                        <table className="table">
                            <thead className="thead-color">
                                <tr>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>E-mail</th>
                                    <th>Phone </th>
                                    <th>SSNIT Number</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Start Date</th>
                                    <th>Rank</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {


                                    return (
                                        <tr>
                                            <td>{data.firstname}</td>
                                            <td>{data.surname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone_number}</td>
                                            <td>{data.ssnit_number}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.department}</td>
                                            <td>{data.work_start_date}</td>
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


