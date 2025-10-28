package com.johnathanalexander.vacationplanner.blog.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.blog.dto.PhotoPostDto;
import com.johnathanalexander.vacationplanner.blog.model.PhotoPost;

public class PhotoPostMapper {

    public static PhotoPostDto toPhotoPostDTO(PhotoPost photoPost) {
        return new PhotoPostDto(
                photoPost.getId(),
                photoPost.getImageByte()
        );
    }

    public static Set<PhotoPostDto> toPhotoPostDTOList(Set<PhotoPost> photoPosts) {
        if (photoPosts == null) {
            return Collections.emptySet();
        }

        return photoPosts.stream()
                .map(PhotoPostMapper::toPhotoPostDTO)
                .collect(Collectors.toSet());
    }
}
