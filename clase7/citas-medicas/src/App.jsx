import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Citas from './Citas';
import CitaDetalle from './CitaDetalle';
import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/citas">Ver Citas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;