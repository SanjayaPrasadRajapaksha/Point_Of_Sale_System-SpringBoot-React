package com.pointofsalesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pointofsalesystem.entity.UserImagePreview;

@Repository
public interface UserImagePreviewRepository extends JpaRepository<UserImagePreview, Long> {

}
