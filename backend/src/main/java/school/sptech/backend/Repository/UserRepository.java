package school.sptech.backend.Repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.backend.Model.User;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> getAllUsers() {
        String sql = """
                SELECT *
                FROM users 
                """;

        List<User> users = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(User.class));

        return users;
    }

    public User getUserById(Integer id) {
        String sql = """
                SELECT *
                FROM users
                WHERE id = ?
                """;
        try {
            User user = jdbcTemplate.queryForObject(
                    sql,
                    new BeanPropertyRowMapper<>(User.class),
                    id
            );

            return user;
        } catch (EmptyResultDataAccessException e) {
            return new User();
        }
    }

    public User postUser (User user) {
        String sql = """
        INSERT INTO users (name, email, password) VALUES
        (?, ?, ?)
        """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());

            return ps;
        }, keyHolder);

        Integer id = keyHolder.getKeyAs(Integer.class);

        user.setId(id);
        return user;
    }

    public Integer deleteUser (Integer id) {
        String sql = """
                DELETE FROM users
                WHERE id = ?
                """;

        Integer rowsAffected = jdbcTemplate.update(sql, id);

        return rowsAffected;
    }

    public User putUser (Integer id, User user) {
        String sql = """
                UPDATE users SET 
                    name = ?,
                    email = ?,
                    password = ?
                WHERE id = ?
                """;

        Integer rowsAffected = jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                id);

        if (rowsAffected < 1) return new User();

        user.setId(id);

        return user;
    }

    public User authUser (String email, String password) {
        String sql = """
                SELECT *
                FROM users
                WHERE email = ? AND password = ?
                """;
        try {
            User user = jdbcTemplate.queryForObject(sql,
                    new BeanPropertyRowMapper<>(User.class),
                    email,
                    password);

            return user;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Boolean hasFoundById (Integer id) {
        String sql = """
                SELECT COUNT(*)
                FROM users
                WHERE id = ?
                """;

        Integer countId = jdbcTemplate.queryForObject(sql,
                Integer.class,
                id);

        return countId > 0;
    }

    public Boolean hasFoundByName (String name) {
        String sql = """
                SELECT COUNT(*)
                FROM users
                WHERE LOWER(name) = ?
                """;

        Integer countName = jdbcTemplate.queryForObject(sql,
                Integer.class,
                name.toLowerCase());

        return countName > 0;
    }

    public Boolean hasFoundByEmail (String email) {
        String sql = """
                SELECT COUNT(*)
                FROM users
                WHERE LOWER(email) = ?
                """;

        Integer countEmail = jdbcTemplate.queryForObject(sql,
                Integer.class,
                email.toLowerCase());

        return countEmail > 0;
    }
}
