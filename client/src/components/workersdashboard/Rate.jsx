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
                            <div className="input_text">
                                <span>SALARY</span>
                                <input {...register("salary")} type="number" min="0" max="100" classs="input-field" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </div>
                            <div className="input_text">
                                <span>BONUS</span>
                                <input {...register("bonus")} mini="0" maxi="100" classs="input-field" value={bonus} onChange={(e) => setBonus(e.target.value)} />

                            </div>
                            <div className="input_text">
                                <span>TAX-RELIEF</span>
                                <input {...register("taxrelief")} mini="0" maxi="100" classs="input-field" value={taxrelief} onChange={(e) => setTaxrelief(e.target.value)} />
                            </div>
                            </div>
                        <div className="flex">
                            <div className="flex">
                                <div className="input_text">
                                    <span>INCOME-TAX</span>
                                    <input {...register("incometax")} mini="0" maxi="100" classs="input" value={incometax} onChange={(e) => setIncometax(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span>TIER 1</span>
                                    <input {...register("tierone")} mini="0" maxi="100" classs="input" value={tierone} onChange={(e) => setTierone(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span>TIER 2</span>
                                    <input {...register("tiertwo")} mini="0" maxi="100" vclasss="input" alue={tiertwo} onChange={(e) => setTiertwo(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span>LOAN</span>
                                    <input {...register("loandeduction")} mini="0" maxi="100" classs="input" value={loandeduction} onChange={(e) => setLoandeduction(e.target.value)} />
                                </div>
                            </div>
                        </div>

}