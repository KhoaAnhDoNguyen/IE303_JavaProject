import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './HomePage.css'
import Header from '../SharePages/Header/Header.jsx';

function HomePage() {

  return (
    <div>
      <Header />
      
        <div style={{color:'black', marginTop:'500px'}}>Hello</div>
    </div>
  )
}

export default HomePage
