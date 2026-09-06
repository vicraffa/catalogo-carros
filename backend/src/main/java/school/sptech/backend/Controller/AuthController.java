package school.sptech.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.backend.Model.User;
import school.sptech.backend.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController (UserService userService) { this.userService = userService; }

    @PostMapping
    public ResponseEntity<User> authUser (@RequestBody User bodyUser) {
        if (bodyUser.getEmail() == null || bodyUser.getEmail().isBlank() ||
                bodyUser.getPassword() == null || bodyUser.getPassword().isBlank()) {

            return ResponseEntity.status(400).build();
        }

       User user = userService.authUser(bodyUser.getEmail(), bodyUser.getPassword());

        if (user == null) return ResponseEntity.status(400).build();
        
        return ResponseEntity.status(200).body(user);
    }
}
