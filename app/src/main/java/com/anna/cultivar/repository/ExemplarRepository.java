package com.anna.cultivar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.anna.cultivar.entity.Exemplar;

public interface ExemplarRepository extends JpaSpecificationExecutor, JpaRepository<Exemplar, Long> {
}
