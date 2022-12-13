import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,Modal,ModalBody,ModalFooter,ModalHeader } from "reactstrap"
import TablaProducto from './componentes/TablaProducto';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
    const [productos, setProductos] = useState([])
    const [editar, setEditar] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalElimiar, setMostrarModalEliminar] = useState(false);
    const [idEliminar, setIdEliminar] = useState(null);
    const [editarProducto, setEditarProducto] = useState(false);


    const ModeloProducto = {
        id: 0,
        nombre: "",
        descripcion: "",
        edad: "",
        compania: "",
        precio: ""
    };

    //const [producto, setProducto] = useState(ModeloProducto);


    const [productoSeleccionado, setProductoSeleccionado] = useState({
        id: 0,
        nombre: "",
        descripcion: "",
        edad: "",
        compania: "",
        precio: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoSeleccionado({
            ...productoSeleccionado,
            [name]: value

        });
    }


    const openCloseModal = () => {
        setMostrarModal(!mostrarModal);
        setEditarProducto(false)

    }

   

    const listProductos = async () => {
        const res = await fetch("api/producto/GetProducts");

        if (res.ok) {
            const data = await res.json();
            setProductos(data);
        }
        else {
            console.log("Error fatal");
        }

    }

    const CreateBase = async () => {
        const res = await fetch("api/producto/createBase");

        if (res.ok) {
            console.log("Base Creada");
            listProductos();
        }
        else {
            console.log("Error fatal");
        }

    }

    useEffect(() => {
        CreateBase();
    }, [])


    const guardarProducto = async (producto) => {
        console.log("si")
        console.log(producto)
        console.log(editarProducto)

        if (editarProducto == true) {
            console.log("editar")
            console.log(producto)
            const response = await fetch("api/producto/UpdateProducts", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(producto)
            })

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                listProductos()
                
            }
            else {
                console.log("Error fatal")
                
            }
            setEditarProducto(false)
    

        }
        else {
            console.log("Guardar")

            console.log(producto)

            const response = await fetch("api/producto/AddProducts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(producto)
            })

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                listProductos()
            }

        }

       
    }

   
    const productoNuevo = () => {

        setProductoSeleccionado(ModeloProducto)
        setMostrarModal(!mostrarModal)
        

    }

    const editarProducto1 = (producto) => {
        console.log(producto)
        setProductoSeleccionado(producto);
        openCloseModal()
        setEditarProducto(true)

 
    }

    const eliminarProducto = async (id) => {
        setIdEliminar(id);
        openCloseModalEliminar()
    }

    const openCloseModalEliminar = () => {
        setMostrarModalEliminar(!mostrarModalElimiar);
    }

    const AceptaEliminarProducto = async () => {
        const response = await fetch("api/producto/DeleteProducts/" + idEliminar, {
            method:"DELETE"
            })

        if (response.ok) {
            listProductos();
            setMostrarModalEliminar(!mostrarModalElimiar)
        }
    }

    return (
        
        <Container>
                <Row className="mt-5">
                    <Col sm="12">
                        <Card className="card border-primary mb-3">
                            <CardHeader>
                                <h5>Lista de Productos</h5>
                            </CardHeader>
                        <CardBody>
                            <button className="btn btn-outline-primary" onClick={() => productoNuevo()} > Nuevo Producto</button>
                                <hr></hr>

                            </CardBody>
                        <TablaProducto data={productos}
                            setEditar={setEditar}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}
                            eliminarProducto={eliminarProducto}
                            editarProducto1={editarProducto1}
                        />
                        </Card>
                    </Col>
            </Row>

          


            <Modal isOpen={mostrarModal}>
                <ModalHeader> {editarProducto == true &&
                    <p>Editar producto </p>
                }
                    {editarProducto == false &&
                        <p>
                            Nuevo producto
                        </p>
                    } 
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <br />
                        <input type="text" className="form-control" data-val="true"
                             name="nombre" onChange={handleChange} value={productoSeleccionado.nombre} />
                        <br />
                        <label>Descripcion:</label>
                        <br />
                        <input type="text" className="form-control" name="descripcion" onChange={handleChange} value={productoSeleccionado.descripcion} />
                        <br />
                        <label>Edad:</label>
                        <br />
                        <input type="number" className="form-control"  name="edad" onChange={handleChange} value={productoSeleccionado.edad} />

                        <br />
                        <label>Marca:</label>
                        <br />
                        <input type="text" className="form-control" name="compania" onChange={handleChange} value={productoSeleccionado.compania} />
                        <br/>
                        <label>Precio:</label>
                        <br />
                        <input type="number" className="form-control" name="precio" onChange={handleChange} value={productoSeleccionado.precio} />
        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary" onClick={()=>guardarProducto(productoSeleccionado)}> Guardar</button>
                    <button className="btn btn-outline-danger" onClick={()=>openCloseModal()}> Cancelar</button>
                </ModalFooter>

            </Modal>


            <Modal isOpen={mostrarModalElimiar}>
                <ModalBody>
                    ¿Estas seguro de eliminar el producto?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-danger" onClick={() => AceptaEliminarProducto()}> Si</button>
                    <button className="btn btn-outline-primary" onClick={() => openCloseModalEliminar()}> No</button>
                </ModalFooter>

            </Modal>
        </Container>

    );
}

export default App;
