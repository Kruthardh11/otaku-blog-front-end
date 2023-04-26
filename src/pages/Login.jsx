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
        // <div className=" flex flex-col items-center justify-center h-screen bg-indigo-500">
        //     <h1 className="mb-[3%] text-4xl font-bold">Login</h1>
        //     <form className=" flex flex-col p-[5%] bg-white  rounded-full">
        //         <input className="p-[10%] rounded-full" type="text" placeholder="username" name="username" onChange={handleChange}/>
        //         <input className="p-[10%] rounded-full" type="password" placeholder="password" name="password" onChange={handleChange} />
        //         <button className=" p-[15%] text-lg font-bold " onClick={handleSubmit}>Login</button>
        //         {err && <p>{err}</p>}
        //         <span className="p-[5%] font-normal text-lg">Don't you have an account?<Link to='/register' className="font-semibold text-xl">Register</Link></span>
        //     </form>
        // </div>
        <div className="flex flex-col items-center justify-center h-screen bg-indigo-500">
  <h1 className="mb-8 text-4xl font-bold text-white">Login</h1>
  <form className="w-96 bg-white rounded-xl shadow-md p-8">
    <div className="mb-6">
      <label className="block mb-2 text-lg font-semibold text-gray-700" htmlFor="username">
        Username
      </label>
      <input className="w-full p-3 rounded-lg border border-gray-300" type="text" placeholder="Enter your username" name="username" onChange={handleChange}/>
    </div>
    <div className="mb-6">
      <label className="block mb-2 text-lg font-semibold text-gray-700" htmlFor="password">
        Password
      </label>
      <input className="w-full p-3 rounded-lg border border-gray-300" type="password" placeholder="Enter your password" name="password" onChange={handleChange}/>
    </div>
    <button className="w-full py-3 mt-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600" onClick={handleSubmit}>Login</button>
    {err && <p className="mt-4 text-red-500">{err}</p>}
    <span className="mt-8 text-lg text-gray-700">
      Don't have an account? 
      <Link to='/register' className="text-indigo-500 font-semibold hover:text-indigo-600 ml-1">
        Register
      </Link>
    </span>
  </form>
</div>

    )
}

export default Login;