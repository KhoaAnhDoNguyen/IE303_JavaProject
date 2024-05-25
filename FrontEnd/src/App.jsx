import { useState } from 'react'
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage/HomePage.jsx'
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';
import Login from './components/User/Login.jsx';
import SignUp from './components/User/SignUp.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/filmdetail/:idfilm' element={<FilmDetail/>}></Route>    
          <Route path='/login' element={<Login/>}></Route>  
          <Route path='/signup' element={<SignUp/>}></Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
