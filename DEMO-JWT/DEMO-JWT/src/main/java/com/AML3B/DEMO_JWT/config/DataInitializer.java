package com.AML3B.DEMO_JWT.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.AML3B.DEMO_JWT.model.User;
import com.AML3B.DEMO_JWT.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Create sample users
            if (userRepository.findByUsername("admin") == null) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                userRepository.save(admin);
            }

            if (userRepository.findByUsername("user") == null) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("user123"));
                userRepository.save(user);
            }

            if (userRepository.findByUsername("testuser") == null) {
                User testUser = new User();
                testUser.setUsername("testuser");
                testUser.setPassword(passwordEncoder.encode("testpass"));
                userRepository.save(testUser);
            }

            System.out.println("Sample users created:");
            System.out.println("- admin / admin123");
            System.out.println("- user / user123");
            System.out.println("- testuser / testpass");
        };
    }
}
