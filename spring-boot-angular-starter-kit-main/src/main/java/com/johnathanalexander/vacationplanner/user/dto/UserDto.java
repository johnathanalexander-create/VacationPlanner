package com.johnathanalexander.vacationplanner.user.dto;

import com.johnathanalexander.vacationplanner.admin.dto.RoleDto;
import com.johnathanalexander.vacationplanner.app.model.Vacation;

import java.util.Set;

public record UserDto(Long id,
                      String firstName,
                      String lastName,
                      String email,
                      boolean accountLocked,
                      boolean enabled,
                      Set<RoleDto> roles) {
}
