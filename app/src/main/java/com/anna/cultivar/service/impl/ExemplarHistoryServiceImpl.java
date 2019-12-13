package com.anna.cultivar.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.repository.ExemplarHistoryRepository;
import com.anna.cultivar.repository.ExemplarRepository;
import com.anna.cultivar.service.ExemplarHistoryService;

public class ExemplarHistoryServiceImpl implements ExemplarHistoryService {

//	@Autowired
//	private ExemplarHistoryRepository historyRepository;
	@Autowired
	private ExemplarRepository exemplarRepository;
	@Autowired
	private FileServiceImpl fileService;

	@Override
	public void save(ExemplarHistoryDto dto, Long exemplarId) {
		Exemplar exemplar = exemplarRepository.getOne(exemplarId);

		ExemplarHistory history = ExemplarHistory.of(dto);
		exemplar.getHistory().add(history);

		//todo: add validation to event type

		history.setExemplar(exemplar);
		exemplar.getHistory().add(history);

		saveAllFiles(exemplar);
		exemplarRepository.saveAndFlush(exemplar);
	}

	private void saveAllFiles(Exemplar entity) {
		entity.getHistory().stream().forEach(detail ->
				detail.setPhoto(saveFile(detail.getPhoto(), entity)));
	}

	private String saveFile(String photo, Exemplar entity) {
		return fileService.saveExemplarFile(photo, entity.getVariety().getName());
	}


	@Override
	public void update(ExemplarHistoryDto dto, Long exemplarId) {
		save(dto, exemplarId);
	}
}
