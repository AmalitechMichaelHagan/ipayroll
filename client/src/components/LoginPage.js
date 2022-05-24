

    import { useState } from "react";
    import { useForm } from "react-hook-form";
    import './LoginPage.css'
    import { useNavigate } from "react-router-dom";



    export function LoginPage(){

      const navigate = useNavigate();

      const { register, handleSubmit } = useForm();
      const [data, setData] = useState("");

      return (
        <div className="login-form">
        <form className= 'form-style' onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <hi className = 'title'>LOGIN</hi>
            <input {...register("email")} placeholder="Enter Email" />
          <input {...register("password")} placeholder="Enter password" />
          <input type="submit"  onClick={() =>{
            navigate("/home")
          }}/>
          console.log({data});
        </form>
        </div>
      );
    }
