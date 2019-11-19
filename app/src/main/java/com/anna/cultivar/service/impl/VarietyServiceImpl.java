package com.anna.cultivar.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.anna.cultivar.dto.VarietyDto;
import com.anna.cultivar.dto.VarietyPage;
import com.anna.cultivar.dto.VarietySearchParams;
import com.anna.cultivar.entity.Variety;
import com.anna.cultivar.repository.VarietyRepository;
import com.anna.cultivar.repository.VarietySpecification;
import com.anna.cultivar.service.VarietyService;

@Service
public class VarietyServiceImpl implements VarietyService {

	@Autowired
	private VarietyRepository varietyRepository;

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

	@Override
	public VarietyDto saveRecipe(VarietyDto varietyDto) {
		Variety varietyEntity = Variety.of(varietyDto);

//		setPersistentBounds(recipeEntity);
//		saveAllFiles(recipeEntity);

		return VarietyDto.of(varietyRepository.saveAndFlush(varietyEntity));
	}

	@Override
	public VarietyDto updateRecipe(VarietyDto varietyDto) {
		return saveRecipe(varietyDto);
	}

	@Override
	public VarietyDto getVariety(Long varietyId) {
		return varietyRepository.findById(varietyId)
				.map(VarietyDto::of)
				.orElseThrow(() -> new IllegalArgumentException("No variety with given id " + varietyId));
	}

	private List<VarietyDto> convert(List<Variety> varieties) {
		return varieties.stream()
				.map(VarietyDto::of).collect(Collectors.toList());
	}
}
