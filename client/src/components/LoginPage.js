import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


export function LoginPage() {

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function getUserData() {
    try {
      return await axios.get("http://localhost:9000/users/all");
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {

    const data = getUserData();

    data.then(val => {
      var check = false;
      val.data.forEach((element) => {
        if (element.email === mail && element.user_password === pass) {
          check = true;
        }
      })

      if (check) {
        navigate("/home")
      } else {
        Swal.fire(
          'Oops!',
          'Wrong Credentials',
          'error'
        )
      }

      //console.log(val.data);



    }).catch(err => {
      console.log(err);
    });



  }

  useEffect(() => {
    axios.get(`http://localhost:9000/employees/all`)
      .then(response =>
        setAPIData(response.data));
  }, [])

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {

  }, [])

  return (
    <div className="login-form">
      <form className='form-style2' onSubmit={handleSubmit((APIData) => setAPIData(JSON.stringify(APIData)))}>
        <div className="loh-header">
          <h1 className='login-title'>LOGIN</h1>
        </div>
        <input {...register("email")} placeholder="Enter Email" className="inner-shadow" value={mail} onChange={(e) => setMail(e.target.value)} />
        <input {...register("password")} placeholder="Enter password" className="inner-shadow" value={pass} onChange={(e) => setPass(e.target.value)} />
        <input type="submit" onClick={handleClick} className="login-button" />
      </form>
    </div>
  );
}