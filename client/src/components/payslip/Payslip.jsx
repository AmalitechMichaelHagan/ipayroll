import moment from "moment";
import axios from "axios";


export function LoginPage({ paySlipData }) {
    return (
      <section id="top">
         {paySlipData && 
           paySlipData.map((element, index) => {
    