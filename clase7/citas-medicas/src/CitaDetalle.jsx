import React from "react";
import { useParams, Link } from "react-router-dom";

function CitaDetalle() {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalles de la Cita</h2>
      <p>ID de la cita: {id}</p>
      <p>Aquí podrías mostrar nombre del paciente, fecha y hora.</p>

      <Link to="/citas">Volver a citas</Link>
    </div>
  );
}

export default CitaDetalle;