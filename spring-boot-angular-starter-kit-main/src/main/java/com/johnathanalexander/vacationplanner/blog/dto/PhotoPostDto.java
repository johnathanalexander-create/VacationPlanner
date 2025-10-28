package com.johnathanalexander.vacationplanner.blog.dto;

import jakarta.validation.constraints.NotBlank;

public record PhotoPostDto(
        Long id,

        @NotBlank(message = "Image is mandatory")
        byte[] image) {
}
