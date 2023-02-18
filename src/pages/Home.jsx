import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home=()=>{

    const [posts, setPosts] = useState([])
    const cat = useLocation().search

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
               const res=  await axios.get(`/posts${cat}`)
               setPosts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [cat])
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    return(
        <div>
            <Navbar/>
        <div className="home">
            
              <div className="posts">
                {posts.map((post)=>(
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post?.image}`} alt="what" />
                        </div>
                        <div className="content">
                            <h1>{getText(post.title)}</h1>
                            <p>{getText(post.desc)}</p>
                            <button ><Link className="link" to={`post/${post.id}`}>Read More</Link></button>
                        </div>
                    </div>
                ))}
              </div>
              
        </div>
        <Footer/>
        </div>
    )
}

export default Home;