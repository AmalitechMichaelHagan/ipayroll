import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch} from "react-redux";
import {setUser} from '../store/userSlice'


export function LoginPage() {

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let userData = useSelector(state => state.users);

  async function getUserData() {
    try {
      return await axios.get("https://amalitechipayroll.herokuapp.com/users/all");
    }
    catch (error) {
      console.log(error);
    }
  }

  async function getUserInfo(email) {
    try {
      return await axios.get(`https://amalitechipayroll.herokuapp.com/employees/retrieve/${email}`);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {

    const data = getUserData();
    var info = '';
    data.then(val => {
      var check = false;
      val.data.forEach((element) => {
        if (element.email === mail && element.user_password === pass) {
          check = true;
          info = getUserInfo(element.email);
          info.then(
            result =>{
              dispatch(setUser(
                {
                  firstname: result.data.firstname,
                  id:result.data.id,
                  department:result.data.department,
                  rank:result.data.rank,
                  taxRelief:result.data.tax_relief,
                  pendingLoan:result.data.loan_status,
                  isAdmin:element.admin_role
              }
              ))
              navigate("/home")
            }
          )
        }
      })

      if (!check) {
        Swal.fire(
          'Oops!',
          'Wrong Credentials',
          'error'
        )
      }
    }
    
    ).catch(err => {
      console.log(err);
    });



  }

  useEffect(() => {
    axios.get(`https://amalitechipayroll.herokuapp.com/employees/all`)
      .then(response =>
        setAPIData(response.data));
  }, [])

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {

  }, [])

  return (
    <div className="back">
    <div className="login-form">
      <form className='form-style2' onSubmit={handleSubmit((APIData))}>
        <div className="loh-header">
          <h1 className='login-title'>LOGIN</h1>
        </div>
        <input {...register("email")} placeholder="Enter Email" className="inner-shadow" value={mail} onChange={(e) => setMail(e.target.value)} />
        <input {...register("password")} placeholder="Enter password" className="inner-shadow" value={pass} onChange={(e) => setPass(e.target.value)} />
        <input type="submit" onClick={handleClick} className="login-button" />
      </form>
    </div>
    </div>
  );
}