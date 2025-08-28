import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './Usuarios.css'; // Puedes usar el mismo CSS de usuarios para la tabla

const GestionCitas = () => {
    const [citas, setCitas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [editCita, setEditCita] = useState(null);
    const [form, setForm] = useState({
        nombre: "",
        fecha: "",
        hora: "",
        lugar: "",
        descripcion: "",
        usuarioId: "",
        Administrador: ""
    });
    const [newCita, setNewCita] = useState({
        nombre: "",
        fecha: "",
        hora: "",
        lugar: "",
        descripcion: "",
        usuarioId: "",
        Administrador: ""
    });
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetchCitas();
        fetchUsuarios();
    }, []);

    const fetchCitas = async () => {
        const res = await axios.get("http://localhost:3001/Citas");
        setCitas(res.data);
    };

    const fetchUsuarios = async () => {
        const res = await axios.get("http://localhost:3001/Usuarios");
        setUsuarios(res.data);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar",
            cancelButtonText: "Cancelar"
        });
        if (confirm.isConfirmed) {
            await axios.delete(`api/Citas/${String(id)}`);
            fetchCitas();
            Swal.fire("Eliminado", "La cita ha sido eliminada.", "success");
        }
    };

    const handleEdit = (cita) => {
        setEditCita(cita.id);
        setForm({
            nombre: cita.nombre || "",
            fecha: cita.fecha || "",
            hora: cita.hora || "",
            lugar: cita.lugar || "",
            descripcion: cita.descripcion || "",
            usuarioId: cita.usuarioId || "",
            Administrador: cita.Administrador || ""
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validar si ya existe una cita con el mismo administrador, fecha y hora (excluyendo la cita actual)
        const existe = citas.some(
            c => c.Administrador === form.Administrador &&
                 c.fecha === form.fecha &&
                 c.hora === form.hora &&
                 c.id !== editCita
        );
        if (existe) {
            Swal.fire("Error", "Ya existe una cita para este administrador en esa fecha y hora.", "error");
            return;
        }

        await axios.put(`http://localhost:3000/Citas/${String(editCita)}`, {
            ...form,
            id: String(editCita)
        });
        setEditCita(null);
        setForm({
            nombre: "",
            fecha: "",
            hora: "",
            lugar: "",
            descripcion: "",
            usuarioId: "",
            Administrador: ""
        });
        fetchCitas();
        Swal.fire("Actualizado", "La cita ha sido actualizada.", "success");
    };

    const handleCancel = () => {
        setEditCita(null);
        setForm({
            nombre: "",
            fecha: "",
            hora: "",
            lugar: "",
            descripcion: "",
            usuarioId: "",
            Administrador: ""
        });
    };

    // Formulario para crear cita
    const handleNewChange = (e) => {
        setNewCita({
            ...newCita,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCita.nombre || !newCita.fecha || !newCita.hora || !newCita.lugar || !newCita.Administrador) {
            Swal.fire("Error", "Completa todos los campos", "warning");
            return;
        }

        // Validar si ya existe una cita con el mismo administrador, fecha y hora
        const existe = citas.some(
            c => c.Administrador === newCita.Administrador &&
                 c.fecha === newCita.fecha &&
                 c.hora === newCita.hora
        );
        if (existe) {
            Swal.fire("Error", "Ya existe una cita para este administrador en esa fecha y hora.", "error");
            return;
        }

        await axios.post("http://localhost:3000/Citas", {
            ...newCita,
            id: String(Date.now())
        });
        setNewCita({
            nombre: "",
            fecha: "",
            hora: "",
            lugar: "",
            descripcion: "",
            usuarioId: "",
            Administrador: ""
        });
        fetchCitas();
        Swal.fire("Creada", "La cita ha sido creada.", "success");
    };

    // Filtrar usuarios por rol
    const clientes = usuarios.filter(u => u.rol === "Cliente");
    const admins = usuarios.filter(u => u.rol === "Administrador");

    // Lógica para filtrar citas por búsqueda
    const citasFiltradas = citas.filter(cita => {
        const usuarioNombre = usuarios.find(u => String(u.id) === String(cita.usuarioId))?.nombre || "";
        return usuarioNombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <div className="usuarios-container">
            <h1>Gestión de Citas</h1>

            {/* Formulario para crear nueva cita */}
            <form className="usuarios-form-nuevo" onSubmit={handleCreate}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la cita"
                    value={newCita.nombre}
                    onChange={handleNewChange}
                />
                <input
                    type="date"
                    name="fecha"
                    value={newCita.fecha}
                    onChange={handleNewChange}
                />
                <input
                    type="time"
                    name="hora"
                    value={newCita.hora}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="lugar"
                    placeholder="Lugar"
                    value={newCita.lugar}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={newCita.descripcion}
                    onChange={handleNewChange}
                />
                <select
                    name="usuarioId"
                    value={newCita.usuarioId}
                    onChange={handleNewChange}
                >
                    <option value="">Asignar a usuario</option>
                    {clientes.map(u => (
                        <option key={u.id} value={u.id}>{u.nombre}</option>
                    ))}
                </select>
                <select
                    name="Administrador"
                    value={newCita.Administrador}
                    onChange={handleNewChange}
                >
                    <option value="">Administrador encargado</option>
                    {admins.map(a => (
                        <option key={a.id} value={a.nombre}>{a.nombre}</option>
                    ))}
                </select>
                <button type="submit">Crear cita</button>
            </form>

            {/* Buscador */}
            <input
                type="text"
                placeholder="Buscar por nombre de usuario"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                style={{marginBottom: "1rem", padding: "0.4rem", borderRadius: "5px", border: "1px solid #ccc"}}
            />

            <div className="usuarios-table-container">
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Lugar</th>
                            <th>Descripción</th>
                            <th>Usuario</th>
                            <th>Administrador</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citasFiltradas.map((cita) =>
                            editCita === cita.id ? (
                                <tr key={cita.id}>
                                    <td>{cita.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="fecha"
                                            value={form.fecha}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            name="hora"
                                            value={form.hora}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="lugar"
                                            value={form.lugar}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="descripcion"
                                            value={form.descripcion}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="usuarioId"
                                            value={form.usuarioId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Asignar a usuario</option>
                                            {clientes.map(u => (
                                                <option key={u.id} value={u.id}>{u.nombre}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            name="Administrador"
                                            value={form.Administrador}
                                            onChange={handleChange}
                                        >
                                            <option value="">Administrador encargado</option>
                                            {admins.map(a => (
                                                <option key={a.id} value={a.nombre}>{a.nombre}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Guardar</button>
                                        <button onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={cita.id}>
                                    <td>{cita.id}</td>
                                    <td>{cita.nombre}</td>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.lugar}</td>
                                    <td>{cita.descripcion}</td>
                                    <td>
                                        {usuarios.find(u => String(u.id) === String(cita.usuarioId))?.nombre || "Sin asignar"}
                                    </td>
                                    <td>{cita.Administrador}</td>
                                    <td>
                                        <button onClick={() => handleEdit(cita)}>Editar</button>
                                        <button onClick={() => handleDelete(cita.id)}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionCitas;