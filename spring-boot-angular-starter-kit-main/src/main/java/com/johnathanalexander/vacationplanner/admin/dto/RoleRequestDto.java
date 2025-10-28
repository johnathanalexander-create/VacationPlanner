package com.johnathanalexander.vacationplanner.admin.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record RoleRequestDto(
        Long id,
        @NotBlank(message = "Name is mandatory")
        String name,
        Set<Long> permissionIds
) {
}
