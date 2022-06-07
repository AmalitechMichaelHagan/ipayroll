import Swal from 'sweetalert2';
import "./TaxRelief.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Footer from '../footer/Footer';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';


export default function TaxRelief() {
    const { register } = useForm();
    const [email, setEmployeeEmail] = useState('');
    const [taxrelief, setTaxrelief] = useState('');
    const [amount, setAmount] = useState('');
    const [monthlyamount, setMounthlyamount] = useState('');
    const [reliefdesc, setReliefdesc] = useState('');

    const postData = e => {
        e.preventDefault();
        let myData = {
            "employee_email": email,
            "tax_relief_type": taxrelief,
            "anual_amount": amount,
            "monthly_amount": monthlyamount,
            "relief_desc": reliefdesc,
        }

        console.log(myData)
        axios({
            method: 'post',
            url: 'https://amalitechipayroll.herokuapp.com/tax_relief/send',
            data: myData,
            headers: { 'Authorization': 'Bearer ...' }
        });

         Swal.fire(
             'Done',
             'Tax Relief added for Employee',
             'success'
         )

        setEmployeeEmail('')
        setTaxrelief('')
        setAmount('')
        setMounthlyamount('')
        setReliefdesc('')

        // navigate("/admin")

    }

    return (

        <div>
            <Topbar />
            <Sidebar />
            <form className='form-style3' onSubmit={postData}>
                <h1 className='title3'> Tax-Relief </h1>
                <div className="emplo-form3">
                    <input {...register("email")} placeholder="Enter Email" value={email} onChange={(e) => setEmployeeEmail(e.target.value)} />
                    <input {...register("taxrelief")} placeholder="Taxrelief type" value={taxrelief} onChange={(e) => setTaxrelief(e.target.value)} />
                    <input {...register("amount")} placeholder="Enter anual_amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <hr />
                <div className="emplo-form3">
                    <input {...register("monthlyamount")} placeholder="Enter Mounthly Amount" value={monthlyamount} onChange={(e) => setMounthlyamount(e.target.value)} />
                    <input {...register("reliefdesc")} placeholder="Enter Relief_Desc" value={reliefdesc} onChange={(e) => setReliefdesc(e.target.value)} />
                </div>
                <hr />
                <div className="emplo-form3">
                    <input type="submit" className="login-button3" style={{ color: "white", width: "12em", marginLeft: "2em" }} />
                </div>
            </form>
            <Footer />
        </div>
    );
}
