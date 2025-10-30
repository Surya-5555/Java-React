package com.mentalhealth.repository;

import com.mentalhealth.model.Session;
import com.mentalhealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findAllByUserOrderByScheduledAtDesc(User user);
}
