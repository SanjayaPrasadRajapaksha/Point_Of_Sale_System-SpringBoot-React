package com.pointofsalesystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.dto.LoginDto;
import com.pointofsalesystem.entity.User;
import com.pointofsalesystem.entity.UserImagePreview;
import com.pointofsalesystem.security.jwt.JwtUtils;
import com.pointofsalesystem.service.UserImagePreviewService;
import com.pointofsalesystem.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private UserImagePreviewService userImagePreviewService;

    @PostMapping("/auth/login")
    public String postMethodName(@RequestBody LoginDto loginDto) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = jwtUtils.generateJwtToken(authentication);
        if (jwtToken != null) {
            User user = userService.getUserByUsername(loginDto.getUsername());

            UserImagePreview preview = new UserImagePreview();
            preview.setId(1);
            preview.setEmail(user.getEmail());
            preview.setImageUrl(user.getImageUrl());

            userImagePreviewService.save(preview);

        }

        return jwtToken;

    }

}
