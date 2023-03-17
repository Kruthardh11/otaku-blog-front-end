import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../index.css';
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
        <div className="flex flex-col items-center justify-center h-[100%] bg-red-500">
            <h1 className="mt-[3%] text-3xl font-semibold">Register</h1>
            <form className="flex flex-col p-[5%]  gap-30 border-2xl">
                <input className="border-none p-[5%] border-b-2 border-gray-400 m-[2%] " required type="text" placeholder="username"  name="username" onChange={handleChange}/>
                <input className="border-none p-[5%] border-b-2 border-gray-400 m-[2%]" required type="email" placeholder="enter your email" name="email" onChange={handleChange}/>
                <input className="border-none p-[5%] border-b-2 border-gray-400 m-[2%]" required type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit} type="button" className=" m-[2%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-md" >
                    Register</button>
                    {err && <p>User already exists!!</p>}
                <span className="text-xl m-[2%]">If you already have an account<Link to='/login' className="font-bold italic "><br></br>Login</Link></span>
            </form>
        </div>
    )
}

export default Register;