import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
  // --- ESTADOS ORIGINALES (SIMULACIÓN NAVE) ---
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState('En órbita');

  // --- ESTADOS DE LA BITÁCORA DE PLANETAS ---
  
  const [planetas, setPlanetas] = useState(() => {
  const guardados = localStorage.getItem('bitacora_planetas');
  return guardados ? JSON.parse(guardados) : [];
  });
  
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);

  // --- ESTADOS DEL FORMULARIO ---
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [idEditando, setIdEditando] = useState(null); // Controla si estamos creando o editando

  
  useEffect(() => {
    console.log("¡El panel está listo!"); 
    const intervalo = setInterval(() => { 
      setCombustible((prev) => (prev > 0 ? prev - 1 : 0));
    }, 5000);

    return () => {
      clearInterval(intervalo); 
      console.log("El panel se ha apagado."); 
    };
  }, []);

  useEffect(() => {
    if (combustible === 0) setEstadoNave('Varado sin combustible');
    console.log("¡Combustible actualizado!", combustible); 
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);


  // --- PERSISTENCIA CON LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('bitacora_planetas', JSON.stringify(planetas));
  }, [planetas]);


  // --- PROCESAMIENTO DE IMAGEN ---
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  // --- MANEJO DEL FORMULARIO  --
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;

    if (idEditando) {
      // MODO EDICIÓN
      const planetasActualizados = planetas.map((p) => 
        p.id === idEditando ? { ...p, nombre, descripcion, imagen } : p
      );
      setPlanetas(planetasActualizados);
      
      // Si el planeta editado estaba seleccionado para ver detalles, actualízalo también
      if (planetaSeleccionado && planetaSeleccionado.id === idEditando) {
        setPlanetaSeleccionado({ id: idEditando, nombre, descripcion, imagen });
      }
      
      setIdEditando(null);
    } else {
      // MODO CREACIÓN
      const nuevoPlaneta = {
        id: Date.now(), // ID único basado en tiempo
        nombre,
        descripcion,
        imagen
      };
      setPlanetas([...planetas, nuevoPlaneta]);
    }

    // Limpiar formulario
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setImagen('');
    setIdEditando(null);
    // Reiniciar input de archivo visualmente
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
  };

  // --- ACCIONES DE EDICIÓN Y ELIMINACIÓN ---
  const cargarEdicion = (planeta, e) => {
    e.stopPropagation(); 
    setIdEditando(planeta.id);
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setImagen(planeta.imagen);
  };

  const eliminarPlaneta = (id, e) => {
    e.stopPropagation();
    if (confirm("¿Seguro que deseas borrar este planeta de la bitácora?")) {
      const filtrados = planetas.filter((p) => p.id !== id);
      setPlanetas(filtrados);
      
      //
      if (planetaSeleccionado && planetaSeleccionado.id === id) {
        setPlanetaSeleccionado(null);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#121214', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* PANEL DE CONTROL DE LA NAVE */}
      <header style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', background: '#1a1a1e' }}>
        <h1>🚀 Explorador Espacial </h1>
        <p>📋 {mensajeEstado} | ⛽ Combustible: {combustible}%</p>
        <progress value={combustible} max="100" style={{ width: '100%' }}></progress>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* SECCIÓN 1: FORMULARIO */}
        <section style={{ background: '#1a1a1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h2>{idEditando ? '📝 Editar Planeta' : '🪐 Registrar Nuevo Planeta'}</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Planeta:</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
              <textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)}
                required
                rows="4"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Imagen del Planeta (Opcional):</label>
              <input 
                id="file-input"
                type="file" 
                accept="image/*"
                onChange={handleImagenChange}
                style={{ color: '#ccc' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '10px', background: '#00adb5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                {idEditando ? 'Guardar Cambios' : 'Registrar en Bitácora'}
              </button>
              {idEditando && (
                <button type="button" onClick={limpiarFormulario} style={{ padding: '10px', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* LISTA */}
          <div style={{ background: '#1a1a1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', flex: 1 }}>
            <h2>📋 Bitácora Estelar</h2>
            {planetas.length === 0 ? (
              <p style={{ color: '#888', fontStyle: 'italic' }}>No hay planetas registrados en los cuadrantes de memoria.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {planetas.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setPlanetaSeleccionado(p)}
                    style={{ 
                      padding: '12px 15px', 
                      background: planetaSeleccionado?.id === p.id ? '#252932' : '#222', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      border: planetaSeleccionado?.id === p.id ? '1px solid #00adb5' : '1px solid transparent',
                      transition: '0.2s'
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>🪐 {p.nombre}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={(e) => cargarEdicion(p, e)} style={{ background: '#f0a500', border: 'none', padding: '5px 10px', borderRadius: '4px', color: '#000', cursor: 'pointer', fontSize: '12px' }}>
                        Editar
                      </button>
                      <button onClick={(e) => eliminarPlaneta(p.id, e)} style={{ background: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '12px' }}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETALLES DEL PLANETA SELECCIONADO */}
          {planetaSeleccionado && (
            <div style={{ background: '#1e222b', padding: '20px', borderRadius: '8px', border: '1px solid #00adb5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#00adb5' }}>🔍 Escaneo: {planetaSeleccionado.nombre}</h3>
                <button onClick={() => setPlanetaSeleccionado(null)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '16px' }}>✕</button>
              </div>
              <p style={{ lineHeight: '1.5', color: '#ddd', whiteSpace: 'pre-wrap' }}>{planetaSeleccionado.descripcion}</p>
              {planetaSeleccionado.imagen && (
                <img 
                  src={planetaSeleccionado.imagen} 
                  alt={planetaSeleccionado.nombre} 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '6px', marginTop: '10px', objectFit: 'cover', display: 'block' }} 
                />
              )}
            </div>
          )}

        </section>
      </div>
    </div>
  );
}