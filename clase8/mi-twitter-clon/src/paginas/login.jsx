import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SHA256 from "crypto-js/sha256"; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor, llena todos los campos");
      return;
    }

    // 2. Traemos la lista de usuarios registrados desde localStorage
    const storedUsers = JSON.parse(localStorage.getItem("registered_users")) || [];

    // 🔒 3. CIFRAMOS EL INTENTO DE CONTRASEÑA
    // Encriptamos lo que el usuario escribió en este momento para poder compararlo
    const hashedPasswordAttempt = SHA256(password).toString();

    // 4. Buscamos si existe un usuario donde coincidan NOMBRE y el HASH de la contraseña
    const validUser = storedUsers.find(
      (u) => u.username === username && u.password === hashedPasswordAttempt
    );

    if (validUser) {
      // Si el Hash coincide, iniciamos sesión y vamos al inicio
      onLogin(username);
      navigate("/");
    } else {
      // Si no coincide, mostramos error de seguridad
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;