import { useContext, useEffect, useState } from "react"
import ApiContext from "../context/ApiContext"
import AuthContext from "../context/AuthContext"

import Post from "../components/Post"

const Follow = ()=>{
    const {user, authTokens} = useContext(AuthContext)
    const {followPosts, posts, like, getUser} = useContext(ApiContext)
    const [postUsers, setPostUsers] = useState({})


    useEffect(()=>{
        followPosts(user.user_id, authTokens)
    },[like])

    useEffect(()=>{
        const fetchUsers = async()=>{
            const users = {}
            for (let post of posts) {
                const userData =  await getUser(post.user, authTokens);
                users[post.user] = userData;
            }            
            setPostUsers(users);
        }
        fetchUsers()

    }, [posts])

    return(
        <>
        {posts.map(post=>(
                <Post key={post.id} post={post} user={postUsers[post.user]} />
            ))}
        </>
    )
}

export default Follow