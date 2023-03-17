import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import '../index.css';
import { BsFillTrashFill } from "react-icons/bs"
import { BsFillPencilFill } from "react-icons/bs";

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
        <div className="bg-fuchsia-100">
            <Navbar/>
        <div className="flex gap-50">
            
            <div className="flex flex-5 flex-col gap-30 p-[20%] pr-[5%] pt-[1%]">
            <h1 className="text-6xl font-merriweather pt-[5%] pb-[3%]">{getText(post.title)}</h1>
            <img className="w-[1000px] h-[600px] object-cover py-[3%]" alt="blog " src={`../upload/${post?.image}`}  />
            <div className="flex items-center gap-[15px]">
                
            {post.userImg && <img alt="user " src={post.userImg} className="w-[75px] h-[75px] object-cover" />}
            <div className="info">
                <span className="font-bold text-lg">{post.username}</span>
                <p>posted {moment(post.date).fromNow()} </p>
            </div>
            
        { currentUser.username === post.username &&   <div className="flex gap-[10px] ">
                <Link to={`/write?edit=2`} state={post} > 
                <BsFillPencilFill className="w-[30px] h-[30px] mx-[20px]"/></Link>
                 <BsFillTrashFill className="w-[30px] h-[30px] ml-[10px]" onClick={handleDelete}/>
            </div>}
            </div>
            
            <div className="font-openSans text-2xl text-justify leading-7  py-[5%]">{ getText(post.desc)}</div> 
            </div>
            <style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,700&display=swap');
</style>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
</style>
            <div><Menu/></div>
        </div>
        <Footer/>
        </div>
    )
}

export default Single;