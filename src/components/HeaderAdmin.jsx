import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './HeaderAdmin.css'
const HeaderAdmin = () => {

    const [nombre, setNombre] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('usuario'));
        if(user && user.nombre){
            setNombre(user.nombre);
            setUsuario(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    }

    return(
        <section className="header-admin">

            <div className="header-admin-contenedor-titulo">
                <h1>Hola, {nombre} !Bienvenid@!</h1>
            </div>

            <div className="header-admin-contenedor-info">
                <button onClick={() => setShowModal(true)}>Información</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>

            {showModal && usuario && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Información del Usuario</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Nombre:</strong></td>
                                    <td>{usuario.nombre}</td>
                                </tr>
                                <tr>
                                    <td><strong>Correo:</strong></td>
                                    <td>{usuario.correo}</td>
                                </tr>
                                <tr>
                                    <td><strong>Documento:</strong></td>
                                    <td>{usuario.id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Rol:</strong></td>
                                    <td>{usuario.rol}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </section>
    )
}
export default HeaderAdmin;