import "./EmployeeSideBar.css"
import { useNavigate } from "react-router-dom"



export default function EmployeeSideBar() {
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Employee Dashboard</h3>
                    <ul className="sidebarLists">
                        <li className="sidebarItems active" onClick={() => {
                            navigate("/")
                        }}> Home  </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

