import "./Sidebar.css"
import { useNavigate, NavLink } from "react-router-dom";


export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <div className="menu-container">
                        <NavLink to="/" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "white" : "black",
                            backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                            width: "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            // fontWeight: "bold",
                            fontSize: "1.2em"
                        })}
                        >
                            Home
                        </NavLink>

                        <NavLink to="/admin" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "white" : "black",
                            backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                            width: "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            fontSize: "1.2em"

                        })}>
                            Administrator
                        </NavLink>

                        <NavLink to="/employee" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "white" : "black",
                            backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                            width: "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            fontSize: "1.2em"

                        })}>
                            Employee
                        </NavLink>

                        <NavLink to="/rate" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "white" : "black",
                            backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                            width: "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            fontSize: "1.2em"
                        })}>
                            Account
                        </NavLink>

                        <NavLink to="/employee2" style={({ isActive }) => ({
                            listStyle: "none",
                            textDecoration: "none",
                            color: isActive ? "white" : "black",
                            backgroundColor: isActive ? "rgb(90, 14, 14)" : "rgb(172, 163, 163)",
                            width: "100%",
                            height: "8vh",
                            textAlign: "center",
                            paddingTop: "0.5em",
                            paddingLeft: "1em",
                            fontSize: "1.2em"
                        })}>
                            Employee DashBoard
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

