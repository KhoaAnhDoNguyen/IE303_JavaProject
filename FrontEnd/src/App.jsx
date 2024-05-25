import { useState } from 'react'
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage/HomePage.jsx'
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';
import Login from './components/User/Login.jsx';
import SignUp from './components/User/SignUp.jsx';
import { UserProvider } from './components/User/UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/filmdetail/:idfilm' element={<FilmDetail/>}></Route>    
          <Route path='/login' element={<Login/>}></Route>  
          <Route path='/signup' element={<SignUp/>}></Route>  
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
