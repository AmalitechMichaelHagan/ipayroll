import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css"
// import Stat from './stat'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { MdDashboard, MdModelTraining, MdOutlineTour} from 'react-icons/md';
import { GiOnTarget, GiStairsGoal, GiTimeBomb } from 'react-icons/gi';
import { BsFolder, BsGift } from 'react-icons/bs'
import Footer from "../../components/footer/Footer";
// import Footer from "../../components/footer/Footer";


export default function Home() {
    return (
        <>
            <div className="color-backgroung">
                <Topbar />
                {/* <Stat /> */}
                <Sidebar />
                {/* <Footer /> */}
                <div className="wrapper">
                    <div className="header">
                        <h2>Welcome To AmaliTech</h2>
                        <h5> Your new tool for work,. here is a quick look at some of the things you can do here in the company</h5>
                    </div>
                    <div className="parent">
                        <div className="shadow">
                            <div className="icons">
                            <GiTimeBomb />
                            </div>
                            <h2 className="grid">Reguest Time Off</h2>
                            <p className="grid2">  Reguest time off and check your palace </p>
                            <p className="grid2"> Time with AmaliTech</p>

                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <MdOutlineTour />
                            </div>
                            <h2 className="grid">Tour Planning</h2>
                            <p className="grid2"> Ghana trip advisor </p>
                            <p className="grid2"> Time with AmaliTech </p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <BsFolder />
                            </div>
                            <h2 className="grid">Company Directory</h2>
                            <p className="grid2"> Search for cowerkers and and thier contact </p>
                            <p className="grid2"> Join with AmaliTech</p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <BsGift />
                            </div>
                            <h2 className="grid">Benefits</h2>
                            <p className="grid2">See which company benefits you are enrolled in.</p>
                            <p className="grid2">Time with AmaliTech</p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <MdModelTraining />
                            </div>
                            <h2 className="grid">Training</h2>
                            <p className="grid2">Stay on top of your trainings and certifications.</p>
                            <p className="grid2">Time with AmaliTech  </p>
                        </div>
                        <div className="shadow">
                        <div className="icons">
                            <GiStairsGoal />
                            </div>
                            <h2 className="grid">Goals</h2>
                            <p className="grid2">Create, track, and collaborate on your goals.</p>
                            <p className="grid2"> Time with AmaliTech </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>


    )
}
