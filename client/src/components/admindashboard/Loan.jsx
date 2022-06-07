import Swal from 'sweetalert2';
import React, {  useEffect, useState } from 'react';
import "./Loan.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import axios from "axios";
import {IoIosCheckmarkCircle,IoIosCloseCircle} from "react-icons/io"
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


    const acceptLoan = (id) =>{
        Swal.fire({
            title: 'Enter Loan Deduction Rate',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            confirmButtonColor:'#551515',
            showLoaderOnConfirm: true,
            preConfirm: (rate) => {
            if(isNaN(rate)||rate === ""||rate>100){
                Swal.showValidationMessage(
                    `Enter Valid input`
                  )
            }else{

                let myData = {
                    "response": true,
                    "employee_id": id,
                    "deduction_rate":rate
                  }
              
                  axios({
                    method: 'put',
                    url: 'https://amalitechipayroll.herokuapp.com/loans/review',
                    data: myData,
                    headers: { 'Authorization': 'Bearer ...' }
                  });
                Swal.fire(
                    `Done`,
                    `Loan Request accepted`,
                    'success'
                  )
            }
        }
          })
    }

    const denyLoan = (id) =>{
        Swal.fire({
            title: 'Are you sure you want to decline this loan?',
            text: "You won't be able to revert this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#551515',
            cancelButtonColor: '#aca3a3',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                let myData = {
                    "response": false,
                    "employee_id": id,
                  }
              
                  axios({
                    method: 'put',
                    url: 'https://amalitechipayroll.herokuapp.com/loans/review',
                    data: myData,
                    headers: { 'Authorization': 'Bearer ...' }
                  });

              Swal.fire(
                'Loan Rejected',
                'Loan record has been deleted',
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

                   
                        <table className="table">
                            <thead className="thead-color">
                                <tr>
                                    <th>ID</th>
                                    <th>Employee_id</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Initial_amount</th>
                                    <th>Amount_left</th>
                                    <th>Deduction_rate</th>
                                    <th>Approval_status</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {
                                    return(
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{data.employee_id}</td>
                                            <td>{data.month}</td>
                                            <td>{data.year}</td>
                                            <td>{data.initial_amount}</td>
                                            <td>{data.amount_left}</td>
                                            <td>{data.loan_deduction_rate}</td>
                                            <td>{data.approval_status?"Approved":"Pending"}</td>
                                            <td><button className='review' onClick={()=>{acceptLoan(data.employee_id)}}><IoIosCheckmarkCircle /></button> <button className='review' onClick={()=>{denyLoan(data.employee_id)}}><IoIosCloseCircle /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                   
                </div>
                </main2>

            < Footer />
        </>
    );

}