import { useState, useEffect } from "react";
import TweetList from "../componente/tweetList";
import TweetForm from "../componente/tweetForm";
import UserProfileCard from "../componente/userProfileCard"; // 

const Home = ({ user, logout }) => {
  // Inicialización diferida: Carga los tweets de localStorage directamente al montar el componente
  const [tweets, setTweets] = useState(() => {
    const storedTweets = localStorage.getItem("tweets");
    return storedTweets ? JSON.parse(storedTweets) : [];
  });

  // Sincroniza los tweets con localStorage cada vez que la lista cambia
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  // Función para agregar un nuevo tweet
  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
    };
    setTweets([newTweet, ...tweets]);
  };

  // Función para dar like a un tweet específico
  const likeTweet = (id) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  return (
    <div className="home-container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Twitter Clone</h1>
      
      {}
      <UserProfileCard user={user} logout={logout} />

      {/* Sección interactiva de Tweets */}
      <main>
        {/* 🔒 Protegemos el formulario: solo los logueados tuitean */}
        {user ? (
          <TweetForm onAddTweet={addTweet} />
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "15px", 
            background: "rgba(29, 155, 240, 0.1)", 
            borderRadius: "10px", 
            color: "#1d9bf0",
            marginBottom: "20px"
          }}>
            Debes iniciar sesión para publicar un tweet.
          </div>
        )}
        
        {/* Listado de tweets existentes con opción de dar like */}
        <TweetList tweets={tweets} onLike={likeTweet} />
      </main>
    </div>
  );
};

export default Home;