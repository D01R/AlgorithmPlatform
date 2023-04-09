import { useContext, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Context } from './main';
import { check } from './services/userAPI'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoadin] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setIsAuth(true);
        user.setUser(data);
      })
      .finally(() => console.log('Auth'))
  },[])

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
