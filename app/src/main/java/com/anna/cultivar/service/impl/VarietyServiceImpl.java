package com.anna.cultivar.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anna.cultivar.dto.VarietyDto;
import com.anna.cultivar.dto.VarietyPage;
import com.anna.cultivar.dto.VarietySearchParams;
import com.anna.cultivar.entity.Variety;
import com.anna.cultivar.repository.VarietyKeywordSpecification;
import com.anna.cultivar.repository.VarietyRepository;
import com.anna.cultivar.repository.VarietySpecification;
import com.anna.cultivar.service.VarietyService;

@Service
public class VarietyServiceImpl implements VarietyService {

	@Autowired
	private VarietyRepository varietyRepository;

	@Autowired
	private FileServiceImpl fileService;

	@Transactional
	@Override
	public VarietyPage getVarietyList(Pageable pageable, VarietySearchParams searchParams) {
		Page<Variety> page = varietyRepository.findAll(new VarietySpecification(searchParams), pageable);
		VarietyPage varietyPage = VarietyPage.builder()
				.varieties(convert(page.getContent()))
				.totalElements(page.getTotalElements())
				.totalPages(page.getTotalPages())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
		return varietyPage;
	}

	@Transactional
	@Override
	public VarietyDto saveRecipe(VarietyDto varietyDto) {
		Variety varietyEntity = Variety.of(varietyDto);

		saveAllFiles(varietyEntity);

		return VarietyDto.of(varietyRepository.saveAndFlush(varietyEntity));
	}

	private void saveAllFiles(Variety entity) {
		entity.getDetails().stream().forEach(detail ->
				detail.setPhoto(saveRecipeFile(detail.getPhoto(), entity)));
	}

	private String saveRecipeFile(String photo, Variety entity) {
		return fileService.saveVarietyFile(photo, entity.getName());
	}

	@Transactional
	@Override
	public VarietyDto updateRecipe(VarietyDto varietyDto) {
		return saveRecipe(varietyDto);
	}

	@Transactional
	@Override
	public VarietyDto getVariety(Long varietyId) {
		return varietyRepository.findById(varietyId)
				.map(VarietyDto::of)
				.orElseThrow(() -> new IllegalArgumentException("No variety with given id " + varietyId));
	}

	@Transactional
	@Override
	public VarietyPage findVarietiesByKeyword(Pageable pageable, String keyword) {
		Page<Variety> page = varietyRepository.findAll(new VarietyKeywordSpecification(keyword), pageable);
		VarietyPage varietyPage = VarietyPage.builder()
				.varieties(convert(page.getContent()))
				.totalElements(page.getTotalElements())
				.totalPages(page.getTotalPages())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
		return varietyPage;
	}

	private List<VarietyDto> convert(List<Variety> varieties) {
		return varieties.stream()
				.map(VarietyDto::of).collect(Collectors.toList());
	}
}
