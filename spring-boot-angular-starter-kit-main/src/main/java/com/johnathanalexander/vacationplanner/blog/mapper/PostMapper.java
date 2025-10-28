package com.johnathanalexander.vacationplanner.blog.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.blog.dto.PostDetailDto;
import com.johnathanalexander.vacationplanner.blog.dto.PostDto;
import com.johnathanalexander.vacationplanner.blog.model.Post;

public class PostMapper {

    public static PostDetailDto toPostDetailDTO(Post post) {
        return new PostDetailDto(
                post.getId(),
                post.getTitle(),
                post.getText(),
                post.getImageCoverByte(),
                post.getPublishedOn(),
                (post.getComments() != null && !post.getComments().isEmpty()) ? post.getComments().size() : 0,
                PhotoPostMapper.toPhotoPostDTOList(post.getPhotoPosts()),
                AuthorMapper.toAuthorDTO(post.getAuthor())
        );
    }

    public static PostDto toPostDTO(Post post) {
        return new PostDto(
                post.getId(),
                post.getTitle(),
                post.getText(),
                post.getImageCoverByte(),
                post.getPublishedOn(),
                (post.getComments() != null && !post.getComments().isEmpty()) ? post.getComments().size() : 0,
                AuthorMapper.toAuthorDTO(post.getAuthor())
        );
    }

    public static Set<PostDto> toPostDTOList(Set<Post> posts) {
        if (posts == null) {
            return Collections.emptySet();
        }

        return posts.stream()
                .map(PostMapper::toPostDTO)
                .collect(Collectors.toSet());
    }
}
