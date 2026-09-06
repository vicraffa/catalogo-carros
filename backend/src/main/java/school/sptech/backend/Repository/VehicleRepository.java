package school.sptech.backend.Repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.backend.Model.FuelType;
import school.sptech.backend.Model.Vehicle;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class VehicleRepository {
    private final JdbcTemplate jdbcTemplate;

    public VehicleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Vehicle> getAllVehicles() {
        String sql = """
                SELECT *
                FROM vehicle
                """;

        List<Vehicle> vehicles = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Vehicle.class)
        );

        vehicles.forEach(this::loadFuelTypes);
        return vehicles;
    }

    public Vehicle getVehicleById(Integer id) {
        String sql = """
                SELECT *
                FROM vehicle
                WHERE id = ?
                """;

        try {
            Vehicle vehicle = jdbcTemplate.queryForObject(
                    sql,
                    new BeanPropertyRowMapper<>(Vehicle.class),
                    id
            );

            loadFuelTypes(vehicle);
            return vehicle;
        } catch (EmptyResultDataAccessException e) {
            return new Vehicle();
        }
    }

    public Vehicle postVehicle(Vehicle vehicle) {
        String sql = """
                INSERT INTO vehicle (brand, model, `year`, power, plate, `state`, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, vehicle.getBrand());
            statement.setString(2, vehicle.getModel());
            statement.setInt(3, vehicle.getYear());
            statement.setInt(4, vehicle.getPower());
            statement.setString(5, vehicle.getPlate());
            statement.setString(6, vehicle.getState());
            statement.setString(7, vehicle.getImageUrl());

            return statement;
        }, keyHolder);

        vehicle.setId(keyHolder.getKeyAs(Integer.class));
        replaceFuelTypes(vehicle);
        return vehicle;
    }

    public Integer deleteVehicle(Integer id) {
        String sql = """
                DELETE FROM vehicle
                WHERE id = ?
                """;

        return jdbcTemplate.update(sql, id);
    }

    public Vehicle putVehicle(Integer id, Vehicle vehicle) {
        String sql = """
                UPDATE vehicle SET
                    brand = ?,
                    model = ?,
                    `year` = ?,
                    power = ?,
                    plate = ?,
                    `state` = ?,
                    image_url = ?
                WHERE id = ?
                """;

        int rowsAffected = jdbcTemplate.update(
                sql,
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getYear(),
                vehicle.getPower(),
                vehicle.getPlate(),
                vehicle.getState(),
                vehicle.getImageUrl(),
                id
        );

        if (rowsAffected < 1) {
            return new Vehicle();
        }

        vehicle.setId(id);
        replaceFuelTypes(vehicle);
        return vehicle;
    }

    public Boolean hasFoundById(Integer id) {
        String sql = """
                SELECT COUNT(*)
                FROM vehicle
                WHERE id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    public Boolean hasFoundByModel(String model) {
        String sql = """
                SELECT COUNT(*)
                FROM vehicle
                WHERE LOWER(model) = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                model.toLowerCase()
        );
        return count != null && count > 0;
    }

    public Boolean hasFoundByPlate(String plate) {
        String sql = """
                SELECT COUNT(*)
                FROM vehicle
                WHERE LOWER(plate) = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                plate.toLowerCase()
        );
        return count != null && count > 0;
    }

    private void loadFuelTypes(Vehicle vehicle) {
        String sql = """
                SELECT fuel_type.name
                FROM fuel_type
                INNER JOIN vehicle_fuel_type
                    ON vehicle_fuel_type.fuel_type_id = fuel_type.id
                WHERE vehicle_fuel_type.vehicle_id = ?
                ORDER BY fuel_type.id
                """;

        List<FuelType> fuelTypes = jdbcTemplate.query(
                sql,
                (resultSet, rowNumber) -> FuelType.fromValue(resultSet.getString("name")),
                vehicle.getId()
        );

        vehicle.setFuelTypes(fuelTypes);
    }

    private void replaceFuelTypes(Vehicle vehicle) {
        String deleteSql = """
                DELETE FROM vehicle_fuel_type
                WHERE vehicle_id = ?
                """;

        jdbcTemplate.update(deleteSql, vehicle.getId());

        String insertSql = """
                INSERT INTO vehicle_fuel_type (vehicle_id, fuel_type_id)
                SELECT ?, id
                FROM fuel_type
                WHERE name = ?
                """;

        for (FuelType fuelType : vehicle.getFuelTypes()) {
            int rowsAffected = jdbcTemplate.update(
                    insertSql,
                    vehicle.getId(),
                    fuelType.getDisplayName()
            );

            if (rowsAffected != 1) {
                throw new IllegalArgumentException(
                        "Tipo de combustível não cadastrado: " + fuelType.getDisplayName()
                );
            }
        }
    }
}
