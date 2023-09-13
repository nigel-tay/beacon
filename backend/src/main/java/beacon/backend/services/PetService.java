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
import beacon.backend.records.PetDto;
import beacon.backend.repositories.PetRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;

    public JsonArray getAllFeatures() {
        return createJsonArray(petRepository.getAllFeatures());
    }

    public JsonArray createJsonArray(Optional<List<Features>> featureList) {
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

    @Transactional(rollbackFor = Exception.class)
    public void postFeatures(FeaturesDto featuresDto) {

        for (String feature: featuresDto.features()) {
            String featuresUuid = UUID.randomUUID().toString();
            try {
                System.out.println(feature);
                String returnedId = petRepository.postFeatures(feature, featuresUuid);
                postPetFeatures(featuresDto.pet_id(), returnedId);
            }
            catch (Exception e) {
                throw new AppException("Could not insert pet features and features", HttpStatus.INTERNAL_SERVER_ERROR);
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
}
