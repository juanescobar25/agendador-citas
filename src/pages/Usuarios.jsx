import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './Usuarios.css';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        Documento: "",
        Contraseña: "",
        rol: "Cliente"
    });
    const [newUser, setNewUser] = useState({
        nombre: "",
        correo: "",
        Documento: "",
        Contraseña: "",
        rol: "Cliente"
    });

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const res = await axios.get("http://localhost:3000/Usuarios");
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
            await axios.delete(`http://localhost:3000/Usuarios/${String(id)}`);
            fetchUsuarios();
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        }
    };

    const handleEdit = (usuario) => {
        setEditUser(usuario.id);
        setForm({
            nombre: usuario.nombre || "",
            correo: usuario.correo || "",
            Documento: usuario.Documento || "",
            Contraseña: usuario.Contraseña || "",
            rol: usuario.rol || "Cliente"
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
        await axios.put(`http://localhost:3000/Usuarios/${String(editUser)}`, {
            ...form,
            id: String(editUser)
        });
        setEditUser(null);
        setForm({
            nombre: "",
            correo: "",
            Documento: "",
            Contraseña: "",
            rol: "Cliente"
        });
        fetchUsuarios();
        Swal.fire("Actualizado", "El usuario ha sido actualizado.", "success");
    };

    const handleCancel = () => {
        setEditUser(null);
        setForm({
            nombre: "",
            correo: "",
            Documento: "",
            Contraseña: "",
            rol: "Cliente"
        });
    };

    // NUEVO: Manejo de formulario para crear usuario
    const handleNewChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        // Validación simple
        if (!newUser.nombre || !newUser.correo || !newUser.Documento || !newUser.Contraseña) {
            Swal.fire("Error", "Completa todos los campos", "warning");
            return;
        }
        // Verifica que no exista un usuario con el mismo Documento
        const existe = usuarios.find(u => u.Documento === newUser.Documento);
        if (existe) {
            Swal.fire("Error", "Ya existe un usuario con ese documento", "error");
            return;
        }
        await axios.post("http://localhost:3000/Usuarios", {
            ...newUser,
            id: String(newUser.Documento)
        });
        setNewUser({
            nombre: "",
            correo: "",
            Documento: "",
            Contraseña: "",
            rol: "Cliente"
        });
        fetchUsuarios();
        Swal.fire("Creado", "El usuario ha sido creado.", "success");
    };

    return (
        <div className="usuarios-container">
            <h1>Usuarios</h1>

            {/* Formulario para crear nuevo usuario */}
            <form className="usuarios-form-nuevo" onSubmit={handleCreate}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={newUser.nombre}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="correo"
                    placeholder="Correo"
                    value={newUser.correo}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="Documento"
                    placeholder="Documento"
                    value={newUser.Documento}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="Contraseña"
                    placeholder="Contraseña"
                    value={newUser.Contraseña}
                    onChange={handleNewChange}
                />
                <select
                    name="rol"
                    value={newUser.rol}
                    onChange={handleNewChange}
                >
                    <option>Cliente</option>
                    <option>Administrador</option>
                </select>
                <button type="submit">Crear usuario</button>
            </form>

            <div className="usuarios-table-container">
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Documento</th>
                            <th>Contraseña</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) =>
                            editUser === usuario.id ? (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
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
                                            type="text"
                                            name="correo"
                                            value={form.correo}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Documento"
                                            value={form.Documento}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Contraseña"
                                            value={form.Contraseña}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="rol"
                                            value={form.rol}
                                            onChange={handleChange}
                                        >
                                            <option>Cliente</option>
                                            <option>Administrador</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Guardar</button>
                                        <button onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.Documento}</td>
                                    <td>{usuario.Contraseña}</td>
                                    <td>{usuario.rol}</td>
                                    <td>
                                        <button onClick={() => handleEdit(usuario)}>Editar</button>
                                        <button onClick={() => handleDelete(usuario.id)}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;