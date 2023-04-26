import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import '../index.css';

const Write=()=>{

    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
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
        {/* <div className="flex mt-[2%] gap-20 p-[1%]">
            <div className="flex flex-col flex-5 gap-10 ">
                <input className="mx-[5%] border-double border-4 border-black" type="text"  placeholder="Title"  onChange={(e)=>setTitle(e.target.value)}/>
                {/* <input className="mx-[5%] border-double border-4 border-black" type="text"  placeholder="Summary"  onChange={(e)=>setSummary(e.target.value)}/> */}
                {/* <div className="h-[400px] w-[1000px] mb-[5%] ml-[5%] overflow-scroll">
             <ReactQuill className="h-[100%] border-none" theme="snow" value={value} onChange={setValue} />
             </div>
            </div>
            <div className="flex flex-2 flex-col gap-20">
                <div className="border-solid border-black border-4 flex-1 p-[1%] justify-between text-lg ">
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="mt-[10%]">
                    <button className="p-[2%] bg-red-600 border-solid border-2 border-black hover:bg-green-600 hover:border-dashed hover:border-4 hover:border-black" onClick={handleClick}>
                      Publish</button>
                </div>
                </div>
               
                <div className="border-solid border-2 border-gray-400 p-[1%] flex flex-1 flex-col justify-between text-lg " >
                    <h1 className="text-xl font-semibold border-b-[2px] border-b-solid border-b-black items-center flex">Category</h1>
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
            
        </div> */} 
        <div className="flex justify-center mt-10">
  <div className="w-2/3 bg-white shadow-lg rounded-lg p-8">
    <div className="flex flex-col gap-4 mb-8">
      <input
        className="border-2 border-black px-4 py-2 rounded-lg"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="h-96 overflow-scroll">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
    <div className="flex gap-8">
      <div className="flex-1">
        <label
          htmlFor="file"
          className="block text-center font-bold text-lg mb-4 cursor-pointer"
        >
          Upload Image
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleClick}
        >
          Publish
        </button>
      </div>
      <div className="flex-1">
        <div className="border-2 border-gray-400 rounded-lg p-4">
          <h1 className="text-lg font-bold mb-4">Category</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={cat === "anime-review"}
                name="cat"
                value="anime-review"
                id="anime-review"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="anime-review">Review</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={cat === "personal-tt"}
                name="cat"
                value="personal-tt"
                id="personal-tt"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="personal-tt">Top 10</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={cat === "recommendations"}
                name="cat"
                value="recommendations"
                id="recommendations"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="recommendations">Recommendations</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={cat === "other"}
                name="cat"
                value="other"
                id="other"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <Footer/>
        </div>
    )
}

export default Write;