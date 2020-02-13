package com.anna.cultivar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.anna.cultivar.entity.Leaf;

public interface LeafRepository extends JpaSpecificationExecutor, JpaRepository<Leaf, Long> {
}
