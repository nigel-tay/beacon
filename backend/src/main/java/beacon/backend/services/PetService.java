package beacon.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import beacon.backend.models.Features;
import beacon.backend.repositories.PetRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;

    public JsonArray getAllFeatures() {
        return createJsonObject(petRepository.getAllFeatures());
    }

    public JsonArray createJsonObject(Optional<List<Features>> featureList) {
        if (featureList.isEmpty()) {
            return Json.createArrayBuilder()
                    .build();
        }
        return Json.createArrayBuilder(featureList.get())
                    .build();
    }
}
