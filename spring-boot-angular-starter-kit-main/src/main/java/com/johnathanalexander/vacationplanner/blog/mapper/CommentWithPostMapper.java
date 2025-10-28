package com.johnathanalexander.vacationplanner.blog.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.blog.dto.CommentWithPostDto;
import com.johnathanalexander.vacationplanner.blog.model.Comment;

public class CommentWithPostMapper {

    public static CommentWithPostDto toCommentWithPostDTO(Comment comment) {
        return new CommentWithPostDto(
                comment.getId(),
                comment.getText(),
                comment.getPublishedOn(),
                PostMapper.toPostDTO(comment.getPost()),
                AuthorMapper.toAuthorDTO(comment.getAuthor())
        );
    }

    public static Set<CommentWithPostDto> toCommentWithPostDTOList(Set<Comment> comments) {
        if (comments == null) {
            return Collections.emptySet();
        }

        return comments.stream()
                .map(CommentWithPostMapper::toCommentWithPostDTO)
                .collect(Collectors.toSet());
    }
}
