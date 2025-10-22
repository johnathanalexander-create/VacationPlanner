package com.angelokezimana.starter.user.repository;

import com.angelokezimana.starter.admin.model.Role;
import com.angelokezimana.starter.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles r LEFT JOIN FETCH r.permissions WHERE u.email = :username")
    Optional<User> findUserWithRolesAndPermissions(@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.email <> 'admin@gmail.com' AND ( " +
            ":search IS NULL OR " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<User> findAllUsers(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT u.id FROM User u WHERE u.email = :email")
	User findUserIDByEmail(@Param("email") String email);
    
}
