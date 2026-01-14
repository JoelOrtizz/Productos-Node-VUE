-- Active: 1764184908007@@127.0.0.1@3306@products
create table productes (
    id_product int primary key auto_increment,
    nom varchar(100),
    quantitat int,
    preu int,
    descripcio text
);

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);