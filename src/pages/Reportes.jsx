import { useEffect, useState } from "react";
import axios from "axios";
import './Reportes.css'; // Crea este archivo para estilos si lo deseas

const Reportes = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        const res = await axios.get("http://localhost:3000/Citas");
        setCitas(res.data);
    };

    // Filtrar citas disponibles (sin usuario asignado)
    const citasDisponibles = citas.filter(cita => !cita.usuarioId);

    return (
        <div className="reportes-container">
            <h1>Citas Disponibles</h1>
            <div className="cards-container">
                {citasDisponibles.length === 0 && <p>No hay citas disponibles.</p>}
                {citasDisponibles.map(cita => (
                    <div className="card-cita" key={cita.id}>
                        <h2>{cita.nombre}</h2>
                        <p><strong>Fecha:</strong> {cita.fecha}</p>
                        <p><strong>Hora:</strong> {cita.hora}</p>
                        <p><strong>Lugar:</strong> {cita.lugar}</p>
                        <p><strong>Descripción:</strong> {cita.descripcion}</p>
                        <p><strong>Administrador:</strong> {cita.Administrador}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reportes;