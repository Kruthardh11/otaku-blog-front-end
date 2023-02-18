import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar=()=>{

    const {currentUser, logout} = useContext(AuthContext)
    return(
        <div className="navbar" >
            <div className="container">
                <div className="logo">
                   <Link to="/">TheBlog</Link> 
                </div>
                <div className="links">
                <Link className="link" to="?cat=anime-review">
                <h6>ANIME-REVIEWS</h6>
                </Link>
                <Link className="link" to="?cat=personal-tt">
                <h6>PERSONAL TOP 10s</h6>
                </Link>
                <Link className="link" to="?cat=recomendations">
                 <h6>RECOMMNEDATIONS</h6>
                </Link></div>
                <span>{currentUser?.username}</span>
                {currentUser ?  (<span onClick={logout} >Logout</span>) : (<Link className="link" to="/login">Login</Link>)}
                <span className="write">
                    <Link to="/write" >WRITE</Link>
                </span>
            </div>
        </div>
    )
}

export default Navbar;