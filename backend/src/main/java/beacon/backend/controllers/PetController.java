package beacon.backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import beacon.backend.exceptions.AppException;
import beacon.backend.records.FeaturesDto;
import beacon.backend.records.LostDto;
import beacon.backend.records.PetDto;
import beacon.backend.records.ReportDto;
import beacon.backend.services.PetService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    
    @Autowired
    private PetService petService;

    @GetMapping("/{petId}")
    public ResponseEntity<String> getPetById(@PathVariable String petId) {
        JsonObject petJo = petService.getPetById(petId);
        return ResponseEntity.ok(petJo.toString());
    }

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

    @GetMapping("/reports/{petId}")
    public ResponseEntity<String> getOpenReportByPetId(@PathVariable String petId) {
        JsonObject jo = petService.getOpenReportByPetId(petId);
        
        if (jo != null) {
            return ResponseEntity.ok(jo.toString());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/features")
    public ResponseEntity<String> postFeatures(@RequestBody FeaturesDto featuresDto) {
        petService.postFeatures(featuresDto);
        JsonObject jo = Json.createObjectBuilder()
                        .add("message", "Feature added")
                        .build();
        return ResponseEntity.ok(jo.toString());
    }

    @PostMapping("/add")
    public ResponseEntity<String> postNewPet(@RequestBody PetDto petDto) {
        JsonObject jo = petService.postNewPet(petDto);
        if (jo == null) {
            throw new AppException("Pet could not be registered, please try again", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(jo.toString());
    }

    @PostMapping("/reports")
    public ResponseEntity<String> postReport(@RequestBody ReportDto reportDto) {
        petService.postReport(reportDto);
        JsonObject jo = Json.createObjectBuilder()
                        .add("message", "Report created")
                        .build();
        return ResponseEntity.ok(jo.toString());
    }

    @PutMapping(path="/lost/{petId}", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> putPetLostValue(@PathVariable String petId, @RequestBody Map<String, Object> requestBody) {
        String lostValue = requestBody.get("lostValue").toString();
        petService.putPetLostValue(petId, lostValue);
        JsonObject jo = Json.createObjectBuilder()
                        .add("message", "Lost value amended to " + lostValue)
                        .build();
        return ResponseEntity.ok(jo.toString());
    }


}