import React, {  useEffect, useState } from 'react';
import "./Wages.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import Swal from 'sweetalert2';
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


    const sendPayslips =  () =>{


        let date_ob = new Date();

        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        if(month[0] === "0"){month = month.slice(1)}

        month = parseInt(month);

        let year = date_ob.getFullYear();

        let date = '';

        switch(month){
            case 1: date = `January ${year}`;break;
            case 2: date = `February ${year}`;break;
            case 3: date = `March ${year}`;break;
            case 4: date = `April ${year}`;break;
            case 5: date = `May ${year}`;break;
            case 6: date = `June ${year}`;break;
            case 7: date = `July ${year}`;break;
            case 8: date = `August ${year}`;break;
            case 9: date = `September ${year}`;break;
            case 10: date = `October ${year}`;break;
            case 11: date = `November ${year}`;break;
            case 12: date = `December ${year}`;break;
            default: date = 'This month';
          }

                Swal.fire({
                    title: `This will generate and send employee payslips for ${date}`,
                    text: "You won't be able to revert this. Do you wish to proceed?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#551515',
                    cancelButtonColor: '#aca3a3',
                    confirmButtonText: 'Yes'
                  }).then((result) => {
                    if (result.isConfirmed) {
                          axios({
                            method: 'post',
                            data:{
                                "month":month,
                                "year":year
                            },
                            url: 'https://amalitechipayroll.herokuapp.com/wages/generate',
                            headers: { 'Authorization': 'Bearer ...' }
                          });
                      
                      Swal.fire(
                        `Payslips issued`,
                        'Employees will receive slips via mail',
                        'success'
                      )
                    }
                    
                  })

    }

    return (
        <>
            <Topbar />
            <main2>
            <Sidebar />
            <div className="admin3">
                    <div className="Add-User">
                        <button className="button4" onClick={sendPayslips}>
                            Send employee payslips
                        </button>
                        <button className="button1" onClick={async() => {
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
                                    <th>ID</th>
                                    <th>Employee_ID</th>
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
                                            <td>{data.id}</td>
                                            <td>{data.employee_id}</td>
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