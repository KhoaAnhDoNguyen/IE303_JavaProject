

function SignUp_Logic(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    /* Email Check */
    if(values.email === "") {
        error.email = "Email không được để trống !"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email sai cú pháp."
    }
    else {
        error.email = ""
    }
    /* Name Check */
    if(values.name === "") {
        error.name = "Tên không được để trống"
    }
    else {
        error.name = ""
    }
    /* Phone Check */
    if (values.phonenumber === "") {
        error.phonenumber = "Số điện thoại không được để trống";
    } else if (!/^\d+$/.test(values.phonenumber)) { // Kiểm tra xem values.phone có chứa toàn chữ số không
        error.phonenumber = "Số điện thoại chỉ được chứa các chữ số từ 0 đến 9";
    } else {
        error.phonenumber = "";
    }
    /* Password Check */
    if(values.password === "") {
        error.password = "Mật khẩu không được để trống"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ký tự đặt biệt, số và chữ"
    }
    else {
        error.password = ""
    }

    if(values.confirm_password === "") {
        error.confirm_password = "Xác nhận mật khẩu không được để trống"
    }
    else if(!password_pattern.test(values.confirm_password)) {
        error.confirm_password = "Xác nhận mật khẩu phải có ít nhất 6 ký tự, bao gồm ký tự đặt biệt, số và chữ"
    }
    else if(values.password.toString() !== values.confirm_password.toString()) {
        error.confirm_password = "Xác nhận mật khẩu không khớp"
    }
    else {
        error.confirm_password = ""
    }

    return error;

}

export default SignUp_Logic;