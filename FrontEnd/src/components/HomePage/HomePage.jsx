import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './HomePage.css'

function HomePage() {

  return (
    <div>
    <p>HomePage</p>
    <Link to="/filmdetail"> <button className="film-detail-button">FilmDetail</button> </Link>
    </div>
  )
}

export default HomePage
