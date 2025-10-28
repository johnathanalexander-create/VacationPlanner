package com.johnathanalexander.vacationplanner.user.dto;

import com.johnathanalexander.vacationplanner.common.validation.password.PasswordsMatch;
import com.johnathanalexander.vacationplanner.common.validation.password.ValidPassword;

import jakarta.validation.constraints.NotBlank;

@PasswordsMatch(passwordField = "newPassword", confirmPasswordField = "confirmationPassword", message = "Passwords must match")
public record ChangePasswordRequestDto(
        @NotBlank(message = "Current Password is mandatory")
        String currentPassword,

        @NotBlank(message = "New Password is mandatory")
        @ValidPassword(message = "Password must be at least 6 characters and must not contain whitespace")
        String newPassword,

        @NotBlank(message = "Confirmation Password is mandatory")
        String confirmationPassword
) {
}
