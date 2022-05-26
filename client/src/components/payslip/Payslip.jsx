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