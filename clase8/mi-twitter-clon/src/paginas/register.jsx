import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SHA256 from "crypto-js/sha256"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // 1. Obtener los usuarios que ya existen bajo la clave 'registered_users'
    const storedUsers = JSON.parse(localStorage.getItem("registered_users")) || [];

    // 2. Verificar si el nombre de usuario ya está tomado
    const userExists = storedUsers.some((u) => u.username === username);
    if (userExists) {
      setError("El nombre de usuario ya está registrado");
      return;
    }

    //  3 CIFRAR LA CONTRASEÑA ANTES DE GUARDARLA
    // Convierte "miPassword123" en una cadena larga e indescifrable de letras y números
    const hashedPassword = SHA256(password).toString();

    // Guardamos el newUser usando la contraseña encriptada
    const newUser = { 
      username, 
      password: hashedPassword 
    };
    
    storedUsers.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(storedUsers));

    // 4. Redirigir al Login tras registrarse con éxito
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input
          type="text"
          placeholder="Usuario"
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
        <button type="submit">Crear Cuenta</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;