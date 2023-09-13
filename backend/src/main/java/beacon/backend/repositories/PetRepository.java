package beacon.backend.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import beacon.backend.models.Features;
import beacon.backend.models.Pet;
import beacon.backend.records.PetDto;

@Repository
public class PetRepository {

    private String SQL_GET_FEATURES = "SELECT * FROM features;";
    private String SQL_GET_FEATURES_BY_COLUMN = "SELECT * FROM features WHERE feature = ?;";
    private String SQL_GET_PETS_BY_USER_ID = "SELECT * FROM pet WHERE owner_id = ?;";
    private String SQL_GET_PET_BY_ID = "SELECT * FROM pet WHERE id = ?;";
    private String SQL_INSERT_FEATURES = """
        INSERT INTO features (id, feature)
        VALUES (?,?);
    """;
    private String SQL_INSERT_PET_FEATURES = """
        INSERT INTO pet_features (id, pet_id, features_id)
        VALUES (?,?,?);
    """;
    private String SQL_INSERT_PET = """
        INSERT INTO pet (id, owner_id, name, type, image, lost)
        VALUES (?,?,?,?,?,?);
    """;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<List<Features>> getAllFeatures() {
        List<Features> featureList = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_FEATURES);
        
        while (rs.next()) {
            Features pf = new Features();
            pf.setId(rs.getString("id"));
            pf.setFeature(rs.getString("feature"));
            featureList.add(pf);
        }
    
        if (featureList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(featureList);
        }
    }

    public Optional<List<Pet>> getPetsByUserId(String userId) {
        List<Pet> petList = new ArrayList<>();

        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_PETS_BY_USER_ID, userId);
        
        while (rs.next()) {
            Pet pet = new Pet();
            pet.setId(rs.getString("id"));
            pet.setOwner_id(rs.getString("owner_id"));
            pet.setName(rs.getString("name"));
            pet.setType(rs.getString("type"));
            pet.setImage(rs.getString("image"));
            pet.setLost(rs.getInt("lost"));
            petList.add(pet);
        }
    
        if (petList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(petList);
        }
    }

    public String postFeatures(String feature, String featuresUuid) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_FEATURES_BY_COLUMN, feature);
        if (!rs.next()) {
            jdbcTemplate.update(SQL_INSERT_FEATURES, featuresUuid, feature);
            return featuresUuid;
        }
        else {
            return rs.getString("id");
        }
    }

    public void insertPetFeature(String petFeaturesUuid, String petId, String featuresId) {
        jdbcTemplate.update(SQL_INSERT_PET_FEATURES, petFeaturesUuid, petId, featuresId);
    }

    public void insertNewPet(PetDto petDto) {
        jdbcTemplate.update(
            SQL_INSERT_PET,
            petDto.id(),
            petDto.ownerId(),
            petDto.name(),
            petDto.type(),
            petDto.image(),
            petDto.lost());
    }

    public Optional<Pet> getPetById(String petId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_PET_BY_ID, petId);
        if (rs.next()) {
            Pet pet = new Pet(
                rs.getString("id"),
                rs.getString("owner_id"),
                rs.getString("name"),
                rs.getString("type"),
                rs.getString("image"),
                rs.getInt("lost")
                );
            return Optional.of(pet);
        }
        return Optional.empty();
    }
}
