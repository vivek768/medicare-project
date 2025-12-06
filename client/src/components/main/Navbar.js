import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0047AB" }}>
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand fw-semibold mx-2 text-white" to="/">MediMinder</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold mx-2">
                        <li className="nav-item mx-2">
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link text-white" to="/upload">Upload</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link text-white" to="/reports">My Reports</Link>
                        </li>
                        {/* <li className="nav-item mx-2">
                            <a className="nav-link text-white" href="#">Profile</a>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="btn btn-dark py-1">Log Out</button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}