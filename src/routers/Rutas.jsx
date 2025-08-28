import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import User from "../pages/User";
import ProtecRuta from "./ProtecRuta";
import Admin from "../pages/admin";
import GestionCitas from "../pages/GestionCitas";
import Usuarios from "../pages/Usuarios";
import Reportes from "../pages/Reportes";

function Rutas() {

    return(
        <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
            <Route path="/user" element = {
                <ProtecRuta>
                    <User/>
                </ProtecRuta>
                } />
            <Route path="/admin" element = {
                <ProtecRuta>
                    <Admin/>
                </ProtecRuta>
                } />
            <Route path="/citas" element = {<GestionCitas/>}/>
            <Route path="/usuarios" element ={<Usuarios/>}/>
            <Route path="/Reportes" element ={<Reportes/>}/>
        </Routes>
    )
    
}

export default Rutas