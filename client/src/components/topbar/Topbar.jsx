import React from 'react';
import "./Topbar.css";
import PayrollImg from "../../assets/ipayroll.jpeg";
import {  NavLink } from "react-router-dom";


export default function Topbar() {

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topleft">
                    <img src={PayrollImg} alt="ipayroll" className="icon" />
                    <span className="logo">AMALITECH.ORG</span>
                </div>
                <div className="topright">
                    <div className="topbatIcons">
                    <NavLink to="/">
                        <div className='btn'>
                            LogOut   
                        </div>
                    </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
