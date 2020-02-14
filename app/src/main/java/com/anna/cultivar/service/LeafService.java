package com.anna.cultivar.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.anna.cultivar.dto.AllowedEventsRequest;
import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.LeafDto;
import com.anna.cultivar.dto.LeafHistoryDto;
import com.anna.cultivar.dto.LeafPage;
import com.anna.cultivar.dto.LeafSearchParams;
import com.anna.cultivar.entity.LeafHistory;

public interface LeafService {

	LeafDto saveLeaf(CreateLeafRequest request);
	LeafDto getLeaf(Long leafId);
	List<LeafHistory.LeafEvent> getAllowedEvents(Long leafId, AllowedEventsRequest request);
	void removeHistoryItem(Long leafId, Long hiId);
	void saveHistoryItem(LeafHistoryDto dto, Long leafId);
	LeafPage getList(Pageable pageable, LeafSearchParams searchParams);
}
