package beacon.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beacon.backend.services.UserService;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<String> getUserById(@PathVariable String id) {
        JsonObject userJsonObject = userService.getUserById(id);
        return ResponseEntity.ok(userJsonObject.toString());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> putUserById(@PathVariable String id) {
        JsonObject userJsonObject = userService.putUserById(id);
        return ResponseEntity.ok(userJsonObject.toString());
    }
}
