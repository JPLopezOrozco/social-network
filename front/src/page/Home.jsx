import { useContext, useEffect, useState} from "react"
import AuthContext from "../context/AuthContext"
import ApiContext from "../context/ApiContext"

import Post from "../components/Post"
import CreatePost from "../components/CreatePost"

const Home = ()=>{
    const {user, authTokens} =  useContext(AuthContext)
    const {homePosts, posts, like, getUser} = useContext(ApiContext)
    const [postUsers, setPostUsers] = useState({})

    useEffect(()=>{
        homePosts(user.user_id, authTokens)
    }, [like])

    

    useEffect(()=>{
        const fetchUsers = async()=>{
            const users = {}
            for (let post of posts) {
                const userData =  await getUser(post.user, authTokens);
                users[post.user] = userData;
            }            
            setPostUsers(users);
        }
        if(posts.length>0){
            fetchUsers()
        }
    }, [posts])

    return(
        <>  
            <CreatePost />
            {posts.map(post=>(
                <Post key={post.id} post={post} user={postUsers[post.user]} />
            ))}
        </>
    )
}

export default Home