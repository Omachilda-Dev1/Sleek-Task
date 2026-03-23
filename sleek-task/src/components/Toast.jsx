import React, { useState, useEffect, useCallback } from 'react';
import '../styles/layout.css';

let _addToast = null;

export function toast(message, type = 'default') {
  _addToast?.({ message, type, id: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev, t]);
    setTimeout(() => {
      setToasts(prev => prev.map(x => x.id === t.id ? { ...x, exiting: true } : x));
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 220);
    }, 2800);
  }, []);

  useEffect(() => { _addToast = addToast; return () => { _addToast = null; }; }, [addToast]);

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.exiting ? 'exiting' : ''}`}>
          <span className="toast-accent">
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '·'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
