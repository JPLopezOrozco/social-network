import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ApiContext = createContext()

export default ApiContext

export const ApiProvider = ({children})=>{
    const [posts, setPosts] =  useState([])
    const [detail, setDetail] = useState(null)
    const [status, setStatus] = useState(true)
    const [like, setLike] = useState(false)
    const [followUser, setFollowUser] = useState(false)
    
    const navigate = useNavigate()

    const instance = axios.create({
        baseURL:'http://127.0.0.1:8000/api/',
        headers:{
            'Content-Type': 'application/json',
        }
    })
    
    const homePosts = async(user, authTokens)=>{
        instance.get(`posts/?home=${user}`, {
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((response)=>{
            setPosts(response.data)
        })
    
    }

    const profilePosts = async(user, authTokens)=>{
        instance.get(`posts/?user=${user}`,{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((response)=>{
            setPosts(response.data)
        })
    }
    const followPosts = async(user, authTokens)=>{
        instance.get(`posts/?follow=${user}`,{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((response)=>{
            setPosts(response.data)
        })
    }
    
    const post = async(id, authTokens)=>{
        const response = await instance.get(`posts/${id}`,{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        if(response.status==200){
            if(detail === null){
                setDetail(response.data)
            }else{
                if(response.data.id!==detail.id){
                    setDetail(response.data)
                }
            }
        }
    }
    

    const createPost = async(e, authTokens, user)=>{
        e.preventDefault()
        const body = e.target.body.value
        const id = user.user_id
        const response = await instance.post('posts/',{
            'user':id,
            'body':body,
            'likes':[],

        },{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        if(response.status === 201){
            navigate(`/profile/${id}`)
        }
    }

    const likeHandler = async(e, authTokens, user)=>{

        const id = parseInt(e.target.id)
        const userId = user.user_id
        const response = await instance.get(`/posts/${id}`,{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }) 
        const likes = response.data.likes
        const updateLike = likes.includes(userId)?likes.filter(likeId => likeId !== userId):[...likes, userId]

        await instance.put(`/posts/${id}/`,{
            ...response.data,
            likes:updateLike,
        },{
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        .then(()=>{
            setLike(!like)
            console.log(response.data)
        })
    }

    const connected = async(user, authTokens)=>{
        await instance.put(`/users/${user.user_id}/`,{
            ...user,
            is_connected:true,
        }, {
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        .catch((error)=>{
            console.log(error)
            setStatus(false)
        })
    }
    const desconnected = async(user, authTokens)=>{
        await instance.put(`/users/${user.user_id}/`,{
            ...user,
            is_connected:false,
        }, {
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        .catch((error)=>{
        })
    }

    const login = async(e)=>{
        const response = await instance.post('/token/',{
            'username':e.target.username.value,
            'password':e.target.password.value,
        })
        return response
    }

    const register = async(e)=>{
        await instance.post('/users/',{
            'username':e.target.username.value,
            'password':e.target.password.value,
            'email':e.target.email.value,
        })
        .catch(alert('Username already exists'))
    }

    const getUser = async(user, authTokens)=>{
        const response = await instance.get(`users/${user}`,{
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        if(response.status === 200){
            return response.data
        }

    }
    const follow = async( currentId, profileId, profile, authTokens)=>{
        const follower = profile.followers
        const updateFollow = follower.includes(currentId)?follower.filter(followerId => followerId !== currentId):[...follower, currentId]

        await instance.put(`/users/${profileId}/`,{
            ...profile,
            followers:updateFollow,
        },{
            headers:{
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        }).then(()=>{
            setFollowUser(!followUser)
        }
        )
    }

    const apiData = {
        instance:instance,
        posts:posts,
        detail:detail,
        status:status,
        like:like,
        followUser:followUser,
        homePosts,
        profilePosts,
        followPosts,
        createPost,
        post,
        likeHandler,
        login,
        register,
        connected,
        desconnected,
        getUser,
        follow,
    }
    return(
        <ApiContext.Provider value={apiData}>
            {children}
        </ApiContext.Provider>
    )
}