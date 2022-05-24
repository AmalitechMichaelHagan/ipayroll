import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';


export default function Rate() {
    const { register } = useForm();
    const [rank, setRank] = useState('');
    const [salary, setSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [taxrelief, setTaxrelief] = useState('');
    const [incometax, setIncometax] = useState('');
    const [tierone, setTierone] = useState('');
    const [tiertwo, setTiertwo] = useState('');
    const [loandeduction, setLoandeduction] = useState('')

    const SubmitForm = (e) => {
        e.preventDefault();

    };
     
    
    return (
        <>

            <div className="container">
                <div className="card">
                    <h2 className="h2-head">SET SALARY</h2>

                    <form className='form-style'>
                        <div className="flex">
                            <div className="input_text">
                                <span>RANK</span>
                                <select {...register("rank")} id="levelid" name="levelid" classs="input-field" value={rank} onChange={(e) => setRank(e.target.value)}>
                                    <option value="1">Employee</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Accountant</option>
                                </select>
                            </div>

}