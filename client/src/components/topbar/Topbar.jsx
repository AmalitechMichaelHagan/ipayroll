import React from 'react';
import "./Topbar.css";
import PayrollImg from "../../assets/ipayroll.jpeg";


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
                    </div>
                </div>
            </div>
        </div>
    )
}
