import "./Sidebar.css"
import { useNavigate, NavLink } from "react-router-dom";


export default function Sidebar() {
    
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Admin Dashboard</h3>
                    <div className="menu-container">
                        <NavLink to="/home" style={({ isActive }) => ({
                             listStyle: "none",
                             textDecoration: "none",
                             color: isActive ? "white" : "black",
                             backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                             width: isActive? "180px": "100%",
                             height: "8vh",
                             textAlign: "center",
                             paddingTop: "0.5em",
                             paddingLeft: "1em",
                             paddingRight: isActive? "4em": "0",
                             fontSize: "1.2em"
                        })}
                        >
                            Home
                        </NavLink>

                        <NavLink to="/admin" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "black" : "black",
                            backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                            width: isActive? "190px": "10git0%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            paddingRight: isActive? "4em": "0",
                            fontSize: "1.2em"

                        })}>
                            Employee
                        </NavLink>

                        {/* <NavLink to="/employee" style={({ isActive }) => ({
                             listStyle: "none",
                             textDecoration: "none",
                             color: isActive ? "black" : "black",
                             backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                             width: isActive? "190px": "100%",
                             height: "8vh",
                             textAlign: "center",
                             paddingTop: "0.5em",
                             paddingLeft: "1em",
                             paddingRight: isActive? "4em": "0",
                             fontSize: "1.2em"

                        })}>
                            Employee
                        </NavLink> */}

                        <NavLink to="/wages" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "black" : "black",
                            backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                            width: isActive? "190px": "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            paddingRight: isActive? "4em": "0",
                            fontSize: "1.2em"
                        })}>
                            Wages
                        </NavLink>
                        <NavLink to="/loan" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "black" : "black",
                            backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                            width: isActive? "190px": "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            paddingRight: isActive? "4em": "0",
                            fontSize: "1.2em"
                        })}>
                            Loan
                        </NavLink>
                        <NavLink to="/rate" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "black" : "black",
                            backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                            width: isActive? "190px": "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            paddingRight: isActive? "4em": "0",
                            fontSize: "1.2em"
                        })}>
                            Rate
                        </NavLink>


                        {/* <NavLink to="/employee2" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "black" : "black",
                            backgroundColor: isActive ? "white" : "rgb(172, 163, 163)",
                            width: isActive? "190px": "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            paddingRight: isActive? "4em": "0",
                            fontSize: "1.2em"
                        })}>
                            Employee DashBoard
                        </NavLink> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

