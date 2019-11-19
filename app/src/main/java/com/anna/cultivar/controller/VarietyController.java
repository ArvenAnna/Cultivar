package com.anna.cultivar.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anna.cultivar.dto.VarietyDto;
import com.anna.cultivar.dto.VarietyPage;
import com.anna.cultivar.dto.VarietySearchParams;
import com.anna.cultivar.service.VarietyService;

@RestController
@RequestMapping(value = {"/varieties"}, headers = "Accept=application/json")
public class VarietyController {

	@Autowired
	private VarietyService varietyService;

	@RequestMapping(method = RequestMethod.GET)
	public VarietyPage varietyList(VarietySearchParams searchParams, @NotNull final Pageable pageable) {
		return varietyService.getVarietyList(pageable, searchParams);
	}

	@RequestMapping(value = {"/{varietyId}"}, method = RequestMethod.GET)
	public VarietyDto getVariety(@PathVariable("varietyId") Long varietyId) {
		return varietyService.getVariety(varietyId);
	}

	@RequestMapping(method = RequestMethod.POST)
	public VarietyDto saveVariety(@RequestBody @Valid @NotNull(message = "Request should not be null") VarietyDto varietyDto) {
		return varietyService.saveRecipe(varietyDto);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public VarietyDto updateVariety(@RequestBody @Valid @NotNull(message = "Request should not be null") VarietyDto varietyDto) {
		return varietyService.updateRecipe(varietyDto);
	}
}
