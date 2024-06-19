import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../SharePages/Header/Header.jsx";
import "./FilmRevenue.css";
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

function FilmRevenue() {
    const [films, setFilms] = useState([]);
    const [filmRevenueMap, setFilmRevenueMap] = useState({});

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bookings");
            setFilms(response.data);

            // Tính tổng doanh thu cho mỗi phim
            const revenueMap = {};
            response.data.forEach((film) => {
                if (revenueMap[film.filmName]) {
                    revenueMap[film.filmName] += film.price;
                } else {
                    revenueMap[film.filmName] = film.price;
                }
            });

            // Định dạng số tiền với dấu phân tách hàng nghìn
            const formattedRevenueMap = {};
            Object.keys(revenueMap).forEach((filmName) => {
                formattedRevenueMap[filmName] = formatMoney(revenueMap[filmName]);
            });

            setFilmRevenueMap(formattedRevenueMap);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Hàm định dạng số tiền với dấu phân tách hàng nghìn
    const formatMoney = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Hàm xử lý khi nhấn nút "Xuất file"
    const handleExportToExcel = () => {
        // Tạo một workbook mới
        const wb = XLSX.utils.book_new();

        // Tạo một sheet mới
        const ws = XLSX.utils.json_to_sheet(Object.keys(filmRevenueMap).map(filmName => ({
            'Tên phim': filmName,
            'Doanh thu': filmRevenueMap[filmName]
        })));

        // Thêm sheet vào workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Doanh thu phim');

        // Xuất file Excel
        XLSX.writeFile(wb, 'doanh-thu-phim.xlsx');
    };

    return (
        <div className="filmrevenue-container">
            <Header />
            <div className="filmrevenue-detail">
                <div className="filmrevenue-header">
                    <div className="filmrevenue-title">DOANH THU</div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="file-export"
                        onClick={handleExportToExcel}
                    >
                        Xuất file
                    </Button>
                </div>
                <div className="filmrevenue-content">
                    {Object.keys(filmRevenueMap).map((filmName, index) => (
                        <div key={index} className="filmrevenue-item">
                            <span className="film-name">{filmName}</span>
                            <span className="total-revenue">
                                {filmRevenueMap[filmName]} VNĐ
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilmRevenue;
