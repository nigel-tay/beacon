package beacon.backend.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import beacon.backend.models.Features;

@Repository
public class PetRepository {

    private String SQL_GET_FEATURES = "SELECT * FROM pet_features;";
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<List<Features>> getAllFeatures() {
        List<Features> featureList = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_FEATURES);
        
        if (!rs.isBeforeFirst()) {
            while (rs.next()) {
                Features pf = new Features();
                pf.setId(rs.getString("id"));
                pf.setId(rs.getString("feature"));
                featureList.add(pf);
            }
        }
        else {
            return Optional.empty();
        }
        return Optional.of(featureList);
    }
}
