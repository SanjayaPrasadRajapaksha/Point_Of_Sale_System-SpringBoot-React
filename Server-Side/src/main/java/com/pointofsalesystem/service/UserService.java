package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.User;

@Service
public interface UserService {
    List<User> getAllUsers();

    User getUserById(long id);

    User createUser(User user);

    void deleteUser(long id);
}
