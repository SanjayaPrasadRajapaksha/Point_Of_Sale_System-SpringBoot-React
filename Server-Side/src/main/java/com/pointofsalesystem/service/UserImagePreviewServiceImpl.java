package com.pointofsalesystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.UserImagePreview;
import com.pointofsalesystem.repository.UserImagePreviewRepository;

@Service
public class UserImagePreviewServiceImpl implements UserImagePreviewService{

    @Autowired
    private UserImagePreviewRepository customerImagePreviewRepository;

    @Override
    public UserImagePreview getCustomerImage(long id) {
       return customerImagePreviewRepository.findById(id).orElse(null);
    }

    @Override
    public UserImagePreview save(UserImagePreview customerImagePreview) {
      return customerImagePreviewRepository.save(customerImagePreview);
    }

    
}
