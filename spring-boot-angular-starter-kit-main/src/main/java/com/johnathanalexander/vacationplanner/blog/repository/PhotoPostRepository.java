package com.johnathanalexander.vacationplanner.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.blog.model.PhotoPost;

public interface PhotoPostRepository extends JpaRepository<PhotoPost, Long> {
}
