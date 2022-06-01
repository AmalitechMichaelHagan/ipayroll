
// import EmployeeSideBar from './EmployeeSideBar';
import EmployeeTopBar from './EmployeeTopBar';
import axios from "axios";
import "./EmployeeDashBoard.css";
import React, { useEffect, useState } from 'react';
import './EmployeeModal';
import EmployeeModal from './EmployeeModal';



export default function EmployeeDashBoard() {

    
    useEffect(() => {
        axios.get(`http://localhost:9000/employees/all`)
            .then(response => {
                setAPIData(response.data);
            })
    }, [])

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])

  return (
      <>
      <EmployeeTopBar />

       <div className="admin2">
       <h3 className="head">Employee DashBoard</h3>

                    <div className="ad-User">
                    <EmployeeModal />
                    </div>

                    <form action="/" method="POST">
                        <table className="table">
                            <thead className="thead-color">
                                <tr>
                                    <th>Salary</th>
                                    <th>allowance</th>
                                    <th>tax_relief</th>
                                    <th>Paye </th>
                                    <th>loan_deduction</th>
                                    <th>loan_remainder</th>
                                    <th>tier_one</th>
                                    <th>tier_two</th>
                                    <th>SSNIT_total</th>
                                    <th>Total_earnings</th>
                                    <th>Total_deductions</th>
                                    <th>take_home_salary</th>
                                </tr>
                            </thead>
                            <tbody>

                                {APIData.map((data) => {

                    
                                    return (
                                        <tr>
                                     <td>{data.Salary}</td>
                                    <td>{data.cash_allowance}</td>
                                    <td>{data.tax_relief}</td>
                                    <td>{data.Paye} </td>
                                    <td>{data.loan_deduction}</td>
                                    <td>{data.loan_remainder}</td>
                                    <td>{data.ssnit_tier_one}</td>
                                    <td>{data.ssnit_tier_two}</td>
                                    <td>{data.ssnit_total}</td>
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

    </>
  )
}
