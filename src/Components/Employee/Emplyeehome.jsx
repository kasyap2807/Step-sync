import React from 'react'
import {useLocation, Route, Routes} from 'react-router-dom'
import EMPhome from './EMPcoponents/EMPhome'

function Emplyeehome() {
    const location = useLocation()
    const data = location.state.jwt
    console.log(data)
  return (
    <div>
        <Routes>
            <Route path='/' element = {<EMPhome/>} />
        </Routes>
    </div>
  )
}

export default Emplyeehome