import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        Documento: '',
        Contraseña: '',
        rol: 'Cliente'

    })

    const naviagte = useNavigate();

    const handlecange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const res = await axios.get(`https://json-backend-j0dm.onrender.com/Usuarios?Documento=${form.Documento}&correo=${form.correo}`)

            if (res.data.length > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `El usuario con el nombre ${form.nombre} ya esta registrado`,
                    text: 'Intenta con otro nombre de usuario'
                })
                return;
            }    

            await axios.post('https://json-backend-j0dm.onrender.com/Usuarios',{
                id: Number(form.Documento),
                nombre: form.nombre,
                correo: form.correo,
                Documento: form.Documento,
                Contraseña: form.Contraseña,
                rol:form.rol
            })
            Swal.fire({
                icon: 'success',
                title: 'Usuario ' + form.nombre + ' Estas registrado con exito'
            }).then(() =>{
                naviagte('/login')
            })
            
        } catch (error) {
            alert('Error al registrar el usuario')
        }
    }
    return(
        <section className='form-contenedor-fondo-registro'>
            <form className='form-contenedor-principal-registro' onSubmit={handleSubmit}>

            <div className='form-contenedor-principal-registro-contenedor-img-h1-'>
                <img className='form-contenedor-principal-registro-contenedor-img-h1-imagen' src="./logo.png" alt="Esto es una imagen" />
                <h1 className='form-contenedor-principal-registro-contenedor-img-h1-titulo'>Iniciar Sesión</h1>
            </div>

            <div className='form-contenedor-principal-contenedor-inputs-registro'>
                <input type="text" name="nombre" id="nombre" placeholder='Nombre usuario' value={form.nombre} onChange={handlecange} />
                <input type="text" name='correo' id="correo" placeholder='Correo Electronico' value={form.correo} onChange={handlecange} />
                <input type="number" name='Documento' id='Documento' placeholder='Documento' value={form.Documento} onChange={handlecange} />
                <input type="password" name="Contraseña" id="Contraseña" placeholder='Contraseña' value={form.Contraseña} onChange={handlecange} />

                <select name='rol' value={form.rol} onChange={handlecange}>
                    <option>Cliente</option>
                    <option>Administrador</option>
                </select>
            </div>

            <div className='form-contenedor-principal-contenedor-boton-registro'>
                <button className='form-contenedor-principal-contenedor-boton-btn-registro' type="submit">Iniciar Sesión</button>
                <button className='form-contenedor-principal-contenedor-boton-btn-registro' type="submit" >Registrarse</button>
            </div>


        </form>
        </section>
    )
}

export default Register;