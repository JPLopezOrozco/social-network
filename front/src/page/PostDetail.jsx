import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ApiContext from "../context/ApiContext"
import AuthContext from "../context/AuthContext"
import Post from "../components/Post"

const PostDetail = ()=>{

    const {post, detail, getUser} = useContext(ApiContext)
    const {authTokens} = useContext(AuthContext)
    const [postUser, setPostUser] = useState()

    const { id } = useParams();

    useEffect(()=>{
        post(id  , authTokens)
    },[id, detail])

    useEffect(()=>{
        if(detail){
            const fetchUsers = async()=>{
                const userData =  await getUser(detail.user, authTokens);
                setPostUser(userData);
            }
            fetchUsers()
        }

    }, [detail])

    return(
        <>
        {detail && <Post key={detail.id} post={detail} user={postUser} />}
        </>
    )
}

export default PostDetail