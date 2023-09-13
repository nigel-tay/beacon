package beacon.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import beacon.backend.exceptions.AppException;
import beacon.backend.models.Features;
import beacon.backend.models.Pet;
import beacon.backend.records.FeaturesDto;
import beacon.backend.records.LostDto;
import beacon.backend.records.PetDto;
import beacon.backend.records.ReportDto;
import beacon.backend.repositories.PetRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;

    public JsonObject getPetById(String petId) {
        Optional<Pet> returnedPetList = petRepository.getPetById(petId);
        if (returnedPetList.isPresent()) {
            Pet returnedPet = returnedPetList.get();
            return Json.createObjectBuilder()
                    .add("id", returnedPet.getId())
                    .add("owner_id", returnedPet.getOwner_id())
                    .add("name", returnedPet.getName())
                    .add("type", returnedPet.getType())
                    .add("image", returnedPet.getImage())
                    .add("lost", returnedPet.getLost())
                    .build();
        }
        return null;
    }

    public JsonArray getAllFeatures() {
        Optional<List<Features>> featureList = petRepository.getAllFeatures();
        List<String> featureStrings = new ArrayList<>();

        featureList.ifPresent(features -> {
            features.forEach(feature -> {
                if (feature != null && feature.getFeature() != null) {
                    featureStrings.add(feature.getFeature());
                }
            });
        });
        return Json.createArrayBuilder(featureStrings).build();
    }

    public JsonObject getPetsByUserId(String userId) {
        Optional<List<Pet>> returnedPetList = petRepository.getPetsByUserId(userId);
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();

        returnedPetList.ifPresent(pets -> {
            JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
            pets.forEach(pet -> {
                if (pet != null) {
                    JsonObjectBuilder petBuilder = Json.createObjectBuilder()
                            .add("id", pet.getId())
                            .add("name", pet.getName())
                            .add("type", pet.getType())
                            .add("image", pet.getImage())
                            .add("lost", pet.getLost());
                    jsonArrayBuilder.add(petBuilder);
                }
            });

            JsonArray petArray = jsonArrayBuilder.build();
            jsonObjectBuilder.add("pets", petArray);
        });

        return jsonObjectBuilder.build();
    }

    @Transactional(rollbackFor = Exception.class)
    public void postFeatures(FeaturesDto featuresDto) {

        for (String feature: featuresDto.features()) {
            String featuresUuid = UUID.randomUUID().toString();
            try {
                String returnedId = petRepository.postFeatures(feature, featuresUuid);
                postPetFeatures(featuresDto.pet_id(), returnedId);
            }
            catch (Exception e) {
                throw new AppException("There was an issue inserting pet features: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public void postPetFeatures(String petId, String featuresId) {
        String petFeaturesUuid = UUID.randomUUID().toString();
        petRepository.insertPetFeature(petFeaturesUuid, petId, featuresId);
    }

    public JsonObject postNewPet(PetDto petDto) {
        petRepository.insertNewPet(petDto);
        if (petRepository.getPetById(petDto.id()).isPresent()) {
            Pet returnedPet = petRepository.getPetById(petDto.id()).get();
            return Json.createObjectBuilder()
                    .add("id", returnedPet.getId())
                    .add("owner_id", returnedPet.getOwner_id())
                    .add("name", returnedPet.getName())
                    .add("type", returnedPet.getType())
                    .add("image", returnedPet.getImage())
                    .add("lost", returnedPet.getLost())
                    .build();
        }
        return null;
    }

    public void postReport(ReportDto reportDto) {
        petRepository.insertNewReport(reportDto);
    }

    public void putPetLostValue(String petId, String lostValue) {
        petRepository.putPetLostValue(petId, lostValue);
    }
}
