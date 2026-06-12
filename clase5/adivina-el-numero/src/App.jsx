import React, { useState } from 'react';

function Message({ text, type }) {
  if (!text) return null;

  const styles = {
    padding: '10px 15px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontWeight: 'bold',
    textAlign: 'center',
    background: type === 'success' ? '#2e7d32' : '#d32f2f',
    color: '#fff',
  };

  return <div style={styles}>{text}</div>;
}

function InputNumber({ value, onChange, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Escribe del 1 al 100"
        min="1"
        max="100"
        required
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #444',
          background: '#222',
          color: '#fff',
          fontSize: '16px'
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '10px 20px',
          background: disabled ? '#555' : '#00adb5',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        Probar
      </button>
    </form>
  );
}

function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      style={{
        width: '100%',
        padding: '12px',
        background: '#ff9800',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '10px'
      }}
    >
      🔄 Reiniciar Juego
    </button>
  );
}

export default function Game() {
  const generarNumeroSecreto = () => Math.floor(Math.random() * 100) + 1;

  const [numeroSecreto, setNumeroSecreto] = useState(() => generarNumeroSecreto());
  const [suposicion, setSuposicion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const numeroUsuario = parseInt(suposicion, 10);

    if (isNaN(numeroUsuario)) return;

    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);

    if (numeroUsuario === numeroSecreto) {
      setMensaje(`🎉 ¡Excelente! Adivinaste el número en ${nuevoIntento} intentos.`);
      setTipoMensaje('success');
      setJuegoTerminado(true);
    } else if (numeroUsuario < numeroSecreto) {
      setMensaje('📈 Demasiado bajo. ¡Intenta con un número más grande!');
      setTipoMensaje('error');
    } else {
      setMensaje('📉 Demasiado alto. ¡Intenta con un número más chico!');
      setTipoMensaje('error');
    }

    setSuposicion('');
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(generarNumeroSecreto());
    setSuposicion('');
    setMensaje('¡El juego se ha reiniciado! Intenta adivinar el nuevo número.');
    setTipoMensaje('success');
    setIntentos(0);
    setJuegoTerminado(false);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '25px',
      background: '#1a1a1e',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginTop: 0, color: '#ba1aad' }}>
        🎯 Adivina el Número
      </h2>
      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '14px' }}>
        Hemos seleccionado un número secreto entre 1 y 100. ¿Puedes encontrarlo?
      </p>

      <Message text={mensaje} type={tipoMensaje} />

      <div style={{ margin: '15px 0', textAlign: 'center', color: '#aaa' }}>
        Intentos actuales: <strong>{intentos}</strong>
      </div>

      <InputNumber
        value={suposicion}
        onChange={setSuposicion}
        onSubmit={manejarEnvio}
        disabled={juegoTerminado}
      />

      <RestartButton onRestart={reiniciarJuego} />
    </div>
  );
}