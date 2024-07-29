CREATE DATABASE test_app_1;
USE test_app_1;

CREATE TABLE people (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age integer NOT NULL,
    gender TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()    
);

INSERT INTO people (name, age, gender)
VALUES
('Michael Kharetonenko', 18 ,'Male'),
('Maya Linehan', 19, 'Female');
