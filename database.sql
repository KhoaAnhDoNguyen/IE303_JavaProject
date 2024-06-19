create database java_project
use java_project

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone_number VARCHAR(20),
    role VARCHAR(20)
);
Insert into Users (id, name, email, password, phone_number, role) values 
(1, 'Anh Khoa', '21522219@gm.uit.edu.vn', 'DoKhoa2003', '0773919168', 'user')
Insert into Users (id, name, email, password, phone_number, role) values 
(2, 'Admin', 'dokhoahay1@gmail.com', 'DoKhoa2003', '0773919168', 'admin')
select *from Users
delete from Users where id = 2
CREATE TABLE Film (
    id_film INT AUTO_INCREMENT PRIMARY KEY,
    film_name VARCHAR(255),
    type VARCHAR(100),
    time INT,
    country VARCHAR(100),
    object VARCHAR(255),
    director VARCHAR(255),
    actor VARCHAR(255),
    premiere VARCHAR(255),
    content VARCHAR(3000),
    status INT,
    image VARCHAR(3000),
    demo VARCHAR(3000)
);

CREATE TABLE Showtime
(
    id_showtime INT AUTO_INCREMENT PRIMARY KEY,
    date_show VARCHAR(10),
    year_show VARCHAR(10),
    day_show VARCHAR(30),
    time_show VARCHAR(255),
    showtime_status INT,
    id_film INT,
    FOREIGN KEY (id_film) REFERENCES Film(id_film)
);
select *from Showtime


CREATE TABLE Cinema
(
	id_cinema INT AUTO_INCREMENT PRIMARY KEY,
    name_cinema VARCHAR(255),
    address VARCHAR(255),
    time_open VARCHAR(10),
    time_close VARCHAR(10),
    location VARCHAR(50),
    room VARCHAR(10),
    id_showtime int,
    id_film INT,
	FOREIGN KEY (id_film) REFERENCES Film(id_film),
	FOREIGN KEY (id_showtime) REFERENCES Showtime(id_showtime)
);
select *from Cinema

CREATE TABLE Ticket
(
	id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    name_ticket VARCHAR(255),
    type_ticket VARCHAR(255),
    price DECIMAL(10,2),
    id_cinema INT,
    FOREIGN KEY (id_cinema) REFERENCES Cinema(id_cinema)
);
select *from Ticket


CREATE TABLE Seat
(
	id_seat INT AUTO_INCREMENT PRIMARY KEY,
    id_cinema INT,
    num_col INT,
    num_row INT,
    room VARCHAR(10),
    FOREIGN KEY (id_cinema) REFERENCES Cinema(id_cinema),
	FOREIGN KEY (room) REFERENCES Cinema(room)
);
select *from Seat


CREATE TABLE Booking
(
	id_booking INT AUTO_INCREMENT PRIMARY KEY,
	id INT ,
	id_film INT ,
    id_showtime INT,
    id_cinema INT ,
    id_ticket INT,
    id_seat INT,
    
    film_name VARCHAR(255),
    
    name_cinema VARCHAR(255),
    address VARCHAR(255),
    room VARCHAR(10),
    
    date_show VARCHAR(10),
    year_show VARCHAR(10),
    day_show VARCHAR(30),
    time_show VARCHAR(255),
    
    name_ticket VARCHAR(255),
    type_ticket VARCHAR(255),
    
    seat VARCHAR(10),
    total_price DECIMAL(10,2),
    
	FOREIGN KEY (id_film) REFERENCES Film(id_film),
    FOREIGN KEY (id_cinema) REFERENCES Cinema(id_cinema),
    FOREIGN KEY (id) REFERENCES Users(id),
    FOREIGN KEY (id_showtime) REFERENCES Showtime(id_showtime),
    FOREIGN KEY (id_seat) REFERENCES Seat(id_seat),
    FOREIGN KEY (id_ticket) REFERENCES Ticket(id_ticket)
);

select *from Booking

CREATE TABLE user_film
(
	id_user_film INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_film INT,
    name VARCHAR(100),
	star INT,
    comments VARCHAR(2000),
    FOREIGN KEY (id_user) REFERENCES Users(id),
	FOREIGN KEY (id_film) REFERENCES Film(id_film)
);
select *from user_film
delete from user_film where id_user_film = 8
Insert into user_film (id_user_film, id_user, id_film, name, star, comments) values 
(1, 1, 1, "Anh Khoa", 4, "Phim rất hay!")
