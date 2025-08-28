import { Link } from 'react-router-dom'
import './Header.css'

const Header = () =>{
    return(
        <header className='header'>

            <section className='header-contenedor-logo'>
                <img className='header-contenedor-logo-img' src="./logo.png" alt="Esto es una imagen" />
            </section>

            <nav className='header-contenedor-nav'>
                <Link to={"/login"} className='header-contenedor-nav-link'>Iniciar Sesión</Link>
                <Link to={"/register"} className='header-contenedor-nav-link'>Registrarse</Link>
            </nav>
            
        </header>
    )
}

export default Header