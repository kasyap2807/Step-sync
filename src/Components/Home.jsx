import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()

    const login = () =>{
        navigate("/login")
    }
  return (
    <div>Home
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Home