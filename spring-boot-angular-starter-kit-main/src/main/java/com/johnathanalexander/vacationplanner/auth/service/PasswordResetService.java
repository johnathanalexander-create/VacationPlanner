package com.johnathanalexander.vacationplanner.auth.service;

import jakarta.mail.MessagingException;

import java.util.Locale;

import com.johnathanalexander.vacationplanner.auth.dto.ResetPasswordRequestDto;

public interface PasswordResetService {
    void generatePasswordResetToken(String email, Locale locale) throws MessagingException;
    void resetPassword(String token, ResetPasswordRequestDto request);
}
