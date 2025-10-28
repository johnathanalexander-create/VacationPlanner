package com.johnathanalexander.vacationplanner.auth.service;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import com.johnathanalexander.vacationplanner.user.model.User;

public interface BlacklistedTokenService {
    void saveBlacklistedToken(HttpServletResponse response, String token, User user) throws IOException;
}
