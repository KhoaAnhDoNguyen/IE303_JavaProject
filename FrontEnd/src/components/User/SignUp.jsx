import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp_Logic from "./SignUpLogic";
import axios from 'axios';

function SignUp() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        name: '',
        phonenumber: '',
        password: '',
        confirm_password: '',
        role: 'user'
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = SignUp_Logic(values);
        setErrors(validationErrors);

        const noErrors = Object.values(validationErrors).every((value) => value === "");

        if (noErrors) {
            try {
                const { confirm_password, ...submitValues } = values; // Loại bỏ confirm_password trước khi gửi
                const response = await axios.post('http://localhost:8080/user', submitValues);
                console.log(response.data);
                toast.success('Tạo tài khoản thành công!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    style: { width: '350px' },
                    onClose: () => navigate('/login')
                });
            } catch (error) {
                console.error('There was an error!', error);
            }
        } else {
            console.log('Validation errors:', validationErrors);
        }
    };

    return (
        <div className='login-container'>
            <div className='bg-info p-3 rounded w-25'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" className="mb-2"><strong>Email</strong></label>
                        <input type="email" placeholder='Nhập Email của bạn' name="email"
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="name" className="mb-2"><strong>Tên người dùng</strong></label>
                        <input type="name" placeholder='Nhập tên của bạn' name="name"
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="phonenumber" className="mb-2"><strong>Số điện thoại</strong></label>
                        <input type="phonenumber" placeholder='Nhập số điện thoại của bạn' name="phonenumber"
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.phonenumber && <span className="text-danger">{errors.phonenumber}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className="mb-2"><strong>Mật khẩu</strong></label>
                        <input type="password" placeholder='Nhập mật khẩu của bạn' name="password"
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}  
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="confirm_password" className="mb-2"><strong>Xác nhận mật khẩu</strong></label>
                        <input type="password" placeholder='Nhập lại mật khẩu của bạn' name="confirm_password"
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.confirm_password && <span className="text-danger">{errors.confirm_password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100'>Tạo tài khoản</button>
                    <Link
                        to="/login"
                        className="btn btn-default border w-100 bg-light text-decoration-none mt-3"
                    >
                        Quay lại
                    </Link>
                </form>
            </div>

            {/* ToastContainer for notifications */}
            <ToastContainer />
        </div>
    );
}

export default SignUp;
