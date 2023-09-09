package beacon.backend.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import beacon.backend.models.User;

@Repository
public class UserRepository {

    private String SQL_FIND_BY_USERNAME = "SELECT * FROM beacon_user WHERE username = ?;";
    private String SQL_INSERT_NEW_USER = """
                INSERT INTO beacon_user (id, username, email, password, address, lat, lng)
                VALUES (?,?,?,?,?,?,?);
            """;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public Optional<User> findUserByUsername(String username) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_BY_USERNAME, username);
        if (rs.next()) {
            User user = new User();
            user.setId(rs.getString("id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setAddress(rs.getString("addresss"));
            user.setLat(rs.getString("lat"));
            user.setLng(rs.getString("lng"));
            
            return Optional.of(user);
        }
        else {
            return Optional.empty();
        }

    }

    public Integer insertNewUser(User user) {
        return jdbcTemplate.update(SQL_INSERT_NEW_USER, 
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getAddress(),
                        user.getLat(),
                        user.getLng());
    }
}