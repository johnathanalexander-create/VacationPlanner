package com.johnathanalexander.vacationplanner.user.service;

import java.util.Optional;

import com.johnathanalexander.vacationplanner.user.dto.ChangePasswordRequestDto;
import com.johnathanalexander.vacationplanner.user.dto.ChangeProfileInfoRequestDto;
import com.johnathanalexander.vacationplanner.user.dto.UserDto;
import com.johnathanalexander.vacationplanner.user.model.User;

public interface ProfileService {
    void changePassword(ChangePasswordRequestDto request);
    void changeProfile(ChangeProfileInfoRequestDto request);
    Optional<User> getCurrentUser();
    UserDto getCurrentUserDTO();
}
