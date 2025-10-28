package com.johnathanalexander.vacationplanner.blog.service;

import org.springframework.web.multipart.MultipartFile;

import com.johnathanalexander.vacationplanner.blog.model.PhotoPost;
import com.johnathanalexander.vacationplanner.blog.model.Post;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface PhotoPostService {
    void createPhotoPost(Long postId, List<MultipartFile> images) throws IOException;
    void deletePhotoPost(Long photoPostId, Long postId) throws IOException;
    Set<PhotoPost> savePhotoPosts(List<MultipartFile> images, Post post) throws IOException;
}
