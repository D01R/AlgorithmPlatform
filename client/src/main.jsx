import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserStore from './store/UserStore';

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
