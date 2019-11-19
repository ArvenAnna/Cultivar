package com.anna.cultivar.service;

import org.springframework.data.domain.Pageable;

import com.anna.cultivar.dto.VarietyDto;
import com.anna.cultivar.dto.VarietyPage;
import com.anna.cultivar.dto.VarietySearchParams;

public interface VarietyService {
	VarietyPage getVarietyList(Pageable pageable, VarietySearchParams searchParams);

	VarietyDto saveRecipe(VarietyDto varietyDto);

	VarietyDto updateRecipe(VarietyDto varietyDto);

	VarietyDto getVariety(Long varietyId);
}
