package com.pointofsalesystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.entity.UserImagePreview;
import com.pointofsalesystem.service.UserImagePreviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@CrossOrigin(origins = "*")
public class UserImagePreviewController {

    @Autowired
    private UserImagePreviewService customerImagePreviewService;

    @GetMapping("/imagePreview/{id}")
    public ResponseEntity<UserImagePreview> getCustomerImage(@PathVariable long id) {
        UserImagePreview customerImagePreview = customerImagePreviewService.getCustomerImage(id);

        if (customerImagePreview == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(200).body(customerImagePreview);
        }
    }

}
