import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import './styles/layout.css';
import Board from './components/Board';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);
