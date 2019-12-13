package com.anna.cultivar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anna.cultivar.entity.ExemplarHistory;

public interface ExemplarHistoryRepository extends JpaRepository<ExemplarHistory, Long> {
}
