import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams  } from "react-router-dom";
import './FilmDetail.css';
import axios from 'axios';
import { Tag, Clock, Globe, UserCheck, Youtube, Bold } from 'react-feather';
import VideoPlayer from '../HomePage/VideoPlayer.jsx'; 
import Header from '../SharePages/Header/Header.jsx';

function FilmDetail() {

  const [film, setFilm]=useState({
    filmName: "",
    status: "",
    type: "",
    object: "",
    content: "",
    time: "",
    country: "",
    premiere: "",
    director: "",
    actor: "",
    image: "",
    demo: "",
    idfilm: ""
  })

  const {idfilm}=useParams();

  useEffect(() => {
    loadFilm();
    }, []);

    const loadFilm = async () => {
      const result = await axios.get(`http://localhost:8080/films/${idfilm}`);
      setFilm(result.data);
    }


  return (
    <div  className='filmdetail-container'>
        <Header/>
        <div className='filmdetail-show'>
            <img src={`.${film.image}`} alt="Film Poster" className="filmdetail-img"/>
            <div className='filmdetail-info'>
                <div className='filmdetail-name'>{film.filmName}</div>
                <div style={{marginTop: 15}}><Tag size={30} color="yellow"/>
                    <span style={{color:"white", marginLeft: 15, fontSize: 20}}>{film.type}</span></div>
                <div style={{marginTop: 10}}><Clock size={30} color="yellow" />
                    <span style={{color:"white", marginLeft: 15, fontSize: 20}}>{film.time}</span></div>
                <div style={{marginTop: 10}}><Globe size={30} color="yellow" />
                    <span style={{color:"white", marginLeft: 15, fontSize: 20}}>{film.country}</span></div>
                <div style={{marginTop: 10}}><UserCheck size={30} color="yellow" />
                    <span style={{color:"white", marginLeft: 15, fontSize: 20}}>{film.object}</span></div>
                <div style={{marginTop: 15, color: 'white', fontSize: 25, fontWeight: 'bold'}}>MÔ TẢ</div>
                <div style={{marginTop: 7, color:'white', fontSize: 20}}>Đạo diễn: {film.director}</div>
                <div style={{marginTop: 7, color:'white', fontSize: 20}}>Diễn viên: {film.actor}</div>
                <div style={{marginTop: 7, color:'white', fontSize: 20}}>Khởi chiếu: {film.premiere}</div>
                <div style={{marginTop: 15, color: 'white', fontSize: 25, fontWeight: 'bold'}}>NỘI DUNG PHIM</div>
                <div style={{marginTop: 7, color:'white', fontSize: 15}}>{film.content}</div>
            </div>
        </div>

    </div>
  )
}

export default FilmDetail
