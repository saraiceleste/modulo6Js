import React, { useReducer, useRef, useEffect, useCallback, useState } from 'react';
import './index.css'; // ← Importa el archivo CSS

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementBtnRef = useRef(null);
  const amountInputRef = useRef(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("counterHistory", JSON.stringify(state.history));
    localStorage.setItem("counterCount", state.count.toString());
  }, [state.history, state.count]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("counterHistory");
    const savedCount = localStorage.getItem("counterCount");
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      const countToUse = savedCount ? parseInt(savedCount) : 0;
      dispatch({ type: "loadHistory", payload: parsedHistory, count: countToUse });
    }
  }, []);

  useEffect(() => {
    if (incrementBtnRef.current) {
      incrementBtnRef.current.focus();
    }
  }, []);

  const handleIncrement = useCallback(() => {
    const parsedValue = parseInt(amount);
    const value = amount === "" || amount === "0" || isNaN(parsedValue) ? 1 : parsedValue;
    const safeValue = value < 1 ? 1 : value > 1000 ? 1000 : value;
    
    dispatch({ type: "increment", payload: safeValue });
  }, [amount]);
  
  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  const handleAmountChange = useCallback((e) => {
    setAmount(e.target.value);
  }, []);

  return (
    <div className="counter-game">
      <h2 className="counter-title">Contador: {state.count}</h2>
      
      <div className="input-container">
        <label className="input-label">
          Cantidad a incrementar: 
          <input
            ref={amountInputRef}
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Ingresa un número"
            className="number-input"
          />
        </label>
      </div>
      
      <div className="buttons-container">
        <button 
          ref={incrementBtnRef} 
          onClick={handleIncrement}
          className="btn-increment"
        >
          +
        </button>
        
        <button onClick={handleDecrement} className="btn-decrement">
          -
        </button>
        
        <button onClick={handleReset} className="btn-reset">
          Reset
        </button>

        <button 
          onClick={handleUndo}
          className={state.history.length === 0 ? "btn-undo disabled" : "btn-undo"}
          disabled={state.history.length === 0}
        >
          Deshacer
        </button>
      </div>

      <h3 className="history-title">Historial de cambios:</h3>
      
      <ul className="history-list">
        {state.history.length === 0 ? (
          <li className="history-empty">No hay cambios registrados</li>
        ) : (
          state.history.map((entry, index) => (
            <li key={`${index}-${entry}`} className="history-item">
              {entry}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      const value = action.payload || 1;
      const newCount = state.count + value;
      return {
        count: newCount,
        history: [...state.history, `Incrementado por ${value} a ${newCount}`]
      };
    
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, `Decrementado a ${state.count - 1}`]
      };
    
    case "reset":
      localStorage.removeItem("counterHistory");
      localStorage.removeItem("counterCount");
      
      return {
        count: 0,
        history: []
      };
    
    case "undo":
      if (state.history.length === 0) {
        return state;
      }
      
      const newHistory = state.history.slice(0, -1);
      
      let previousCount;
      if (newHistory.length === 0) {
        previousCount = 0;
      } else {
        const prevEntry = newHistory[newHistory.length - 1];
        previousCount = parseInt(prevEntry.match(/a (\d+)/)[1]);
      }
      
      return {
        count: previousCount,
        history: newHistory
      };
    
    case "loadHistory":
      return {
        count: action.count,
        history: action.payload
      };
    
    default:
      return state;
  }
}

const initialState = {
  count: 0,
  history: []
};

export default CounterGame;