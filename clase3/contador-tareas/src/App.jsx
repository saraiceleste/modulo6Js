import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; 

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('todas');

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const tareasFiltradas = useMemo(() => {
    if (filtroDuracion === 'cortas') {
      return tareas.filter(tarea => tarea.duracion < 30);
    }
    if (filtroDuracion === 'largas') {
      return tareas.filter(tarea => tarea.duracion >= 30);
    }
    return tareas;
  }, [tareas, filtroDuracion]);

  const calcularTiempoTotal = useMemo(() => {
    return tareasFiltradas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareasFiltradas]); 

  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`; 
  }, [calcularTiempoTotal]); 

  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion, 10)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const limpiarTodo = () => {
    setTareas([]);
  };

  return (
   
    <div className="contenedor-principal">
      <h1 className="titulo-app">Contador de Tareas</h1>
      
      {/* Formulario de entrada */}
      <div className="formulario-tarea">
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
          className="input-texto"
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Minutos" 
          className="input-numero"
        />
        <button onClick={agregarTarea} className="boton-agregar">Agregar</button>
      </div>

      {/* Interfaz de Filtros */}
      <div className="contenedor-filtros">
        <label className="etiqueta-filtro">Filtrar por duración: </label>
        <select 
          value={filtroDuracion} 
          onChange={(e) => setFiltroDuracion(e.target.value)}
          className="selector-filtro"
        >
          <option value="todas">Todas las tareas</option>
          <option value="cortas">Cortas (&lt; 30 min)</option>
          <option value="largas">Largas (&ge; 30 min)</option>
        </select>
      </div>

      <h2>Tareas en pantalla</h2>
      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea, index) => (
          <li key={index} className="item-tarea">
            <strong>{tarea.nombre}</strong>: {tarea.duracion} minutos
          </li>
        ))}
        {tareasFiltradas.length === 0 && <p className="texto-vacio">No hay tareas para mostrar.</p>}
      </ul>

      <h3 className="tiempo-total">Total de tiempo del filtro: <span>{calcularTiempoTotal}</span> minutos</h3>

      <button onClick={limpiarTodo} className="boton-limpiar">
        Borrar todas las tareas
      </button>
    </div>
  );
}

export default App;