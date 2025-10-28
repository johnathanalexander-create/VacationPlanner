package com.johnathanalexander.vacationplanner.blog.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.johnathanalexander.vacationplanner.blog.dto.CommentDto;
import com.johnathanalexander.vacationplanner.blog.dto.CommentRequestDto;
import com.johnathanalexander.vacationplanner.blog.dto.CommentWithPostDto;

public interface CommentService {
    Page<CommentDto> getCommentsByPost(Long postId, Pageable pageable);
    CommentDto createComment(Long postId, CommentRequestDto commentRequestDTO);
    CommentWithPostDto getComment(Long commentId);
    CommentDto updateComment(Long commentId, CommentRequestDto commentRequestDTO);
    void deleteComment(Long commentId);
}
