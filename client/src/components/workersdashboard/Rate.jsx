import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import "./Rate.css"


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
                                <span className="rate-text">RANK</span>
                                <select {...register("rank")} id="levelid" name="levelid" className="inner-shadow" value={rank} onChange={(e) => setRank(e.target.value)}>
                                    <option value="1">Employee</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Accountant</option>
                                </select>
                            </div>
                            <div className="input_text">
                                <span className="rate-text">SALARY</span>
                                <input {...register("salary")} type="number" min="0" max="100" className="inner-shadow" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </div>
                            <div className="input_text">
                                <span className="rate-text">BONUS</span>
                                <input {...register("bonus")} mini="0" maxi="100" className="inner-shadow" value={bonus} onChange={(e) => setBonus(e.target.value)} />

                            </div>
                            <div className="input_text">
                                <span className="rate-text">TAX-RELIEF</span>
                                <input {...register("taxrelief")} mini="0" maxi="100" className="inner-shadow" value={taxrelief} onChange={(e) => setTaxrelief(e.target.value)} />
                            </div>
                            </div>
                        <div className="flex">
                            <div className="flex">
                                <div className="input_text">
                                    <span className="rate-text">INCOME-TAX</span>
                                    <input {...register("incometax")} mini="0" maxi="100" className="inner-shadow" value={incometax} onChange={(e) => setIncometax(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span className="rate-text">TIER 1</span>
                                    <input {...register("tierone")} mini="0" maxi="100" className="inner-shadow" value={tierone} onChange={(e) => setTierone(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span className="rate-text">TIER 2</span>
                                    <input {...register("tiertwo")} mini="0" maxi="100" className="inner-shadow" value={tiertwo} onChange={(e) => setTiertwo(e.target.value)} />
                                </div>
                                <div className="input_text">
                                    <span className="rate-text">LOAN</span>
                                    <input {...register("loandeduction")} mini="0" maxi="100" className="inner-shadow" value={loandeduction} onChange={(e) => setLoandeduction(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="btn">
                                <input type="submit" />
                            </div>
                        </div>

                    </form>

                </div>


            </div>
        </>
    );

}