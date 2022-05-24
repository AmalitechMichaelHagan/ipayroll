import "./Userform.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


export default function Userform() {
    const { register } = useForm();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');