package com.mentalhealth.controller;

import com.mentalhealth.model.Mood;
import com.mentalhealth.model.User;
import com.mentalhealth.repository.MoodRepository;
import com.mentalhealth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/moods")
public class MoodController {

    @Autowired
    private MoodRepository moodRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createMood(@AuthenticationPrincipal UserDetails ud, @RequestBody Mood mood){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            mood.setUser(user);
            Mood saved = moodRepository.save(mood);
            return ResponseEntity.ok(saved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping
    public ResponseEntity<?> listMyMoods(@AuthenticationPrincipal UserDetails ud){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            return ResponseEntity.ok(moodRepository.findAllByUserOrderByCreatedAtDesc(user));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMood(@AuthenticationPrincipal UserDetails ud, @PathVariable Long id, @RequestBody Mood updated){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            Mood mood = moodRepository.findById(id).orElseThrow();
            if(!mood.getUser().getId().equals(user.getId())){
                return ResponseEntity.status(403).body("Not allowed");
            }
            mood.setMood(updated.getMood());
            mood.setNote(updated.getNote());
            Mood saved = moodRepository.save(mood);
            return ResponseEntity.ok(saved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User or mood not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMood(@AuthenticationPrincipal UserDetails ud, @PathVariable Long id){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            Mood mood = moodRepository.findById(id).orElseThrow();
            if(!mood.getUser().getId().equals(user.getId())){
                return ResponseEntity.status(403).body("Not allowed");
            }
            moodRepository.delete(mood);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User or mood not found");
        }
    }
}
