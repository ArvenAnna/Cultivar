package com.anna.cultivar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.anna.cultivar.entity.Variety;

public interface VarietyRepository extends JpaSpecificationExecutor, JpaRepository<Variety, Long> {
}
