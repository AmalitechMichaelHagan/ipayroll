import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get(`http://localhost:9000/employees/all`)
    .then(response =>
      setAPIData(response.data));
  },[])

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {

  }, [])

  return (
    <div className="login-form">
      <form className='form-style2' onSubmit={handleSubmit((APIData) => setAPIData(JSON.stringify(APIData)))}>
      <div className="loh-header"> 
      <h1 className='login-title'>LOGIN</h1>
      </div> 
        <input {...register("email")} placeholder="Enter Email" className="inner-shadow" />
        <input {...register("password")} placeholder="Enter password" className="inner-shadow"/>
        <input type="submit1" onClick={() => {
          navigate("/home")
        }}  className="login-button"/>
      </form>
    </div>
  );
}
