package beacon.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beacon.backend.exceptions.AppException;
import beacon.backend.records.FeaturesDto;
import beacon.backend.records.PetDto;
import beacon.backend.services.PetService;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    
    @Autowired
    private PetService petService;

    @GetMapping("/features")
    public ResponseEntity<String> getAllFeatures() {
        JsonArray ja = petService.getAllFeatures();
        return ResponseEntity.ok(ja.toString());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<String> getPetsByUserId(@PathVariable String userId) {
        JsonObject petListJson = petService.getPetsByUserId(userId);
        return ResponseEntity.ok(petListJson.toString());
    }

    @PostMapping("/features")
    public ResponseEntity<String> postFeatures(@RequestBody FeaturesDto featuresDto) {
        petService.postFeatures(featuresDto);
        return ResponseEntity.ok("message: features inserted successfully");
    }

    @PostMapping("/add")
    public ResponseEntity<String> postNewPet(@RequestBody PetDto petDto) {
        JsonObject jo = petService.postNewPet(petDto);
        if (jo == null) {
            throw new AppException("Pet could not be registered, please try again", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(jo.toString());
    }


}