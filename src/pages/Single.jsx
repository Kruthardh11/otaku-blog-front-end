import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single=()=>{

    const [post, setPost] = useState({})
    const location = useLocation()

    const postId = location.pathname.split("/")[2]
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
               const res=  await axios.get(`/posts/${postId}`)
               setPost(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [postId])

    const { currentUser } = useContext(AuthContext);

    const handleDelete = async ()=>{
        try{
            await axios.delete(`/posts/${postId}`)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    return(
        <div>
            <Navbar/>
        <div className="single">
            
            <div className="content">
            <img alt="blog " src={`../upload/${post?.image}`}  />
            <div className="user">
            {post.userImg && <img alt="user " src={post.userImg} />}
            <div className="info">
                <span>{post.username}</span>
                <p>posted {moment(post.date).fromNow()} </p>
            </div>
        { currentUser.username === post.username &&   <div className="edit">
                <Link to={`/write?edit=2`} state={post} > 
                    {/* add image for edit and delete buttons */ }
                <img alt="edit"/></Link>
                <img alt="del" onClick={handleDelete}/>
            </div>}
            </div>
            <h1>{getText(post.title)}</h1>
             {getText(post.desc)}
            </div>
            <div><Menu/></div>
        </div>
        <Footer/>
        </div>
    )
}

export default Single;