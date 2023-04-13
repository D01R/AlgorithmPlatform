import { useContext, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { Context } from './main';
import { check } from './services/userAPI'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
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
      <Header/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
})

export default App
