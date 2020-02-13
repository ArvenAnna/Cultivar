package com.anna.cultivar.service;

import java.util.List;

import com.anna.cultivar.dto.AllowedEventsRequest;
import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.LeafDto;
import com.anna.cultivar.dto.LeafHistoryDto;
import com.anna.cultivar.entity.LeafHistory;

public interface LeafService {

	LeafDto saveLeaf(CreateLeafRequest request);
	LeafDto getLeaf(Long leafId);
	List<LeafHistory.LeafEvent> getAllowedEvents(Long leafId, AllowedEventsRequest request);
	void removeHistoryItem(Long leafId, Long hiId);
	void saveHistoryItem(LeafHistoryDto dto, Long leafId);
}
