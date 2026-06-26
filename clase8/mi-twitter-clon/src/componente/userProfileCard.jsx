import { Link } from "react-router-dom";

const UserProfileCard = ({ user, logout }) => {
  // Si no hay usuario logueado, mostramos una tarjeta invitando a iniciar sesión
  if (!user) {
    return (
      <div style={{
        background: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        borderRadius: "15px",
        textAlign: "center",
        border: "1px solid #333",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>¿Eres nuevo en Twitter?</h3>
        <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "15px" }}>
          Regístrate ahora o inicia sesión para obtener tu propio feed personalizado.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Link to="/login">
            <button type="button" style={{ background: "#1d9bf0", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>
              Entrar
            </button>
          </Link>
          <Link to="/register">
            <button type="button" style={{ background: "transparent", color: "#1d9bf0", border: "1px solid #1d9bf0", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Si el usuario SÍ está logueado, muestra sus datos de perfil estilo Twitter
  return (
    <div style={{
      background: "#1e1e1e",
      color: "#fff",
      padding: "20px",
      borderRadius: "15px",
      border: "1px solid #333",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Inicial del usuario simulando un Avatar */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#1d9bf0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold"
        }}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        
        <div style={{ textAlign: "left" }}>
          <h3 style={{ margin: 0, fontSize: "16px" }}>{user.username}</h3>
          <p style={{ margin: 0, color: "#71767b", fontSize: "14px" }}>@{user.username.toLowerCase()}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #333", paddingTop: "12px" }}>
        <Link to="/profile" style={{ color: "#1d9bf0", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>
          Ver mi Perfil
        </Link>
        <button 
          onClick={logout} 
          type="button" 
          style={{ background: "#e63946", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;