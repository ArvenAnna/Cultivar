package com.anna.cultivar.service.impl;

import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.BLOSSOM;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.CHILD_BIRTH;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.FIRST_BUDS;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.FIRST_LEAF;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.GROW;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.LEAF_ROOTS;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.LEAF_SEPARATED;
import static com.anna.cultivar.entity.ExemplarHistory.ExemplarEvent.SEPARATE_FROM_LEAF;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.repository.ExemplarHistoryRepository;
import com.anna.cultivar.repository.ExemplarRepository;
import com.anna.cultivar.service.ExemplarHistoryService;

@Service
public class ExemplarHistoryServiceImpl implements ExemplarHistoryService {

	private static Map<ExemplarHistory.ExemplarEvent, List<ExemplarHistory.ExemplarEvent>> eventsMapping = new HashMap<>();
	private static List<ExemplarHistory.ExemplarEvent> countableEvents = Arrays.asList(BLOSSOM, LEAF_SEPARATED, LEAF_ROOTS, CHILD_BIRTH);

	static {
		eventsMapping.put(ExemplarHistory.ExemplarEvent.APPEARANCE,
				Arrays.asList(FIRST_LEAF, SEPARATE_FROM_LEAF, FIRST_BUDS, BLOSSOM, LEAF_SEPARATED, GROW));
		eventsMapping.put(FIRST_LEAF,
				Arrays.asList(SEPARATE_FROM_LEAF, GROW));
		eventsMapping.put(SEPARATE_FROM_LEAF,
				Arrays.asList(FIRST_BUDS, GROW));
		eventsMapping.put(FIRST_BUDS,
				Arrays.asList(BLOSSOM, GROW));
		eventsMapping.put(BLOSSOM,
				Arrays.asList(LEAF_SEPARATED, GROW));
		eventsMapping.put(LEAF_SEPARATED,
				Arrays.asList(LEAF_SEPARATED, LEAF_ROOTS, CHILD_BIRTH, BLOSSOM, GROW));
		eventsMapping.put(LEAF_ROOTS,
				Arrays.asList(LEAF_ROOTS, CHILD_BIRTH, LEAF_SEPARATED, BLOSSOM, GROW));
		eventsMapping.put(CHILD_BIRTH,
				Arrays.asList(LEAF_ROOTS, CHILD_BIRTH, LEAF_SEPARATED, BLOSSOM, GROW));
		eventsMapping.put(GROW,
				Arrays.asList(LEAF_ROOTS, CHILD_BIRTH, LEAF_SEPARATED, BLOSSOM, GROW));
	}

	@Autowired
	private ExemplarHistoryRepository historyRepository;
	@Autowired
	private ExemplarRepository exemplarRepository;
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
		exemplarRepository.saveAndFlush(exemplar);
	}

	@Transactional
	@Override
	public List<ExemplarHistory.ExemplarEvent> getAllowedEvents(Long exemplarId) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);
		return eventsMapping.get(exemplar.getHistory().stream()
				.sorted(Comparator.comparing(ExemplarHistory::getDate).reversed())
				.map(ExemplarHistory::getEventType)
				.findFirst()
				.orElse(null));
	}

	private void validateEventType(ExemplarHistoryDto dto, Exemplar exemplar) {
		List<ExemplarHistory.ExemplarEvent> allowedEvents = eventsMapping.get(exemplar.getHistory().stream()
				.sorted(Comparator.comparing(ExemplarHistory::getDate).reversed())
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
		save(dto, exemplarId);
	}

	@Transactional
	@Override
	public ExemplarHistoryDto get(Long exemplarId, Long hiId) {
		return ExemplarHistoryDto.of(historyRepository.getOne(hiId));
	}
}
