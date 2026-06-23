import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido a Home</h1>
      <p>Esta es la página principal de mi aplicación.</p>
      <Link to="/citas">Ir a Citas</Link>
    </div>
  );
}

export default Home;