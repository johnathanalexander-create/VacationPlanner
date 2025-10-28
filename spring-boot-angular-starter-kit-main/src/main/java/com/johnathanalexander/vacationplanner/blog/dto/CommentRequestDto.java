package com.johnathanalexander.vacationplanner.blog.dto;

import jakarta.validation.constraints.NotBlank;

public record CommentRequestDto(
        @NotBlank(message = "Text is mandatory")
        String text) {
}
