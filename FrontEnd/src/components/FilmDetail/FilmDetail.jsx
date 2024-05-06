import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './FilmDetail.css'

function FilmDetail() {

  const [film, setFilm]=useState({
    filmName: "",
    Type : "",
    Time: "",
    Country: "",
    Object: "",
    Director: "",
    Actor: "",
    Premiere: "",
    Content: "",
    status: "",
    Image: "",
    Demo: ""
  })

  const {id_film}=useParams();

  useEffect(() => {
    loadFilm();
    }, []);

    const loadFilm = async () => {
      const result = await axios.get(`http://localhost:8080/films/${id_film}`);
      setFilm(result.data);
    }

  return (
    <div>
        {film.filmName}
        {film.Demo}
    </div>
  )
}

export default FilmDetail
