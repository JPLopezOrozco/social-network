import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function NavBar(){
    const {user, logoutUser} = useContext(AuthContext)
    return(
        <div className="nav-bar">
            <nav className="d-flex flex-direction justify-content-between">
                <ul className="nav">
                    <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/follow">Follow</Link></li>
                </ul>
                <ul className="nav">
                    {user ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to={`/profile/${user.user_id}`}>{user.username}</Link></li>
                            <li className="nav-item"><Link style={{cursor:'pointer'}} onClick={logoutUser} className="nav-link">Logout</Link></li>
                        </>
                    ):(
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        </>
                    )
                    }
                </ul>
            </nav>
        </div>
    )
}