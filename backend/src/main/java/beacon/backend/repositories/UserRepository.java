package beacon.backend.repositories;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import beacon.backend.models.User;

@Repository
public class UserRepository {

    private String SQL_FIND_BY_USERNAME = "SELECT * FROM beacon_user WHERE username = ?;";
    private String SQL_FIND_BY_ID = "SELECT * FROM beacon_user WHERE id = ?;";
    private String SQL_INSERT_NEW_USER = """
                INSERT INTO beacon_user (id, username, email, password, address, lat, lng, image)
                VALUES (?,?,?,?,?,?,?,?);
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
            user.setAddress(rs.getString("address"));
            user.setLat(rs.getString("lat"));
            user.setLng(rs.getString("lng"));
            user.setImage(rs.getString("image"));
            
            return Optional.of(user);
        }
        else {
            return Optional.empty();
        }
    }

    public Optional<User> findUserById(String id) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_BY_ID, id);
        if (rs.next()) {
            User user = new User();
            user.setId(rs.getString("id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setAddress(rs.getString("address"));
            user.setLat(rs.getString("lat"));
            user.setLng(rs.getString("lng"));
            user.setImage(rs.getString("image"));
            
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
                        user.getLat(),
                        user.getImage());
    }
}
