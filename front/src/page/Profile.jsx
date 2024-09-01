import { useContext, useEffect, useState } from "react"
import ApiContext from "../context/ApiContext"
import AuthContext from "../context/AuthContext"

import Post from "../components/Post"
import { useParams } from "react-router-dom"

const Profile = ()=>{
    const {user, authTokens} = useContext(AuthContext)
    const {profilePosts, posts, like, getUser, follow, followUser} = useContext(ApiContext)
    const [postUsers, setPostUsers] = useState({})
    const [profileUser, setProfileUser] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const { id } = useParams()
 
    useEffect(()=>{
        profilePosts(id, authTokens)
    },[like])
    const followHandle = ()=>{
        follow(currentUser.id, profileUser.id, profileUser,authTokens)
    }

    useEffect(()=>{
        const fetchUsers = async()=>{
            const current = getUser(user.user_id, authTokens)
            const profile = getUser(id, authTokens)

            const [currentUserData, profileData] = await Promise.all([current, profile])
            
            setProfileUser(profileData)
            setCurrentUser(currentUserData)

            
            const users = {}
            if(posts.length>0){
                for (let post of posts) {
                    const userData =  await getUser(post.user, authTokens);
                    users[post.user] = userData;
                }            
                setPostUsers(users);
            }
        }
        fetchUsers()
    }, [posts, id, followUser])
    



    return(
        <>
        <h3>{profileUser.username}</h3>
        <div className="d-flex">
            <p className="mx-3">Following: {profileUser.following && profileUser.following.length}</p>
            <p className="mx-3">Followers: {profileUser.followers && profileUser.followers.length}</p>
        </div>
        {profileUser.username===currentUser.username?(
            <br />
        ):(
            profileUser.followers.includes(currentUser.id)?(
                <button onClick={followHandle} className="btn follow-button mb-3">Unfollow</button>
            ):(
                <button onClick={followHandle} className="btn follow-button mb-3">Follow</button>
            )
        )
        }
        {posts && posts.map(post=>(
                <Post key={post.id} post={post} user={postUsers[post.user]} />
            ))}
        </>
    )
}

export default Profile