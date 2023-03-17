
import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Home from "./pages/Home";

import './index.css' ;



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Home/>
    </div>,
    
  },
  {
    path: "/post/:id",
    element: <Single/>
  },
  {
    path:"/write",
    element: <Write/>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);
//bg-[url('C:\react\RealBlog\front-end\public\images\a.jpg')] bg-cover bg-no-repeat bg-opacity-25
function App() {
  return (
    <div className="flex justify-center ">
      <div className="container">
      <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;
