package com.johnathanalexander.vacationplanner.auth.service;


import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Locale;

import com.johnathanalexander.vacationplanner.auth.dto.AuthenticationRequestDto;
import com.johnathanalexander.vacationplanner.auth.dto.AuthenticationResponseDto;
import com.johnathanalexander.vacationplanner.auth.dto.RegisterRequestDto;

public interface AuthenticationService {
    void register(RegisterRequestDto request, Locale locale) throws MessagingException;
    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    void activateAccount(String token, Locale locale) throws MessagingException;
}
