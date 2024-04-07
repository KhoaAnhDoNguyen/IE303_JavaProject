import { useState } from 'react'
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage/HomePage.jsx'
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/filmdetail' element={<FilmDetail />}></Route>      
      </Routes>
    </BrowserRouter>
  )
}

export default App
