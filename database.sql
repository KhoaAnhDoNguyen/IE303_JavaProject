create database java_project
use java_project

CREATE TABLE Customer (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    phone_number VARCHAR(20)
);
select *from customer

DELETE FROM customer where ID = "8" ;

SELECT COUNT(*)
FROM information_schema.columns
WHERE table_schema = 'java_project' AND table_name = 'Customer';

CREATE TABLE Film (
    IDFilm INT AUTO_INCREMENT PRIMARY KEY,
    FilmName VARCHAR(255),
    Time INT,
    Director VARCHAR(255),
    Type VARCHAR(100),
    Actor VARCHAR(255),
    Content TEXT,
    Status ENUM('Now Showing', 'Upcoming', 'Past')
);

CREATE TABLE Screening (
    ScreeningID INT AUTO_INCREMENT PRIMARY KEY,
    IDFilm INT,
    Day DATE,
    TimeStart VARCHAR(255),
    CinemaAddress VARCHAR(255),
    CinemaName VARCHAR(255),
    FOREIGN KEY (IDFilm) REFERENCES Film(IDFilm)
);

CREATE TABLE Ticket (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    ScreeningID INT,
    TypeTicket VARCHAR(50),
    Price DECIMAL(10, 2),
    TypeSeat VARCHAR(50),
    Quantity INT,
    FoodType VARCHAR(100),
    FOREIGN KEY (ScreeningID) REFERENCES Screening(ScreeningID)
);

CREATE TABLE Booking (
    IDBooking INT AUTO_INCREMENT PRIMARY KEY,
    IDCustomer INT,
    TicketID INT,
    FOREIGN KEY (IDCustomer) REFERENCES Customer(ID),
    FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID)
);


