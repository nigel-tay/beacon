package beacon.backend.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import beacon.backend.exceptions.AppException;
import beacon.backend.models.User;
import beacon.backend.records.LoginDto;
import beacon.backend.records.SignUpDto;
import beacon.backend.records.UserDto;
import beacon.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findUserByUsername(loginDto.username())
                                    .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        
        if (passwordEncoder.matches(CharBuffer.wrap(loginDto.password()),
            user.getPassword())) {
                return new UserDto(user.getId(), user.getUsername(), "");
        } 
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public User register(SignUpDto signUpDto) {
        Optional<User> optionalUser = userRepository.findUserByUsername(signUpDto.username());

        // You were implement the above repo's method
        if (optionalUser.isPresent()) {
            throw new AppException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpDto.id(), signUpDto.username(), signUpDto.password().toString(), signUpDto.email(), signUpDto.address(), signUpDto.lat(), signUpDto.lng());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.password())));

        if (userRepository.insertNewUser(user) > 0) {
            return user;
        }
        else {
            throw new AppException("User " + user.getUsername() + " was not successfully created", HttpStatus.BAD_REQUEST);
        }
    }
    
}