package com.anna.cultivar.service;

import java.util.List;

import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.entity.ExemplarHistory;

public interface ExemplarHistoryService {

	List<ExemplarHistory.ExemplarEvent> getAllowedEvents(Long exemplarId);

	void save(ExemplarHistoryDto dto, Long exemplarId);

	void update(ExemplarHistoryDto dto, Long exemplarId);

	ExemplarHistoryDto get(Long exemplarId, Long hiId);
}
