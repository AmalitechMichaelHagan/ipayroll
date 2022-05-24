import { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoanDashboard.css"
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

export default function LoanDashboard() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <>
      <Topbar />
      <div className="">
        <Sidebar />
      </div>
      <div className="background>">
        <div className="flex2">
          <div className="salary-set1">
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
              <h4 className="loan">Loan request section</h4>
              <hr className="line" />