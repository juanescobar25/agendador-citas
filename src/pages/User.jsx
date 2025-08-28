import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import './UserCards.css'; // Crea este archivo para estilos si lo deseas

function User() {
    const [citas, setCitas] = useState([]);
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        const res = await axios.get("http://localhost:3001/Citas");
        setCitas(res.data);
    };

    // Tomar una cita disponible
    const tomarCita = async (cita) => {
        await axios.put(`api/Citas/${cita.id}`, {
            ...cita,
            usuarioId: usuario.id
        });
        fetchCitas();
        Swal.fire("¡Listo!", "Has tomado la cita.", "success");
    };

    // Liberar una cita agendada
    const liberarCita = async (cita) => {
        await axios.put(`api/Citas/${cita.id}`, {
            ...cita,
            usuarioId: ""
        });
        fetchCitas();
        Swal.fire("Cita liberada", "Has liberado la cita.", "info");
    };

    // Citas disponibles (no asignadas)
    const citasDisponibles = citas.filter(c => !c.usuarioId);

    // Citas del usuario logueado
    const misCitas = citas.filter(c => String(c.usuarioId) === String(usuario.id));

    return (
        <section>
            <HeaderAdmin />
            <div className="user-cards-container">
                {/* Card de Citas Disponibles */}
                <div className="user-card">
                    <h2>Citas Disponibles</h2>
                    {citasDisponibles.length === 0 && <p>No hay citas disponibles.</p>}
                    {citasDisponibles.map(cita => (
                        <div className="user-cita-card" key={cita.id}>
                            <h3>{cita.nombre}</h3>
                            <p><strong>Fecha:</strong> {cita.fecha}</p>
                            <p><strong>Hora:</strong> {cita.hora}</p>
                            <p><strong>Lugar:</strong> {cita.lugar}</p>
                            <p><strong>Descripción:</strong> {cita.descripcion}</p>
                            <p><strong>Administrador:</strong> {cita.Administrador}</p>
                            <button onClick={() => tomarCita(cita)}>Tomar cita</button>
                        </div>
                    ))}
                </div>

                {/* Card de Citas Agendadas */}
                <div className="user-card">
                    <h2>Mis Citas Agendadas</h2>
                    {misCitas.length === 0 && <p>No tienes citas agendadas.</p>}
                    {misCitas.map(cita => (
                        <div className="user-cita-card" key={cita.id}>
                            <h3>{cita.nombre}</h3>
                            <p><strong>Fecha:</strong> {cita.fecha}</p>
                            <p><strong>Hora:</strong> {cita.hora}</p>
                            <p><strong>Lugar:</strong> {cita.lugar}</p>
                            <p><strong>Descripción:</strong> {cita.descripcion}</p>
                            <p><strong>Administrador:</strong> {cita.Administrador}</p>
                            <button onClick={() => liberarCita(cita)}>Liberar cita</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default User;