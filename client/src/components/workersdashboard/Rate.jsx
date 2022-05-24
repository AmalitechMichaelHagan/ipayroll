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

}