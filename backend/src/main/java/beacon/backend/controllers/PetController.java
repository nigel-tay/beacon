package beacon.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beacon.backend.services.PetService;
import jakarta.json.JsonArray;

@RestController
@RequestMapping("/api")
public class PetController {
    
    @Autowired
    private PetService petService;

    @GetMapping("/features")
    public ResponseEntity<String> getAllFeatures() {
        JsonArray ja = petService.getAllFeatures();
        return ResponseEntity.ok(ja.toString());
    }
}
