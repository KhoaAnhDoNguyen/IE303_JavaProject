import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../SharePages/Header/Header.jsx";
import "./FilmAdd.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FilmAdd() {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/film`, film);
      toast.success("Thêm phim mới thành công!", {
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding film:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="filmadd-container">
      <Header />
      <div className="filmadd-all">
        <ToastContainer />
        <div className="filmadd-image">
          {previewImage && (
            <img
              src={`.${previewImage}`}
              alt="Preview"
              className="preview-image-add"
            />
          )}
          <label className="custom-file-upload-add">
            Chọn Poster
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="filmadd-detail">
          <div className="filmadd-text">Thêm phim</div>
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
            <div className="radio-group-add">
              <label className="status-label-add">
                Trạng thái:
              </label>
              <div className="radio-buttons-add">
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
            <button type="submit">Thêm phim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilmAdd;
