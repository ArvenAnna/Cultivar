package com.anna.cultivar.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.dto.ExemplarPage;
import com.anna.cultivar.dto.ExemplarSearchParams;
import com.anna.cultivar.dto.ExemplarUpdateRequest;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.repository.ExemplarKeywordSpecification;
import com.anna.cultivar.repository.ExemplarRepository;
import com.anna.cultivar.repository.ExemplarSpecification;
import com.anna.cultivar.service.ExemplarService;

@Service
public class ExemplarServiceImpl implements ExemplarService {

	@Autowired
	private ExemplarRepository exemplarRepository;
	@Autowired
	private FileServiceImpl fileService;

	@Transactional
	@Override
	public ExemplarPage getList(Pageable pageable, ExemplarSearchParams searchParams) {
		Page<Exemplar> page = exemplarRepository.findAll(new ExemplarSpecification(searchParams), pageable);
		return ExemplarPage.builder()
				.exemplars(convert(page.getContent()))
				.totalElements(page.getTotalElements())
				.totalPages(page.getTotalPages())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
	}

	@Transactional
	@Override
	public ExemplarDto getExemplar(Long exemplarId) {
		return exemplarRepository.findById(exemplarId)
				.map(ExemplarDto::of)
				.orElseThrow(() -> new IllegalArgumentException("No exemplar with given id " + exemplarId));
	}

	@Transactional
	@Override
	public ExemplarDto save(ExemplarCreationRequest dto) {
		Exemplar entity = Exemplar.of(dto);
		ExemplarHistory history = ExemplarHistory.of(dto);
		history.setExemplar(entity);
		entity.getHistory().add(history);

		saveAllFiles(entity);

		return ExemplarDto.of(exemplarRepository.saveAndFlush(entity));
	}

	private void saveAllFiles(Exemplar entity) {
		entity.getHistory().stream().forEach(detail ->
				detail.setPhoto(saveFile(detail.getPhoto(), entity)));
	}

	private String saveFile(String photo, Exemplar entity) {
		return fileService.saveExemplarFile(photo, entity.getName());
	}

	@Transactional
	@Override
	public ExemplarPage findByKeyword(Pageable pageable, String keyword) {
		Page<Exemplar> page = exemplarRepository.findAll(new ExemplarKeywordSpecification(keyword), pageable);
		return ExemplarPage.builder()
				.exemplars(convert(page.getContent()))
				.totalElements(page.getTotalElements())
				.totalPages(page.getTotalPages())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
	}

	@Transactional
	@Override
	public ExemplarDto update(ExemplarUpdateRequest dto) {
		Exemplar existingEntity = exemplarRepository.getOne(dto.getId());
		Exemplar entity = Exemplar.of(dto, existingEntity);
		saveAllFiles(entity);
		return ExemplarDto.of(exemplarRepository.saveAndFlush(entity));
	}

	private List<ExemplarDto> convert(List<Exemplar> entities) {
		return entities.stream()
				.map(ExemplarDto::of).collect(Collectors.toList());
	}
}
