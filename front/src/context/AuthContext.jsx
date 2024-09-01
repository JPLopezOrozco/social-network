import { createContext, useState, useEffect, useContext } from "react";
import ApiContext from "./ApiContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext



export const AuthProvider = ({children}) =>{

    const {instance, connected, desconnected, login, register, status} = useContext(ApiContext)
    

    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authtokens') ? JSON.parse(localStorage.getItem('authtokens')):null)
    const [user, setUser] = useState(()=> localStorage.getItem('authtokens') ? jwtDecode(localStorage.getItem('authtokens')):null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const loginUser = async(e)=>{
        e.preventDefault(); 
        let response = await login(e)
        if(response.status===200){
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            localStorage.setItem('authtokens', JSON.stringify(response.data))
            navigate('/home')
        }else{
            alert('something went wrong!!!')
        }
    }
    

    useEffect(() => {
        if (authTokens && user) {
            connected(user, authTokens);
            if(status===false){
                logoutUser()
            }
        }
    }, [authTokens, user]);

    const logoutUser = ()=>{
       desconnected(user, authTokens)
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authtokens')
        navigate('/login')
    }

    const updateToken = async()=>{
        if(authTokens){
            try{
                let response = await instance.post('/token/refresh/',{
                    'refresh':authTokens?.refresh
                })
                if(response.status===200){
                    setAuthTokens(response.data)
                    setUser(jwtDecode(response.data.access))
                    localStorage.setItem('authtokens', JSON.stringify(response.data))
                }
            }catch{
                logoutUser()
            }
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        const fourMinutes = 1000 * 60 * 4
        const interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    let registerUser = (e)=>{
        e.preventDefault()
        register(e)
        if(response.status===200){

        }
    }


    const authData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser
    }
    

    return(
        <AuthContext.Provider value={authData}>
            {loading ? null :children}
        </AuthContext.Provider>
    )
}


