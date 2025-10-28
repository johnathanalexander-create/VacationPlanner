package com.johnathanalexander.vacationplanner.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.johnathanalexander.vacationplanner.user.dto.UserDto;
import com.johnathanalexander.vacationplanner.user.dto.UserRequestDto;


public interface UserService {
    Page<UserDto> getAllUsers(String search, Pageable pageable);
    UserDto createUser(UserRequestDto userRequestDTO);
    UserDto getUser(Long userId);
    UserDto updateUser(Long userId, UserRequestDto updatedUser);
    void deleteUser(Long userId);
}
