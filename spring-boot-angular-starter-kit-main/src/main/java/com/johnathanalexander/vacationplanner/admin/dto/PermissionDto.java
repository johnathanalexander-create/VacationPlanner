package com.johnathanalexander.vacationplanner.admin.dto;

public record PermissionDto(Long id,
                            String resource,
                            String action) {
}
