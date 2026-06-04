import ListaCompras from './ListaCompras'; 
import './App.css'

function App() {
  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Bienvenido a mi app de React</h1>
      <p>Lista de compras</p>
      
      <ListaCompras />
    </div>
  );
}

export default App;