package beacon.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import beacon.backend.exceptions.AppException;
import beacon.backend.records.SightingDto;

@Repository
public class SightingRepository {

    private String SQL_INSERT_SIGHTING = """
        INSERT INTO sighting (id, user_id, report_id, content, date_time, image, deleted)
        VALUES (?,?,?,?,?,?,?);
    """;
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void postSighting(SightingDto sightingDto) {
        int result = jdbcTemplate.update(
            SQL_INSERT_SIGHTING,
            sightingDto.id(),
            sightingDto.user_id(),
            sightingDto.report_id(),
            sightingDto.content(),
            sightingDto.date_time(),
            sightingDto.image(),
            sightingDto.deleted());
        if (result < 1) {
            throw new AppException("Sighting could not be lodged", HttpStatus.BAD_REQUEST);
        }
    }
}
