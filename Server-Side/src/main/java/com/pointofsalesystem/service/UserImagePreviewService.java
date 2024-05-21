package com.pointofsalesystem.service;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.UserImagePreview;

@Service
public interface UserImagePreviewService{
    UserImagePreview getCustomerImage(long id);
    UserImagePreview save(UserImagePreview customerImagePreview);
}
