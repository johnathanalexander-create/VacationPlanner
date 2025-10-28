package com.johnathanalexander.vacationplanner.blog.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.johnathanalexander.vacationplanner.blog.dto.PostDetailDto;
import com.johnathanalexander.vacationplanner.blog.service.PhotoPostService;
import com.johnathanalexander.vacationplanner.blog.service.PostService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/photo_posts")
public class PhotoPostController {

    private final PhotoPostService photoPostService;
    private final PostService postService;

    @Autowired
    public PhotoPostController(PhotoPostService photoPostService, PostService postService) {
        this.photoPostService = photoPostService;
        this.postService = postService;
    }

    @PostMapping(value = "/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    private ResponseEntity<PostDetailDto> create(@PathVariable Long postId,
                                                 @RequestParam("photos") List<MultipartFile> photos) throws IOException {
        photoPostService.createPhotoPost(postId, photos);
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @DeleteMapping("/{postId}/{photoPostId}")
    private ResponseEntity<?> delete(@PathVariable Long postId,
                                     @PathVariable Long photoPostId) throws IOException {

        photoPostService.deletePhotoPost(photoPostId, postId);
        return ResponseEntity.ok(postService.getPost(postId));
    }
}
