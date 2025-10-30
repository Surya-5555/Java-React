package com.mentalhealth.controller;

import com.mentalhealth.model.Mood;
import com.mentalhealth.model.User;
import com.mentalhealth.repository.MoodRepository;
import com.mentalhealth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private MoodRepository moodRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/mood-trends")
    public ResponseEntity<?> moodTrends(@AuthenticationPrincipal UserDetails ud){
        try {
            User user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
            List<Mood> moods = moodRepository.findAllByUserOrderByCreatedAtDesc(user);
            Map<String,Integer> counts = new HashMap<>();
            for(Mood m: moods){
                counts.put(m.getMood(), counts.getOrDefault(m.getMood(),0)+1);
            }
            return ResponseEntity.ok(counts);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
