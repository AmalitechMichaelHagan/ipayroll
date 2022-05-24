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
              <select {...register("category")} className="inner-shadow">
                <option value="">Select employee...</option>
                <option value="A">francis coffie</option>
                <option value="B">stephen coffie</option>
                <option value="B">monica coffie</option>
                <option value="B">hagar coffie</option>
                <option value="B">ebenezer coffie</option>
              </select>
              <input {...register("loanAmount")} placeholder="Loan Amount" className="inner-shadow" />
              <input type="date" {...register("month")} placeholder="Month" className="inner-shadow" />
              <p>{data}</p>
              <input type="submit" />
            </form>
          </div>

          <div className="salary-set1">
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
              <h4 className="month-salary">Calculate Mounth Salary</h4>
              <hr className="line" />
              <input type="date" {...register("montth")} placeholder="Month" className="inner-shadow" />
              <p>{data}</p>
              <input type="submit" />
            </form>
          </div>
        </div>