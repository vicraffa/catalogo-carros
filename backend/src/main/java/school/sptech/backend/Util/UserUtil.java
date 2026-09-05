package school.sptech.backend.Util;

import school.sptech.backend.Model.User;

public class UserUtil {

    public static Boolean hasEmptyOrNullFields (User user) {
        String name = user.getName();
        String email = user.getEmail();
        String password = user.getPassword();
        return (name == null || name.isBlank() ||
                email == null || email.isBlank() ||
                password == null || password.isBlank());
    }
}
