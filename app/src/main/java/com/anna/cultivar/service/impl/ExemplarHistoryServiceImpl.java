package com.anna.cultivar.service.impl;

import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.BLOSSOM_END;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.BLOSSOM_START;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.DISAPPEARANCE;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.FIRST_BUDS;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.GROW;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.HEAD_CUT;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.LEAF_SEPARATED;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.SEPARATE_FROM_LEAF;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.STEAM_SEPARATED;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.AllowedEventsRequest;
import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.repository.ExemplarHistoryRepository;
import com.anna.cultivar.repository.ExemplarRepository;
import com.anna.cultivar.service.ExemplarHistoryService;
import com.anna.cultivar.service.ExemplarTransitionService;

@Service
public class ExemplarHistoryServiceImpl implements ExemplarHistoryService {

	private static Map<ExemplarHistory.ExemplarEvent, List<ExemplarHistory.ExemplarEvent>> eventsMapping = new HashMap<>();
	private static List<ExemplarHistory.ExemplarEvent> countableEvents = Arrays.asList(BLOSSOM_START, BLOSSOM_END);

	static {
		eventsMapping.put(ExemplarHistory.ExemplarEvent.APPEARANCE,
				Arrays.asList(SEPARATE_FROM_LEAF, FIRST_BUDS, BLOSSOM_START, BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, GROW, HEAD_CUT,
						DISAPPEARANCE));
		eventsMapping.put(SEPARATE_FROM_LEAF,
				Arrays.asList(FIRST_BUDS, GROW, DISAPPEARANCE));
		eventsMapping.put(FIRST_BUDS,
				Arrays.asList(BLOSSOM_START, GROW, DISAPPEARANCE));
		eventsMapping.put(BLOSSOM_START,
				Arrays.asList(BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, HEAD_CUT, GROW, DISAPPEARANCE));
		eventsMapping.put(BLOSSOM_END,
				Arrays.asList(BLOSSOM_START, LEAF_SEPARATED, STEAM_SEPARATED, HEAD_CUT, GROW, DISAPPEARANCE));
		eventsMapping.put(LEAF_SEPARATED,
				Arrays.asList(BLOSSOM_START, BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, HEAD_CUT, GROW, DISAPPEARANCE));
		eventsMapping.put(STEAM_SEPARATED,
				Arrays.asList(BLOSSOM_START, BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, HEAD_CUT, GROW, DISAPPEARANCE));
		eventsMapping.put(GROW,
				Arrays.asList(FIRST_BUDS, BLOSSOM_START, BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, HEAD_CUT, GROW, DISAPPEARANCE));
		eventsMapping.put(HEAD_CUT,
				Arrays.asList(BLOSSOM_START, BLOSSOM_END, LEAF_SEPARATED, STEAM_SEPARATED, GROW, DISAPPEARANCE));
		eventsMapping.put(DISAPPEARANCE,
				Collections.emptyList());
		eventsMapping.put(null,
				Collections.emptyList());

	}

	@Autowired
	private ExemplarHistoryRepository historyRepository;
	@Autowired
	private ExemplarRepository exemplarRepository;
	@Autowired
	private ExemplarTransitionService exemplarTransitionService;
	@Autowired
	private FileServiceImpl fileService;

	@Transactional
	@Override
	public void save(ExemplarHistoryDto dto, Long exemplarId) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);

		validateEventType(dto, exemplar);

		ExemplarHistory history = ExemplarHistory.of(dto);

		history.setExemplar(exemplar);
		exemplar.getHistory().add(history);

		saveAllFiles(exemplar);

		if (dto.getEventType().equals(STEAM_SEPARATED)) {
			exemplarTransitionService.createExemplarFromSteamSeparation(exemplarId, dto.getDate());
		}
		if (dto.getEventType().equals(LEAF_SEPARATED)) {
			exemplarTransitionService.createLeafFromLeafSeparation(exemplarId, dto.getDate());
		}

		exemplarRepository.saveAndFlush(exemplar);
	}

	@Transactional
	@Override
	public List<ExemplarHistory.ExemplarEvent> getAllowedEvents(Long exemplarId, AllowedEventsRequest request) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);
		return eventsMapping.get(exemplar.getHistory().stream()
				.sorted(Comparator.comparing(ExemplarHistory::getDate).reversed())
				.filter(hi -> request.getDate() != null ? (request.getDate().compareTo(hi.getDate()) > 0) : true)
				.map(ExemplarHistory::getEventType)
				.findFirst()
				.orElse(null));
	}

	private void validateEventType(ExemplarHistoryDto dto, Exemplar exemplar) {
		List<ExemplarHistory.ExemplarEvent> allowedEvents = eventsMapping.get(exemplar.getHistory().stream()
				.sorted(Comparator.comparing(ExemplarHistory::getDate).reversed())
				.filter(hi -> dto.getDate() != null ? (dto.getDate().compareTo(hi.getDate()) > 0) : true)
				.map(ExemplarHistory::getEventType)
				.findFirst().orElse(null));

		Optional.ofNullable(allowedEvents).filter(events -> events.contains(dto.getEventType()))
				.orElseThrow(() -> new IllegalArgumentException("Event type is not allowed"));

		if (countableEvents.contains(dto.getEventType()) && dto.getEventNumber() != null) {
			Integer nextValue = Optional.ofNullable(exemplar.getHistory()).map(hi -> hi.stream())
					.map(str -> str.filter(item -> item.getEventType() == dto.getEventType()))
					.flatMap(str -> str.max(Comparator.comparingInt(ExemplarHistory::getEventNumber)))
					.map(item -> item.getEventNumber())
					.map(num -> num + 1).orElse(null);
			if (!dto.getEventNumber().equals(nextValue)) {
				new IllegalArgumentException("Event number is incorrect, should be " + nextValue);
			}
		}
	}

	private void saveAllFiles(Exemplar entity) {
		entity.getHistory().stream().forEach(detail ->
				detail.setPhoto(saveFile(detail.getPhoto(), entity)));
	}

	private String saveFile(String photo, Exemplar entity) {
		return fileService.saveExemplarFile(photo, entity.getVariety().getName());
	}


	@Transactional
	@Override
	public void update(ExemplarHistoryDto dto, Long exemplarId) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);
		validateEventType(dto, exemplar);

		ExemplarHistory history = ExemplarHistory.of(dto);

		history.setExemplar(exemplar);

		saveAllFiles(exemplar);
		historyRepository.saveAndFlush(history);
	}

	@Transactional
	@Override
	public ExemplarHistoryDto get(Long exemplarId, Long hiId) {
		return ExemplarHistoryDto.of(historyRepository.getOne(hiId));
	}

	@Transactional
	@Override
	public void remove(Long exemplarId, Long hiId) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);
		ExemplarHistory history = historyRepository.getOne(hiId);
		exemplar.getHistory().remove(history);

		exemplarRepository.saveAndFlush(exemplar);
	}
}
