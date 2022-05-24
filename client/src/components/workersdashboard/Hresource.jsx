import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "./Hresource.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rate from "./Rate";


export default function Hresource() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9000/employees/all`)
            .then(response => {
                setAPIData(response.data);
            })
    }, [])