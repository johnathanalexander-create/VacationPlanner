package com.johnathanalexander.vacationplanner.blog.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.johnathanalexander.vacationplanner.blog.dto.PostDetailDto;
import com.johnathanalexander.vacationplanner.blog.dto.PostDto;
import com.johnathanalexander.vacationplanner.blog.dto.PostRequestDto;
import com.johnathanalexander.vacationplanner.blog.dto.PostRequestUpdateDto;

import java.io.IOException;
import java.util.List;

public interface PostService {
    Page<PostDto> getAllPosts(Pageable pageable);

    PostDetailDto createPost(PostRequestDto postRequestDTO, MultipartFile imageCover, List<MultipartFile> photos) throws IOException;

    PostDetailDto getPost(Long postId);

    PostDetailDto updatePost(Long postId, PostRequestUpdateDto postRequestDTO, MultipartFile imageCover) throws IOException;

    void deletePost(Long postId) throws IOException;
}
