import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register=()=>{

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })

    const handleChange =e=>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value  }))
    }

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         await axios.post("/auth/register", inputs);
          navigate("/login")
        } catch (err) {
            setError(err.response.data);
        }
      };

    return(
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="username"  name="username" onChange={handleChange}/>
                <input required type="email" placeholder="enter your email" name="email" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit} type="button" >Register</button>
                    {err && <p>User already exists!!</p>}
                <span>If you already have an account--<Link to='/login' >Login</Link></span>
            </form>
        </div>
    )
}

export default Register;