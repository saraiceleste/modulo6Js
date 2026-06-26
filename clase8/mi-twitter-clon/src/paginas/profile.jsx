const Profile = ({ user }) => {
  return (
    <div>
      <h1>Perfil</h1>
      {user && <p>Nombre de usuario: {user.username}</p>}
      {/* ... contenido de la página ... */}
    </div>
  );
};

export default Profile;