package com.mentalhealth.controller;

import com.mentalhealth.model.Session;
import com.mentalhealth.model.User;
import com.mentalhealth.repository.SessionRepository;
import com.mentalhealth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> scheduleSession(@AuthenticationPrincipal UserDetails ud, @RequestBody Session s){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            s.setUser(user);
            Session saved = sessionRepository.save(s);
            return ResponseEntity.ok(saved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping
    public ResponseEntity<?> listMySessions(@AuthenticationPrincipal UserDetails ud){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            List<Session> sessions = sessionRepository.findAllByUserOrderByScheduledAtDesc(user);
            return ResponseEntity.ok(sessions);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
