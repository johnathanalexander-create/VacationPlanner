package com.johnathanalexander.vacationplanner.admin.mapper;

import com.johnathanalexander.vacationplanner.admin.dto.PermissionDto;
import com.johnathanalexander.vacationplanner.admin.model.Permission;

import java.util.Set;
import java.util.stream.Collectors;

public class PermissionMapper {

    public static PermissionDto toPermissionDTO(Permission permission) {
        return new PermissionDto(
                permission.getId(),
                permission.getResource(),
                permission.getAction()
        );
    }

    public static Set<PermissionDto> toPermissionDTOList(Set<Permission> permissions) {
        return permissions.stream()
                .map(PermissionMapper::toPermissionDTO)
                .collect(Collectors.toSet());
    }
}
