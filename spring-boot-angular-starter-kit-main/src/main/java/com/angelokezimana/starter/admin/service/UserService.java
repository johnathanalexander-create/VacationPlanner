package com.angelokezimana.starter.admin.service;

import com.angelokezimana.starter.user.dto.UserDto;
import com.angelokezimana.starter.user.dto.UserRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserService {
    Page<UserDto> getAllUsers(String search, Pageable pageable);
    UserDto createUser(UserRequestDto userRequestDTO);
    UserDto getUser(Long userId);
    UserDto updateUser(Long userId, UserRequestDto updatedUser);
    void deleteUser(Long userId);
}
