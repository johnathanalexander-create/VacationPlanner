package com.johnathanalexander.vacationplanner.auth.web;


import com.johnathanalexander.vacationplanner.auth.dto.AuthenticationRequestDto;
import com.johnathanalexander.vacationplanner.auth.dto.AuthenticationResponseDto;
import com.johnathanalexander.vacationplanner.auth.dto.RegisterRequestDto;
import com.johnathanalexander.vacationplanner.auth.service.AuthenticationService;
import com.johnathanalexander.vacationplanner.common.dto.ResponseDto;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Locale;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(
            @RequestHeader(name = "Accept-Language", required = false) Locale locale,
            @Valid RegisterRequestDto request
    ) throws MessagingException {
        authenticationService.register(request, locale);
        return ResponseEntity.ok(new ResponseDto("message", "User created successfully"));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody @Valid AuthenticationRequestDto request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestHeader(name = "Accept-Language", required = false) Locale locale,
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token, locale);
    }
}
