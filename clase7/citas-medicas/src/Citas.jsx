import React from "react";
import { Link } from "react-router-dom";

function Citas() {
  return (
    <div>
      <h2>Lista de Citas</h2>
      <p>Estas son las citas disponibles.</p>

      <ul>
        <li>
          <Link to="/cita/1">Ver cita 1</Link>
        </li>
        <li>
          <Link to="/cita/2">Ver cita 2</Link>
        </li>
        <li>
          <Link to="/cita/3">Ver cita 3</Link>
        </li>
      </ul>
    </div>
  );
}

export default Citas;