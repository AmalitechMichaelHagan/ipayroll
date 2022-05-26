import moment from "moment";
import axios from "axios";


export function Payslip({ paySlipData }) {
    return (
      <section id="top">
         {paySlipData && 
           paySlipData.map((element, index) => {
          
            return (
                <div class="container mt-5 mb-5" key={index}>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center lh-1 mb-2">
                            <h6 class="fw-bold">Payslip</h6> <span class="fw-normal">Employee payslip for the month</span>
                        </div>
                        <div class="row">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Employee id:</span> <small class="ms-3">{element.employee_id}</small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Rank:</span> <small class="ms-3">{element.rank}</small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Period</span> <small class="ms-3">{element.month_year}</small> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Employee Name:</span> <small class="ms-3">{element.full_name}</small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Department</span> <small class="ms-3">{element.department}</small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Date Join</span> <small class="ms-3">{moment.utc(element.date_join).format("YYYY-MM-DD")}</small> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">SSNIT Number.</span> <small class="ms-3">{element.ssnit_number}</small> </div>
                        </div>
                       </div>
                <table class="mt-4 table table-bordered">
                    <thead class="bg-dark text-white">
                        <tr>
                            <th scope="col">CRITERION</th>
                            <th scope="col">EARNING</th>
                            <th scope="col">DEDUCTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">BASIC SALARY</th>
                            <td>{element.basic_salary}</td>
                            <td>GHC{element.total_deduction}</td>
                        </tr>
                        <tr>
                            <th scope="row">WORKERS BONUS</th>
                            <td>{element.bonus}</td>
                            <td>GHC{element.total_deduction}</td>
                        </tr>
                        <tr>
                            <th scope="row">TAX RELIEF</th>
                            <td>{element.tax_relief}</td>
                            <td>GHC{element.total_deduction}</td>
                        </tr>
                        <tr>
                            <th scope="row">LOAN AMOUNT</th>
                            <td>{element.initial_amount} </td>
                            <td>GHC{element.total_deduction}</td>
                        </tr>
                        <tr>
                            <th scope="row">INCOME TAX</th>
                            <td>{element.income_tax}</td>
                            <td>GHC{element.total_deduction}</td>
                        </tr>
                        <tr>