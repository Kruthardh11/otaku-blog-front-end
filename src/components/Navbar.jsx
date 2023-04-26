import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import '../index.css';

const Navbar=()=>{

    const {currentUser, logout} = useContext(AuthContext)
    return(
        // <div className=" mx-[2%] mb-[2%] bg-violet-600 shadow" >
        //     <div className="padding p-[2%] flex items-center justify-between">

        //         <div className="flex gap-[2%] border-transparent text-black  rounded-md text-sm font-medium">
        //         <Link className="hover:text-white hover:border-white
        //         " to="?cat=anime-review">
        //         <h6 className="font-merriweather text-xl">ANIME REVIEWS</h6>
        //         </Link>
        //         <Link className="hover:text-white hover:border-white " to="?cat=personal-tt">
        //         <h6 className="font-merriweather text-xl">PERSONAL TOP 10s</h6>
        //         </Link>
        //         <Link className="hover:text-white hover:border-white" to="?cat=recomendations">
        //          <h6 className="font-merriweather text-xl">RECOMMNEDATIONS</h6>
        //         </Link></div>
        //         <div className=" mx-[5%] text-xl font-merriweather">
        //            <Link to="/">Blog</Link> 
        //         </div>
        //         <span className="cursor-pointer p-[1%] font-openSans text-lg rounded-full bg-teal-400">{currentUser?.username}</span>
        //         {currentUser ?  (<button className="font-black text-xl hover:bg-black hover:text-white p-[1%]"> 
        //             <span onClick={logout} >Logout</span></button>)  
        //             : (<Link className="font-black text-xl hover:bg-black hover:text-white p-[1%]" to="/login">Login</Link>)}
        //         <span className="font-openSans text-lg rounded-full bg-teal-400 p-[1%] hover:bg-black hover:text-white">
        //             <Link to="/write" >WRITE</Link>
        //         </span>
        //     </div>
        // </div>
    <div className="mx-0 bg-black shadow ">
  <div className="px-4 py-4 flex items-center justify-between">
    <div className="flex gap-4 text-white rounded-md text-sm font-medium">
      <Link className="hover:text-gold hover:border-gold" to="?cat=anime-review">
        <h6 className="font-merriweather text-lg animate-pulse text-gold">ANIME REVIEWS</h6>
      </Link>
      <Link className="hover:text-gold hover:border-gold" to="?cat=personal-tt">
        <h6 className="font-merriweather text-lg animate-pulse text-gold">PERSONAL TOP 10s</h6>
      </Link>
      <Link className="hover:text-gold hover:border-gold" to="?cat=recomendations">
        <h6 className="font-merriweather text-lg animate-pulse text-gold">RECOMMENDATIONS</h6>
      </Link>
    </div>
    <div className="mx-3 text-xl font-merriweather text-white">
      <Link to="/">Blog</Link>
    </div>
    <span className="p-1 font-openSans text-lg rounded-full bg-teal-400 hover:bg-black hover:text-white cursor-pointer">
      {currentUser?.username}
    </span>
    {currentUser ? (
    <button className="p-1 text-white text-lg bg-transparent hover:bg-white hover:text-black border-2 border-white rounded-full transform hover:-translate-y-1 hover:scale-110 transition-all duration-300">
      <span onClick={logout}>Logout</span>
    </button>
    ) : (
    <Link className="p-1 font-black text-xl bg-transparent hover:bg-black hover:text-white" to="/login">Login</Link>
    )}
    <span className="p-1 font-openSans text-lg rounded-full bg-teal-400 hover:bg-black hover:text-white">
      <Link to="/write">WRITE</Link>
    </span>
  </div>
</div>

    )
}

export default Navbar;
