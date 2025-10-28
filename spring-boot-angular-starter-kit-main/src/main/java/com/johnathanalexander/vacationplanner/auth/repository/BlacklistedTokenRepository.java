package com.johnathanalexander.vacationplanner.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.auth.model.BlacklistedToken;

import java.time.LocalDateTime;
import java.util.Optional;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long> {

    Optional<BlacklistedToken> findByToken(String token);

    void deleteByExpiresAtBefore(LocalDateTime expiresAt);

    long countByExpiresAtBefore(LocalDateTime expiresAt);
}
