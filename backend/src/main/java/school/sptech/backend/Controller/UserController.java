package school.sptech.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.backend.Model.User;
import school.sptech.backend.Service.UserService;

import java.util.List;

import static school.sptech.backend.Util.UserUtil.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser () {
        List <User> users = userService.getAllUsers();

        return ResponseEntity.status(200).body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById (@PathVariable Integer id) {
        User user = userService.findById(id);

        if (hasEmptyOrNullFields(user)) {
            return  ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(user);
    }

    @PostMapping
    public ResponseEntity<User> postUser (@RequestBody User bodyUser) {
        if (hasEmptyOrNullFields(bodyUser)) {
            return ResponseEntity.status(400).build();
        } else if (userService.hasFoundByEmail(bodyUser.getEmail())) {
            return ResponseEntity.status(409).build();
        }

        User createdUser = userService.postUser(bodyUser);

        return ResponseEntity.status(201).body(createdUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser (@PathVariable Integer id) {
        Integer rowsAffected = userService.deleteUser(id);

        if (rowsAffected > 0) {
            ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).build();
        }
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> putUser (@PathVariable Integer id, @RequestBody User bodyUser) {
        User putUser = userService.putUser(id, bodyUser);

        if (hasEmptyOrNullFields(putUser)) return ResponseEntity.status(404).build();

        return ResponseEntity.status(200).body(putUser);
    }
}