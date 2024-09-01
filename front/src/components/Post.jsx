import { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import ApiContext from "../context/ApiContext"
import AuthContext from "../context/AuthContext"


const Post = (prop)=>{
    const {authTokens, user} = useContext(AuthContext)
    const {likeHandler} = useContext(ApiContext)


    const like = (e)=>{
        likeHandler(e, authTokens, user)
    }
    return(
        <>
        <div className="post-container">
            <Link className="nav-link" to={`/profile/${prop.post.user}`}>
                <h3 className="mt-3 ps-3" >{prop.user?prop.user.username:"loading..."}</h3>
            </Link>
            <Link className="nav-link" to={`/post/${prop.post.id}`}>
                <p className="px-3 w-100">{prop.post.body}</p>
            </Link>
            <div>
                {prop.post.likes.includes(user.user_id)?(
                    <p className="ps-3 like"> <i onClick={like} id={prop.post.id} className="bi bi-heart-fill like-heart"> </i>{prop.post.likes.length}</p>
                ):(
                    <p className="ps-3 like"> <i onClick={like} id={prop.post.id} className="bi bi-heart"> </i>{prop.post.likes.length}</p>
                )}
            </div>
        </div>
        </>
    )
}

export default Post