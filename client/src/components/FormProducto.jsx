import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useEmpleado } from "../context/empleadoContext";

//ESTE COMPONENTE NO ESTA TERMINADO :D
const RegistroEmpleados = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [error, setError] = useState("");
  const {
    createEmpleado,
    getEmpleado,
    empleados,
    deleteEmpleado,
    updateEmpleado,
  } = useEmpleado();

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await createEmpleado(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El empleado ha sido registrado correctamente.",
      });
      setFormData({
        nombre: "",
        correo: "",
        contraseña: "",
      });
      await getEmpleado();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al registrar al empleado.",
        footer: error,
      });
    }
  };

  const handleDeleteEmpleado = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpleado(val.idEmpleado)
          .then(() => {
            Swal.fire({
              title: "Registro eliminado!",
              html:
                "<i>El empleado <strong>" +
                val.nombre +
                "</strong> fue eliminado exitosamente!</i>",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se puede eliminar el empleado!",
              footer: '<a href="#">Intente más tarde</a>',
            });
          });
      }
    });
  };

  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await updateEmpleado(id, formData);
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html:
          "<i>El empleado <strong>" +
          formData.nombre +
          "</strong> fue actualizado con éxito! </i>",
        icon: "success",
      });
      await getEmpleado();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede actualizar el empleado!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };

  const setEmpleado = (val) => {
    setEditar(true);
    setFormData({
      nombre: val.nombre,
      correo: val.correo,
      contraseña: val.contraseña,
    });
    setId(val.idEmpleado);
  };

  const limpiar = () => {
    setFormData({
      nombre: "",
      correo: "",
      contraseña: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getEmpleado();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de Productos</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h2 className="sub-titles-copm">Nuevo Producto</h2>
          <form onSubmit={editar ? handleUpdateEmpleado : handleCreateEmpleado}>
            <div>
              <label htmlFor="codProducto">Código de Producto</label>
              <input
                type="text"
                id="codProducto"
                name="codProducto"
                placeholder="Ingrese el código de producto"
                autoComplete="off"
                value={formData.codProducto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="Categoria">Categoría</label>
              <select
                id="Categoria"
                name="Categoria"
                placeholder="Ingrese el ID de categoría"
                autoComplete="off"
                value={formData.idCategoria}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="Proveedor">ID de Proveedor</label>
              <select
                id="Proveedor"
                name="Proveedor"
                placeholder="Ingrese el ID de proveedor"
                autoComplete="off"
                value={formData.idProveedor}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="nombProducto">Nombre del Producto</label>
              <input
                type="text"
                id="nombProducto"
                name="nombProducto"
                placeholder="Ingrese el nombre del producto"
                autoComplete="off"
                value={formData.nombProducto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="precioCompra">Precio de Compra</label>
              <input
                type="number"
                id="precioCompra"
                name="precioCompra"
                placeholder="Ingrese el precio de compra"
                autoComplete="off"
                value={formData.precioCompra}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="precioVenta">Precio de Venta</label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                placeholder="Ingrese el precio de venta"
                autoComplete="off"
                value={formData.precioVenta}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="vecimiento">Fecha de Vencimiento</label>
              <input
                type="date"
                id="vecimiento"
                name="vecimiento"
                placeholder="Ingrese la fecha de vencimiento"
                autoComplete="off"
                value={formData.vecimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              {editar ? (
                <div>
                  <button type="submit_2">Actualizar</button>
                  <button type="button" onClick={limpiar}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button type="submit">Registrar</button>
              )}
            </div>
          </form>
        </div>

        <div className="table-container">
          <h2 className="sub-titles-copm">Productos Registrados</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* {empleados.map((val) => (
                  <tr key={val.idUsuario}>
                    <td>{val.nombre}</td>
                    <td>{val.correo}</td>
                    <td>{val.contraseña}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => setEmpleado(val)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteEmpleado(val)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmpleados;