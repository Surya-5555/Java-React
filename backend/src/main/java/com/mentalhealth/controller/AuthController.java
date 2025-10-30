package com.mentalhealth.controller;

import com.mentalhealth.config.JwtUtil;
import com.mentalhealth.dto.AuthRequest;
import com.mentalhealth.dto.AuthResponse;
import com.mentalhealth.model.User;
import com.mentalhealth.repository.UserRepository;
import com.mentalhealth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u){
        if(userRepository.findByUsername(u.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("Username already taken");
        }
        User saved = userService.createUser(u);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            String token = jwtUtil.generateToken(req.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }catch(AuthenticationException ex){
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
