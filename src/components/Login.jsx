import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {

    const [form, setForm] = useState({
        nombre: '',
        Contraseña: '',
        rol: 'Cliente'
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!form.nombre.trim() || !form.Contraseña.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.'
            });
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/Usuarios?nombre=${form.nombre}&Contraseña=${form.Contraseña}&rol=${form.rol}`)

            if(res.data.length > 0){
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem('token', token)
                localStorage.setItem('usuario', JSON.stringify(res.data[0]))
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido ' + form.nombre
                }).then(() => {
                    if (form.rol === 'Administrador') {
                        navigate('/admin')
                    }else{
                        navigate('/user')
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Datos Incorrectos',
                    text: 'Verifica tu usuario, contraseña y rol'
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión'
            })
        }
    }

    return(
        <section className='form-contenedor-fondo'>
            <form className='form-contenedor-principal' onSubmit={handleSubmit}>

            <div className='form-contenedor-principal-contenedor-img-h1'>
                <img className='form-contenedor-principal-contenedor-img-h1-imagen' src="./logo.png" alt="Esto es una imagen" />
                <h1 className='form-contenedor-principal-contenedor-img-h1-titulo'>Iniciar Sesión</h1>
            </div>

            <div className='form-contenedor-principal-contenedor-inputs'>
                <input type="text" name="nombre" id="Usuario" placeholder='Nombre usuario' value={form.nombre} onChange={handleChange} />
                <input type="password" name="Contraseña" id="Contraseña" placeholder='Contraseña' value={form.Contraseña} onChange={handleChange} />
                <select name='rol' value={form.rol} onChange={handleChange}>
                    <option>Cliente</option>
                    <option>Administrador</option>
                </select>
            </div>

            <div className='form-contenedor-principal-contenedor-boton'>
                <button className='form-contenedor-principal-contenedor-boton-btn' type="submit">Iniciar Sesión</button>
                <button className='form-contenedor-principal-contenedor-boton-btn' type="button" onClick={() => navigate('/register')}>Registrarse</button>
            </div>

        </form>
        </section>
    )
}

export default Login;