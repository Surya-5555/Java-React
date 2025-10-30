package com.mentalhealth.repository;

import com.mentalhealth.model.Mood;
import com.mentalhealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MoodRepository extends JpaRepository<Mood, Long> {
    List<Mood> findAllByUserOrderByCreatedAtDesc(User user);
}
