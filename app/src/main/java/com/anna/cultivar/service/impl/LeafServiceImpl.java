package com.anna.cultivar.service.impl;

import static com.anna.cultivar.entity.LeafHistory.LeafEvent.APPEARANCE;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.DISAPPEARANCE;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.FIRST_LEAF;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.GROW;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.LEAF_ROOTS;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.PLANTING_GROUND;
import static com.anna.cultivar.entity.LeafHistory.LeafEvent.SEPARATE_FROM_LEAF;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.AllowedEventsRequest;
import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.dto.ExemplarPage;
import com.anna.cultivar.dto.LeafDto;
import com.anna.cultivar.dto.LeafHistoryDto;
import com.anna.cultivar.dto.LeafPage;
import com.anna.cultivar.dto.LeafSearchParams;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.Leaf;
import com.anna.cultivar.entity.LeafHistory;
import com.anna.cultivar.repository.ExemplarSpecification;
import com.anna.cultivar.repository.LeafHistoryRepository;
import com.anna.cultivar.repository.LeafRepository;
import com.anna.cultivar.repository.LeafSpecification;
import com.anna.cultivar.service.ExemplarTransitionService;
import com.anna.cultivar.service.LeafService;

@Component
public class LeafServiceImpl implements LeafService {

	private static Map<LeafHistory.LeafEvent, List<LeafHistory.LeafEvent>> eventsMapping = new HashMap<>();

	static {
		eventsMapping.put(APPEARANCE,
				Arrays.asList(LEAF_ROOTS, PLANTING_GROUND, FIRST_LEAF, SEPARATE_FROM_LEAF, GROW, DISAPPEARANCE));
		eventsMapping.put(LEAF_ROOTS,
				Arrays.asList(PLANTING_GROUND, FIRST_LEAF, GROW, DISAPPEARANCE));
		eventsMapping.put(PLANTING_GROUND,
				Arrays.asList(FIRST_LEAF, SEPARATE_FROM_LEAF, GROW, DISAPPEARANCE));
		eventsMapping.put(FIRST_LEAF,
				Arrays.asList(SEPARATE_FROM_LEAF, GROW, DISAPPEARANCE));
		eventsMapping.put(SEPARATE_FROM_LEAF,
				Arrays.asList(FIRST_LEAF, SEPARATE_FROM_LEAF, GROW, DISAPPEARANCE));
		eventsMapping.put(DISAPPEARANCE,
				Collections.emptyList());
		eventsMapping.put(null,
				Collections.emptyList());

	}

	@Autowired
	private LeafRepository leafRepository;
	@Autowired
	private LeafHistoryRepository leafHistoryRepository;
	@Autowired
	private ExemplarTransitionService exemplarTransitionService;
	@Autowired
	private FileServiceImpl fileService;

	@Transactional
	@Override
	public LeafDto saveLeaf(CreateLeafRequest request) {
		Leaf entity = Leaf.of(request);

		LeafHistory history = LeafHistory.of(request);
		history.setLeaf(entity);
		entity.getHistory().add(history);

		saveAllFiles(entity);

		return LeafDto.of(leafRepository.saveAndFlush(entity));
	}

	@Transactional
	@Override
	public LeafDto getLeaf(Long leafId) {
		return leafRepository.findById(leafId)
				.map(LeafDto::of)
				.orElseThrow(() -> new IllegalArgumentException("No leaf with given id " + leafId));
	}

	@Transactional
	@Override
	public List<LeafHistory.LeafEvent> getAllowedEvents(Long leafId, AllowedEventsRequest request) {
		Leaf leaf = leafRepository.getOne(leafId);
		return eventsMapping.get(leaf.getHistory().stream()
				.sorted(Comparator.comparing(LeafHistory::getDate).reversed())
				.filter(hi -> request.getDate() != null ? (request.getDate().compareTo(hi.getDate()) > 0) : true)
				.map(LeafHistory::getEventType)
				.findFirst()
				.orElse(null));
	}

	@Transactional
	@Override
	public void removeHistoryItem(Long leafId, Long hiId) {
		Leaf leaf = leafRepository.getOne(leafId);
		LeafHistory history = leafHistoryRepository.getOne(hiId);
		leaf.getHistory().remove(history);

		leafRepository.saveAndFlush(leaf);
	}

	@Transactional
	@Override
	public void saveHistoryItem(LeafHistoryDto dto, Long leafId) {
		Leaf leaf = leafRepository.getOne(leafId);

		validateEventType(dto, leaf);

		LeafHistory history = LeafHistory.of(dto);

		history.setLeaf(leaf);
		leaf.getHistory().add(history);

		saveAllFiles(leaf);

		if (dto.getEventType().equals(SEPARATE_FROM_LEAF)) {
			exemplarTransitionService.createExemplarFromChildSeparation(leafId, dto.getDate());
		}

		leafRepository.saveAndFlush(leaf);
	}

	@Transactional
	@Override
	public LeafPage getList(Pageable pageable, LeafSearchParams searchParams) {
		Page<Leaf> page = leafRepository.findAll(new LeafSpecification(searchParams), pageable);
		return LeafPage.builder()
				.leaves(convert(page.getContent()))
				.totalElements(page.getTotalElements())
				.totalPages(page.getTotalPages())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
	}

	private List<LeafDto> convert(List<Leaf> entities) {
		return entities.stream()
				.map(LeafDto::of).collect(Collectors.toList());
	}

	private void validateEventType(LeafHistoryDto dto, Leaf leaf) {
		List<LeafHistory.LeafEvent> allowedEvents = eventsMapping.get(leaf.getHistory().stream()
				.sorted(Comparator.comparing(LeafHistory::getDate).reversed())
				.filter(hi -> dto.getDate() != null ? (dto.getDate().compareTo(hi.getDate()) > 0) : true)
				.map(LeafHistory::getEventType)
				.findFirst().orElse(null));

		Optional.ofNullable(allowedEvents).filter(events -> events.contains(dto.getEventType()))
				.orElseThrow(() -> new IllegalArgumentException("Event type is not allowed"));
	}

	private void saveAllFiles(Leaf entity) {
		entity.getHistory().stream().forEach(detail ->
				detail.setPhoto(saveFile(detail.getPhoto(), entity)));
	}

	private String saveFile(String photo, Leaf entity) {
		return fileService.saveLeafFile(photo, entity.getVariety().getName());
	}
}
