import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '320px',
        border: '4px solid red'
      }}
    >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
