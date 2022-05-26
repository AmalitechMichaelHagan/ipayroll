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