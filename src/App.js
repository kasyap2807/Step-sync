import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Emplyeehome from "./Components/Employee/Emplyeehome";
import EmployeeDashboard from "./Components/Employee/EMPcoponents/test";
import './App.css'
import Teamlead from "./Components/Employee/EMPcoponents/Teamlead";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/Employee/*" element = {<Emplyeehome/>} />
      </Routes>
      {/* <Teamlead/> */}
    </>
  );
}

export default App;
