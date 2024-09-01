import {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Register = ()=>{
    const {registerUser, user} = useContext(AuthContext)
    return user ? <Navigate to='/home' />:(

            <div className="mb-3 container-fluid form">
                <form action="" onSubmit={registerUser}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control mb-3" id="username" placeholder="Username" autoComplete="username"  />
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control mb-3" id="email" placeholder="Email" autoComplete="email"  />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control mb-3" id="password" placeholder="Password" autoComplete="current-password"  />
                    <button type="submit" className="btn btn-lg w-100 submit-button" >Register</button>
                </form>
            </div>
    )
}

export default Register