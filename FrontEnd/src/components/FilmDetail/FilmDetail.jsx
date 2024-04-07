import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './FilmDetail.css'

function FilmDetail() {

  return (
    <div>
        <p>FilmDetail</p>
        <Link to="/"> <button>HomePage</button> </Link>
    </div>
  )
}

export default FilmDetail
