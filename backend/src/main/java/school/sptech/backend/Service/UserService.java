package school.sptech.backend.Service;

import org.springframework.stereotype.Service;
import school.sptech.backend.Model.User;
import school.sptech.backend.Repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers () {
        return userRepository.getAllUsers();
    }

    public User findById(Integer id) {
        return userRepository.getUserById(id);
    }

    public User postUser (User user) {
        return userRepository.postUser(user);
    }

    public Integer deleteUser (Integer id) {
        return userRepository.deleteUser(id);
    }

    public User putUser (Integer id, User user) {
        return userRepository.putUser(id, user);
    }

    public User authUser (String email, String password) {
        return userRepository.authUser(email, password);
    }

    public Boolean hasFoundById (Integer id) {
        Boolean found = userRepository.hasFoundById(id);

        return found;
    }

    /*public Boolean hasFoundByName (String name) {
        Boolean found = userRepository.hasFoundByName(name);

        return found;
    }*/

    public Boolean hasFoundByEmail (String email) {
        Boolean found = userRepository.hasFoundByEmail(email);

        return found;
    }
}
