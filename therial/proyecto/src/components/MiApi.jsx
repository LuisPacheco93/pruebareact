import React from 'react'
import { useState, useEffect } from "react";



const MiApi = () => {

    const [buscarPersonajes, setBuscarPersonajes] = useState('');    // aqui se guardaran los valores traidos de la api
    const [personajes, setPersonajes] = useState([]); //endpoint de personajes tambien estados
    const [sortOrder, setSortOrder] = useState('');   // estados para orden 

        const consultarInformacion = async () => {                                         //aqui consultamos la api
        const url = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes';
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)

        setPersonajes([...personajes, ...data]);


    }
    useEffect(() => {                                 //funcion que consume la api
        consultarInformacion();


    }, []);


    const filtrarPorPersonaje = (e) => {  //creamos el evento
        setBuscarPersonajes(e.target.value);  //recuperamos el valor de ese elemento
    }
    return (
        <div className='bg-dark'>
            <nav className="navbar navbar-light bg-info justify-content-between ">
                <a className="navbar-brand text-dark m-3"><h1>Harry Potter</h1></a>
                <form className="form-inline">
                    <input className="form-control mr-2" onChange={filtrarPorPersonaje} value={buscarPersonajes}
                        type="text" placeholder="Busca Tu Personaje" />
                </form>
            </nav>
            <form className='container '>
                <nav className="navbar justify-content-between ">

                    <button className="btn btn-outline-info " onClick={() => setSortOrder('1')} type="button">Ordenar de la A a Z</button>
                    <button className="btn btn-outline-info " onClick={() => setSortOrder('0')} type="button">Ordenar de la Z a A</button>
                </nav>
            </form>
            <div className='container'>
                <main>

                    <div className='row gx-4'>
                        {personajes.filter((e) => {
                            if (buscarPersonajes === '') {
                                return e;
                            } else if (e.apodo.toLocaleLowerCase().startsWith(buscarPersonajes.toLocaleLowerCase())
                            ) {
                                return e;
                            }
                        }).sort((e, e2) => {
                            if (sortOrder === '1')
                                return (e.apodo > e2.apodo) ? 1 : ((e.apodo < e2.apodo) ? -1 : 0)
                            else if (sortOrder === '0')
                                return (e.apodo < e2.apodo) ? 1 : ((e.apodo > e2.apodo) ? -1 : 0)
                        }
                        )
                            .map(p =>
                                <div className='col-12 col-md-6 col-lg-3 text-white mb-4' key={p.personaje}>
                                    <div className="card pr-5 mb-4">
                                        <img src={p.imagen} className="card-img-top" alt="..."></img>
                                        <div className='card-header bg-dark text-info'><h5>Nombre: {p.personaje}</h5></div>
                                        <div className='card-body bg-secondary'>
                                            <h4> Apodo:{p.apodo}</h4>
                                            <p>Interprete: {p.interpretado_por}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </main>
            </div>

        </div>
    )
}

export default MiApi