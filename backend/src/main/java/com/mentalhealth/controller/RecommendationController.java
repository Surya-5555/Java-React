package com.mentalhealth.controller;

import com.mentalhealth.model.Recommendation;
import com.mentalhealth.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @GetMapping
    public ResponseEntity<List<Recommendation>> listAll(){
        return ResponseEntity.ok(recommendationRepository.findAll());
    }
}
