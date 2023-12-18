-- CREATE TABLE team_members ( 

-- id INT AUTO_INCREMENT PRIMARY KEY, 

-- name VARCHAR(255), 

-- role VARCHAR(255) 
-- );

CREATE TABLE product_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(1024) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);
