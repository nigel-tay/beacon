package beacon.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beacon.backend.records.SightingDto;
import beacon.backend.services.SightingService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api")
public class SightingController {

    @Autowired
    private SightingService sightingService;
    
    @PostMapping("/sightings")
    public ResponseEntity<String> postSighting(@RequestBody SightingDto sightingDto) {
        sightingService.postSighting(sightingDto);
        JsonObject jo = Json.createObjectBuilder()
                        .add("message", "Sighting created")
                        .build();
        return ResponseEntity.ok(jo.toString());
    }

    // @DeleteMapping("/sightings/delete")
    // public ResponseEntity<String> deleteSighting() {

    // }
}
