import { Link } from "react-router-dom"
import Header from "../components/Header"
import './Home.css'
function Home() {
    return(
        <section className="home-contenedor">
            <Header />

            <main className="main-contenedor">
                <section className="main-contenedor-img">
                    <img className="main-contenedor-img-imagen" src="./img-citas.jpg" alt="Esto es una imagen" />
                </section>

                <section className="main-contenedor-info">
                    <h1 className="main-contenedor-info-titulo">Te ayudo a pedir tu cita</h1>

                    <ol className="main-contenedor-info-contenedor-list">
                        <li className="main-contenedor-info-contenedor-list-lista"> 
                            si tienes cuenta Inicia Sesión <Link to={"/login"} className="main-contenedor-info-contenedor-list-lista-link">Inicio Sesión</Link>, de lo contrario Registrate <Link to={"/register"} className="main-contenedor-info-contenedor-list-lista-link">Registrate</Link> 
                        </li>
                        <li className="main-contenedor-info-contenedor-list-lista">
                            Selecciona la cita mas cercana
                        </li>
                    </ol>
                </section>
            </main>

        </section>

        
    )
}

export default Home