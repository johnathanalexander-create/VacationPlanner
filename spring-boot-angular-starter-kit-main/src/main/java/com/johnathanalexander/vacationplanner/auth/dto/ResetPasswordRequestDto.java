package com.johnathanalexander.vacationplanner.auth.dto;

import com.johnathanalexander.vacationplanner.common.validation.password.PasswordsMatch;
import com.johnathanalexander.vacationplanner.common.validation.password.ValidPassword;

import jakarta.validation.constraints.NotBlank;

@PasswordsMatch(passwordField = "newPassword", confirmPasswordField = "confirmPassword", message = "Passwords must match")
public record ResetPasswordRequestDto(
        @NotBlank(message = "New Password is mandatory")
        @ValidPassword(message = "Password must be at least 6 characters and must not contain whitespace")
        String newPassword,
        @NotBlank(message = "Confirm Password is mandatory")
        String confirmPassword) {
}
