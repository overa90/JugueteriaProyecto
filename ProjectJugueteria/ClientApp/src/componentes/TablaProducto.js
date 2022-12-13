import { Table} from "reactstrap"


const TablaProducto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarProducto, editarProducto1 }) => {
    //const enviarDatos = (producto) => {
    //    setEditar(producto)
    //}

    return (

        <Table striped responsive>
            <thead>
                <tr className="bg-info">
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Edad</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">
                                Sin registros
                            </td>
                        </tr>
                    ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.edad}</td>
                                    <td>{item.compania}</td>
                                    <td>{item.precio}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary me-2" size="sm" onClick={() => editarProducto1(item)}>
                                            Editar</button>
                                        <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(item.id) } >
                                            Eliminar</button>
                                    </td>
                                </tr>
                                ))
                            )
                }
            </tbody>
        </Table>

    )
}

export default TablaProducto;