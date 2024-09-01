import { useRef, useEffect, useContext } from "react"
import ApiContext from "../context/ApiContext";
import AuthContext from "../context/AuthContext";

const CreatePost = ()=>{
    const {createPost} = useContext(ApiContext)
    const {authTokens, user} = useContext(AuthContext)
    const textareaRef = useRef(null)
    
    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

    const handlePost = (e)=>{
        createPost(e, authTokens, user)
    }
    
      useEffect(() => {
        handleInput();
      }, []);

    return(
        <div className="post-container py-3">
            <form action="" onSubmit={handlePost}>
                <div className="post-body">
                      <textarea className="form-control" id="body" placeholder="Create post ..." ref={textareaRef} onInput={handleInput} style={{ overflow: 'hidden' }}/>
                </div>
                <div className="create-post d-flex align-items-center justify-content-between px-3">
                    <button type="submit" className="btn submit-button">Post</button>
                </div>
            </form>
        </div>
    )   
}
export default CreatePost