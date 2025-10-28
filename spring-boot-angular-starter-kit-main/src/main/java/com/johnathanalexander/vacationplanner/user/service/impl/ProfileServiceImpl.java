/**
 * Created By angelokezimana
 * Date: 2/14/2025
 * Time: 2:22 PM
 */

package com.johnathanalexander.vacationplanner.user.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.johnathanalexander.vacationplanner.user.dto.ChangePasswordRequestDto;
import com.johnathanalexander.vacationplanner.user.dto.ChangeProfileInfoRequestDto;
import com.johnathanalexander.vacationplanner.user.dto.UserDto;
import com.johnathanalexander.vacationplanner.user.exception.UserNotFoundException;
import com.johnathanalexander.vacationplanner.user.mapper.UserMapper;
import com.johnathanalexander.vacationplanner.user.model.User;
import com.johnathanalexander.vacationplanner.user.repository.UserRepository;
import com.johnathanalexander.vacationplanner.user.service.ProfileService;

import java.util.Optional;
import java.util.function.Consumer;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void changePassword(ChangePasswordRequestDto request) {

        User user = getCurrentUser()
                .orElseThrow(() -> new UserNotFoundException("No authenticated user found"));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong current password");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));

        userRepository.save(user);
    }

    public void changeProfile(ChangeProfileInfoRequestDto request) {

        User user = getCurrentUser()
                .orElseThrow(() -> new UserNotFoundException("No authenticated user found"));

        updateFieldIfPresent(request.firstName(), user::setFirstName);
        updateFieldIfPresent(request.lastName(), user::setLastName);

        userRepository.save(user);
    }

    private void updateFieldIfPresent(String newValue, Consumer<String> updateMethod) {
        if (newValue != null && !newValue.trim().isEmpty()) {
            updateMethod.accept(newValue);
        }
    }

    public Optional<User> getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return Optional.of((User) authentication.getPrincipal());
        }
        return Optional.empty();
    }

    public UserDto getCurrentUserDTO() {
        return UserMapper.toUserDTO(getCurrentUser().orElseThrow(() -> new IllegalStateException("User not found")));
    }
}
