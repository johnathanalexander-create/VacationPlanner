package com.johnathanalexander.vacationplanner.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.blog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
//    @Query("SELECT p FROM Post p " +
//            "LEFT JOIN FETCH p.comments c " +
//            "LEFT JOIN FETCH p.author u " +
//            "LEFT JOIN FETCH p.photoPosts pp")
//    Page<Post> findAllPostsWithRelations(Pageable pageable);
}
