CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES
('victor', 'victor@email.com', 'victor123'),
('jullya', 'jullya@email.com', 'jullya123'),
('pedro', 'pedro@email.com', 'pedro123');
