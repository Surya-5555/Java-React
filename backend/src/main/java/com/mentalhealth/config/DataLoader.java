package com.mentalhealth.config;

import com.mentalhealth.model.Recommendation;
import com.mentalhealth.repository.RecommendationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadRecommendations(RecommendationRepository repo){
        return args -> {
            if(repo.count() == 0){
                repo.save(create("Take a short walk for 10 minutes.", "exercise"));
                repo.save(create("Practice 5 minutes of deep breathing.", "relaxation"));
                repo.save(create("Write down three things you're grateful for.", "journaling"));
            }
        };
    }

    private Recommendation create(String text, String cat){
        Recommendation r = new Recommendation();
        r.setText(text);
        r.setCategory(cat);
        return r;
    }
}
