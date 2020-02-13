package com.anna.cultivar.service.impl;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.service.ExemplarService;
import com.anna.cultivar.service.ExemplarTransitionService;

@Component
public class ExemplarTransitionServiceImpl implements ExemplarTransitionService {

	@Autowired
	ExemplarService exemplarService;

	@Transactional
	@Override
	public void createExemplarFromSteamSeparation(Long exemplarId, LocalDate date) {
		ExemplarDto parent = exemplarService.getExemplar(exemplarId);
		ExemplarCreationRequest request = ExemplarCreationRequest.builder()
				.date(date)
				.name("Steam separation exemplar")
				.description("Steam separation exemplar description")
				.parent(parent)
				.sport(parent.isSport())
				.variety(parent.getVariety())
				.build();
		exemplarService.save(request);
	}

	@Override
	public void createLeafFromLeafSeparation(Long exemplarId, LocalDate date) {

	}

	@Override
	public void createExemplarFromChildSeparation(Long leafId, LocalDate date) {

	}
}
