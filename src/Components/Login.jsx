import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [data,Setdata] = useState("its null")

    const login = async () =>{
        let data = {
            "empid":76,
            "password":"Kasyap@2003"
        }
        const response = await axios.post('http://127.0.0.1:5000/login',data)
        if(response.data.jwt != undefined){
            // console.log(response.data.jwt)
            Setdata(response.data.jwt)
            navigate("/Employee",{state:{
                jwt : response.data.jwt
            }
            })
        }
        else{
            Setdata("try again")
        }
    }
  return (
    <div>Login
        <button onClick={login}>login</button>
        <h1>{data}</h1>
    </div>
  )
}

export default Login