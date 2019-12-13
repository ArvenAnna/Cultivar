package com.anna.cultivar.service;

import com.anna.cultivar.dto.ExemplarHistoryDto;

public interface ExemplarHistoryService {
	void save(ExemplarHistoryDto dto, Long exemplarId);

	void update(ExemplarHistoryDto dto, Long exemplarId);
}
