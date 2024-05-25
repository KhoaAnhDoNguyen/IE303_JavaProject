import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logic from "./LoginLogic";
import axios from "axios";
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        //console.log('Input changed:', event.target.name, event.target.value);
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await axios.get(`http://localhost:8080/users/${values.email}/${values.password}`);
                console.log('API response:', response);
                if (response.data.length > 0) {
                    setUser(response.data);
                    console.log('User data:', response.data);
                    alert('Đăng nhập thành công!');
                    navigate('/');
                } else {
                    console.log('Login failed. No data returned.');
                    alert('Đăng nhập thất bại. Vui lòng thử lại!');
                    window.location.reload();
                }
            } catch (error) {
                console.error('There was an error!', error);
                alert('Đăng nhập thất bại. Vui lòng thử lại!');
            }

    }

    useEffect(() => {
        if (user) {
            console.log('User state updated:', user);
        }
    }, [user]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            handleSubmit(event);
        }
    }

    return (
        <div className="login-container">
            <div className="bg-info p-3 rounded w-25">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="mb-2">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            name="email"
                            onKeyPress={handleKeyPress}
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="mb-2">
                            <strong>Mật khẩu</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            name="password"
                            onKeyPress={handleKeyPress}
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.password && (
                            <span className="text-danger">{errors.password}</span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        <strong>Đăng Nhập</strong>
                    </button>
                    <p className="mt-3">Vui lòng tạo tài khoản dưới đây!</p>
                    <Link
                        to="/signup"
                        className="btn btn-default border w-100 bg-light text-decoration-none mt-0"
                        style={{ marginTop: '10px' }} // Thêm khoảng cách cho nút
                    >
                        Tạo tài khoản
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
