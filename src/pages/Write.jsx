import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const Write=()=>{

    const state = useLocation().state
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [cat, setCat] = useState(state?.cat ||"");
    const [file, setFile] = useState(null)


    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };


      const navigate = useNavigate()

    const handleClick=async e=>{
        e.preventDefault();
    const imgUrl = await upload();
    console.log(file)
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            image:  file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            image:  file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
    } 

    return(
        <div>
            <Navbar/>
        <div className="add">
            <div className="content">
                <input type="text"  placeholder="title"  onChange={(e)=>setTitle(e.target.value)}/>
                <div className="editorcontainer">
             <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
             </div>
            </div>
            <div className="menu">
                <div className="item">
                    {/* <span>
                        <b>Status</b>: Draft
                    </span>
                    <span>
                        <b>visibility </b> :public
                    </span> */}
                    <input style={{display:"none"}} type="file" id="file" name="file" onChange={e=>setFile(e.target.files[0])} />
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setFile(e.target.files[0])}/>
                      {/* <input name="imgUrl" placeholder="enter image url" onChange={e=>setImgURL(e.target.files[0])}/> */}
                    <label htmlFor="file" className="file"> Upload image </label>
                    <div className="buttons">
                    <button>Save as Draft</button>
                    <button onClick={handleClick}>Publish</button>
                </div>
                </div>
               
                <div className="item">
                    <h1>category</h1>
                    <label htmlFor="review" >Review</label>
                    <input type="radio" checked={cat === "anime-review"} name="cat" value="anime-review" id="anime-review"  onChange={(e) => setCat(e.target.value)}/>
                    
                    <label htmlFor="personal-tt" >top10</label>
                    <input type="radio" checked={cat === "personal-tt"}  name="cat" value="personal-tt" id="personal-tt"  onChange={(e) => setCat(e.target.value)} />
                    
                    <label htmlFor="recommendations" >recommendations</label>
                    <input type="radio" checked={cat === "recommendations"} name="cat" value="recommendations" id="recommendations"  onChange={(e) => setCat(e.target.value)} />
                    
                    <label htmlFor="other" >other</label>
                    <input type="radio" checked={cat === "other"} name="cat" value="other" id="other"  onChange={(e) => setCat(e.target.value)} />
                </div>
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}

export default Write;