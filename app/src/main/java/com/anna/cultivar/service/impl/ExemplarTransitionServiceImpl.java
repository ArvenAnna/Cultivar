package com.anna.cultivar.service.impl;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.dto.LeafDto;
import com.anna.cultivar.service.ExemplarService;
import com.anna.cultivar.service.ExemplarTransitionService;
import com.anna.cultivar.service.LeafService;

@Component
public class ExemplarTransitionServiceImpl implements ExemplarTransitionService {

	@Autowired
	ExemplarService exemplarService;
	@Autowired
	LeafService leafService;

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
		ExemplarDto parent = exemplarService.getExemplar(exemplarId);

		CreateLeafRequest request = CreateLeafRequest.builder()
				.date(date)
				.description("Leaf separated")
				.parent(parent)
				.variety(parent.getVariety())
				.build();

		leafService.saveLeaf(request);
	}

	@Override
	public void createExemplarFromChildSeparation(Long leafId, LocalDate date) {
		LeafDto parentLeaf = leafService.getLeaf(leafId);
		ExemplarCreationRequest request = ExemplarCreationRequest.builder()
				.date(date)
				.name("Leaf separation exemplar")
				.description("Leaf separation exemplar description")
				.parentLeaf(parentLeaf)
				.parent(parentLeaf.getParent() != null ? parentLeaf.getParent() : null)
				.sport(parentLeaf.getParent() != null ? parentLeaf.getParent().isSport() : false)
				.variety(parentLeaf.getVariety())
				.build();
		exemplarService.save(request);
	}
}
