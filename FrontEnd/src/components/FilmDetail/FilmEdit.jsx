import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../SharePages/Header/Header.jsx";
import "./FilmEdit.css";
import { Link, useNavigate  } from "react-router-dom";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FilmEdit() {
  const navigate = useNavigate();

  const [film, setFilm] = useState({
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
    idfilm: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  const { idfilm } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFilm();
  }, []);

  const loadFilm = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/films/${idfilm}`);
      const filmData = response.data;
      // Lấy trạng thái từ dữ liệu phim và chuyển đổi thành kiểu số nguyên
      const statusInt = parseInt(filmData.status);
  
      // Kiểm tra giá trị của trạng thái và chọn nút radio tương ứng
      if (statusInt === 1) {
        // Trạng thái là 1, chọn nút radio "Đang chiếu"
        setFilm({ ...filmData, status: "1" });
      } else if (statusInt === 0) {
        // Trạng thái là 0, chọn nút radio "Sắp chiếu"
        setFilm({ ...filmData, status: "0" });
      }
  
      setPreviewImage(filmData.image);
    } catch (error) {
      console.error("Error fetching film:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'radio' ? e.target.value : value;
    setFilm({ ...film, [name]: newValue });
    console.log(`Changed ${name}: ${newValue}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = `./src/assets/Films/${file.name}`;
    setPreviewImage(imageUrl);
    setFilm({ ...film, image: imageUrl });
    console.log(film)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/film/${idfilm}`, film);
    toast.success("Cập nhật phim thành công!", {
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  };


  return (
    <div className="filmedit-container">
      <Header />
      <div className="filmedit-all">
      <ToastContainer />
        <div className="filmdetail-image">
          {previewImage && (
            <img
              src={`.${previewImage}`}
              alt="Preview"
              className="preview-image"
            />
          )}
          <label className="custom-file-upload">
            Chọn Poster khác
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="filmedit-detail">
          <form onSubmit={handleSubmit}>
            <label>
              Tên phim:
              <input
                type="text"
                name="filmName"
                value={film.filmName}
                onChange={handleChange}
              />
            </label>
            <div className="radio-group">
      <label className="status-label">
        Trạng thái:
      </label>
      <div className="radio-buttons">
        <label>
          Đang chiếu
          <input
            type="radio"
            name="status"
            value="1"
            checked={film.status === "1"}
            onChange={handleChange}
          />
        </label>
        <label>
          Sắp chiếu
          <input
            type="radio"
            name="status"
            value="0"
            checked={film.status === "0"}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
            <label>
              Loại:
              <input
                type="text"
                name="type"
                value={film.type}
                onChange={handleChange}
              />
            </label>
            <label>
              Đối tượng:
              <input
                type="text"
                name="object"
                value={film.object}
                onChange={handleChange}
              />
            </label>
            <label>
              Nội dung:
              <textarea
                type="text"
                name="content"
                value={film.content}
                onChange={handleChange}
              />
            </label>
            <label>
              Thời lượng:
              <input
                type="text"
                name="time"
                value={film.time}
                onChange={handleChange}
              />
            </label>
            <label>
              Quốc gia:
              <input
                type="text"
                name="country"
                value={film.country}
                onChange={handleChange}
              />
            </label>
            <label>
              Ngày công chiếu:
              <input
                type="text"
                name="premiere"
                value={film.premiere}
                onChange={handleChange}
              />
            </label>
            <label>
              Đạo diễn:
              <input
                type="text"
                name="director"
                value={film.director}
                onChange={handleChange}
              />
            </label>
            <label>
              Diễn viên:
              <input
                type="text"
                name="actor"
                value={film.actor}
                onChange={handleChange}
              />
            </label>
            <label>
              Demo:
              <input
                type="text"
                name="demo"
                value={film.demo}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Cập nhật</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilmEdit;
