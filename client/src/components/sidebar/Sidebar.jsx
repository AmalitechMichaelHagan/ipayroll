import "./Sidebar.css"
import { NavLink } from "react-router-dom";


export default function Sidebar() {
    
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
                            Employees
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
                            Loans
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
                            Rates
                        </NavLink>
                        <NavLink to="/relief" style={({ isActive }) => ({
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
                            Tax_Relief
                        </NavLink>
                        <NavLink to="/tax" style={({ isActive }) => ({
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
                            tax_relief
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

