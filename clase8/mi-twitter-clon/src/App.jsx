import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./paginas/home";
import Profile from "./paginas/profile";
import Login from "./paginas/login";
import Register from "./paginas/register";

const App = () => {
  // Inicialización diferida (Lazy initialization) para evitar parpadeos al recargar
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
   <Router>
      <Routes>
        {/* Si ya está logueado, redirige a la Home en vez de mostrar el Login */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login onLogin={login} />} 
        />
        
        {/* Ruta de Registro: Si ya está logueado va a la Home, si no, muestra Register */}
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />

        {/* Página principal (Twitter Clone) */}
        <Route path="/" element={<Home user={user} logout={logout} />} />
        
        {/* Ruta protegida de Perfil */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;