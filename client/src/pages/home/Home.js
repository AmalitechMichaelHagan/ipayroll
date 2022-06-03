import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css"
// import Stat from './stat'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { GiRank3, GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiFillIdcard } from "react-icons/ai";
import { BsGift } from 'react-icons/bs'
import { FaBuilding } from "react-icons/fa";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import axios from "axios";
import { useEffect, useState } from "react";
// import Footer from "../../components/footer/Footer";


export default function Home() {
    
    let info = useSelector((state =>{
        return state;
    }))

    const [current, setCurrent] = useState(info.users)

    useEffect(()=>{
        try{
        const data = localStorage.getItem('current_user');
        if(data){
            setCurrent(JSON.parse(data));
        }
    }catch(e){
        console.log(e);
    }
    },[])

    useEffect(()=>{
        if(current.firstname !== 'skip'){
        localStorage.setItem('current_user',JSON.stringify(current))
        }
    });

    let reliefState = "";
    current.taxRelief? reliefState = "Active" : reliefState = "Inactive";
    let loanState = "";
    current.pendingLoan? loanState = "Active" : loanState = "Inactive";

    let loanCheck = async () =>{
        try {
            return await axios.get("http://localhost:9000/loans/all");
          }
          catch (error) {
            console.log(error);
          }
        }


    let loanApply = () =>{

        let loancheck = loanCheck();
        let final = false;
        loancheck.then(
            result => {
                result.data.forEach(element=>{
                    if (element.employee_id === current.id){
                        final =  true;
                    }
                })
            }
        )

        Swal.fire({
            title: 'Enter Loan Amount',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (amount) => {
            if(isNaN(amount)||amount === ""){
                Swal.showValidationMessage(
                    `Enter Valid input`
                  )
            } else if(final){
                    Swal.fire(
                        'Sorry',
                        'You Already have an existing loan',
                        'error'
                      )
            }else{
                var date_ob = new Date();
                
                var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                
                if(month[0] === "0"){month.slice(1)}

                var year = date_ob.getFullYear();
                
                let myData = {
                    "employee_id": current.id,
                    "month":month,
                    "year":year,
                    "initial_amount":amount,
                    "amount_left":amount
                  }
              
                  console.log(myData)
              
              
              
                  axios({
                    method: 'post',
                    url: 'http://localhost:9000/loans/send',
                    data: myData,
                    headers: { 'Authorization': 'Bearer ...' }
                  });
                Swal.fire(
                    `Loan Request sent for GHC${amount}`,
                    'You will be notified via mail after it has been processed',
                    'success'
                  )
            }
        }
          })

    }

    console.log("2",current,"\n")
    
    return (
        current.isAdmin?
        <div style={{minHeight:"100vh"}}>
            <div className="color-backgroung">
                <Topbar />
                {/* <Stat /> */}
                <Sidebar />
                {/* <Footer /> */}
                <div className="wrapper">
                    <div className="header">
                        <h2>Welcome {current.firstname}</h2>
                        <h5> Your new tool for work, view your dashborad below</h5>
                    </div>
                    <div className="parent">
                        <div className="shadow">
                            <div className="icons">
                            <AiFillIdcard />
                            </div>
                            <h2 className="grid">Employee ID</h2>
                            <p className="grid2"> {current.id} </p>
                            <p className="grid2"></p>

                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <FaBuilding />
                            </div>
                            <h2 className="grid">Department</h2>
                            <p className="grid2"> {current.department} </p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiRank3 />
                            </div>
                            <h2 className="grid">Rank</h2>
                            <h4 className="grid2"> {current.rank} </h4>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <BsGift />
                            </div>

                            <h2 className="grid">Tax Relief</h2>
                            <p className="grid2">{reliefState}</p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiPayMoney />
                            </div>
                            <h2 className="grid">Loan</h2>
                            <p className="grid2">{loanState}</p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiReceiveMoney />
                            </div>
                            <h2 className="grid">Loan Application</h2>
                            <p className="grid2">Click here to apply</p>
                            <p className="grid2"></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>:
        <div style={{minHeight:"100vh"}}>
        <div className="color-backgroung">
            <Topbar />
            {/* <Stat /> */}
            {/* <Footer /> */}
            <div className="wrapper" style={{margin:"2em auto"}}>

                <div className="header" style={{margin:"2em auto"}}>
                    <h2>Welcome {current.firstname}</h2>
                    <h5> Your new tool for work, view your dashborad below</h5>
                </div>
                <div className="parent" style={{margin:"2em auto"}}>
                    <div className="shadow">
                        <div className="icons">
                        <AiFillIdcard />
                        </div>
                        <h2 className="grid">Employee ID</h2>
                            <p className="grid2"> {current.id} </p>
                            <p className="grid2"></p>

                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <FaBuilding />
                            </div>
                            <h2 className="grid">Department</h2>
                            <p className="grid2"> {current.department} </p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiRank3 />
                            </div>
                            <h2 className="grid">Rank</h2>
                            <p className="grid2"> {current.rank} </p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <BsGift />
                            </div>
                            <h2 className="grid">Tax Relief</h2>
                            <p className="grid2">{reliefState}</p>
                            <p className="grid2"></p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiPayMoney />
                            </div>
                            <h2 className="grid">Loan</h2>
                            <p className="grid2">{loanState}</p>
                            <p className="grid2"></p>
                        </div>
                        <div id="hover" className="shadow" style={{cursor:"pointer"}} onClick={loanApply} >
                        <div className="icons">
                            <GiReceiveMoney />
                            </div>
                            <h2 className="grid">Loan Application</h2>
                            <p className="grid2">Click Here to apply</p>
                            <p className="grid2"></p>
                        </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>


    )
}
