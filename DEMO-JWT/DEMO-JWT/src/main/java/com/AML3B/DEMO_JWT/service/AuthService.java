package com.AML3B.DEMO_JWT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AML3B.DEMO_JWT.model.User;
import com.AML3B.DEMO_JWT.repository.UserRepository;
import com.AML3B.DEMO_JWT.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return "User not found";
        }

        String storedPassword = user.getPassword();
        boolean passwordMatches = storedPassword != null && (
                passwordEncoder.matches(password, storedPassword) || password.equals(storedPassword)
        );

        if (!passwordMatches) {
            return "Invalid password";
        }

        return jwtUtil.generateToken(username);
    }
}
