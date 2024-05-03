package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.User;

@Service
public interface UserService {
    List<User> getAllUsers();

    User getUserById(long id);

    User createUser(User user);

    User updateUser(User user, long id);

    void deleteUser(long id);
}
