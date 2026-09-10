CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    `year` INT NOT NULL,
    power INT NOT NULL,
    plate VARCHAR(7),
    `state` VARCHAR(10),
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS fuel_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vehicle_fuel_type (
    vehicle_id INT NOT NULL,
    fuel_type_id INT NOT NULL,
    PRIMARY KEY (vehicle_id, fuel_type_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE,
    FOREIGN KEY (fuel_type_id) REFERENCES fuel_type(id)
);

INSERT INTO fuel_type (name) VALUES
('Gasolina comum'),
('Gasolina aditivada'),
('Gasolina premium'),
('Etanol'),
('Diesel'),
('GNV'),
('Eletrico');

INSERT INTO users (name, email, password) VALUES
('victor', 'victor@email.com', 'victor123'),
('jullya', 'jullya@email.com', 'jullya123'),
('pedro', 'pedro@email.com', 'pedro123');

INSERT INTO vehicle (brand, model, `year`, power, plate, `state`, image_url) VALUES
('Chevrolet', 'Onix', 2024, 116, 'XYZ9X99', 'Novo', '');

INSERT INTO vehicle_fuel_type (vehicle_id, fuel_type_id)
SELECT vehicle.id, fuel_type.id
FROM vehicle, fuel_type
WHERE vehicle.plate = 'XYZ9X99'
  AND fuel_type.name IN ('Gasolina comum', 'Etanol');
