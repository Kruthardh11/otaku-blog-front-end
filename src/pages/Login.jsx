import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import '../index.css';

const Login=()=>{

    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    })

    const handleChange =e=>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value  }))
    }

    const [err, setError] = useState(null);
    const { login } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        //  await axios.post("/auth/register", inputs);
         await login(inputs)
          navigate("/")
        } catch (err) {
            setError(err.response.data);
        }
      };
    return(
        <div className=" flex flex-col items-center justify-center h-screen bg-indigo-500">
            <h1 className="mb-[3%] text-4xl font-bold">Login</h1>
            <form className=" flex flex-col p-[5%] bg-white  rounded-full">
                <input className="p-[10%] rounded-full" type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input className="p-[10%] rounded-full" type="password" placeholder="password" name="password" onChange={handleChange} />
                <button className=" p-[15%] text-lg font-bold " onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span className="p-[5%] font-normal text-lg">Don't you have an account?<Link to='/register' className="font-semibold text-xl">Register</Link></span>
            </form>
        </div>
    )
}

export default Login;