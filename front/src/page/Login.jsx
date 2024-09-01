import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import Home from "./Home"


const Login = ()=>{
    const {loginUser, user} = useContext(AuthContext)
    return user ? <Navigate to='/home' />:(
            <div className="mb-3 container-fluid form">
                <form onSubmit={loginUser}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control mb-3" id="username" name="username" placeholder="Username" autoComplete="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control mb-3" id="password" name="password" placeholder="Password" autoComplete="current-password"  />
                    <button type="submit" className="w-100 btn btn-lg submit-button">Login</button>
                </form>
            </div>
    )
}

export default Login