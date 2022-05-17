

import { useState } from "react";
import { useForm } from "react-hook-form";
import './Style.css'


export function LoginPage(){
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <form className= 'form-style' onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <hi className = 'title'>LOGIN</hi>
        <input {...register("email")} placeholder="Enter Email" />
      <input {...register("password")} placeholder="Enter password" />
      <input type="submit" />
      console.log({data});
    </form>
  );
}
