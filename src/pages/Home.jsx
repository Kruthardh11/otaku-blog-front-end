import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../index.css'
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
        <div className="mb-[10%] m-[3%]">
            <div>Please Login to read more of the blog</div>
              <div className="flex mt-[10%] flex-col gap-100">
                {posts.map((post)=>(
                    <div className="flex gap-50 [&>*:nth-child(odd)]:flex-row-reverse m-[20px]" key={post.id}>
                        <div className="flex  relative  after:w-[100%] after:h-[100%] after:bg-teal-400 after:absolute after:top-5 after:right-5  after:z-[-1] ">
                            <img className="flex-1 relative " src={`../upload/${post?.image}`} alt="what" />
                        </div>
                        <div className="flex-2 felx flex-col justify-between mx-[2%] ">
                            <h1 className="text-4xl my-[4%] font-merriweather underline ">{getText(post.title)}</h1>
                            <p className="text-2xl my-[4%] font-openSans">{getText(post.desc).slice(0,100)+"..."}</p>
                            
                            <style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,700&display=swap');
</style>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
</style>
                            <button className=" border-double border-4 border-teal-400 p-[1%] hover:bg-teal-500 hover:border-black hover:border-dashed"><Link  to={`post/${post.id}`}>Read More</Link></button>
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