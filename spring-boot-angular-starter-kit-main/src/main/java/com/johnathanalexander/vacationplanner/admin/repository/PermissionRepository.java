package com.johnathanalexander.vacationplanner.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.admin.model.Permission;

import java.util.List;


public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Permission findByResourceAndAction(String resource, String action);
    List<Permission> findByResource(String resource);
}
