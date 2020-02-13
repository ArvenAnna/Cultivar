package com.anna.cultivar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anna.cultivar.entity.LeafHistory;

public interface LeafHistoryRepository extends JpaRepository<LeafHistory, Long> {
}
