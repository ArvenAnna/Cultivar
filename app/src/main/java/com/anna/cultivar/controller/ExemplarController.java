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

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.dto.ExemplarPage;
import com.anna.cultivar.dto.ExemplarSearchParams;
import com.anna.cultivar.service.ExemplarService;

@RestController
@RequestMapping(value = {"/exemplars"}, headers = "Accept=application/json")
public class ExemplarController {

	@Autowired
	private ExemplarService exemplarService;

	@RequestMapping(method = RequestMethod.GET)
	public ExemplarPage exemplarsList(ExemplarSearchParams searchParams, @NotNull final Pageable pageable) {
		return exemplarService.getList(pageable, searchParams);
	}

	@RequestMapping(value = {"/{exemplarId}"}, method = RequestMethod.GET)
	public ExemplarDto getExemplar(@PathVariable("exemplarId") Long exemplarId) {
		return exemplarService.getExemplar(exemplarId);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ExemplarDto saveExemplar(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarCreationRequest dto) {
		return exemplarService.save(dto);
	}

	@RequestMapping(value = {"/keyword"}, method = RequestMethod.POST)
	public ExemplarPage findExemplarsByKeyword(@RequestBody String keyword, @NotNull final Pageable pageable) {
		// do combination of name and variety name
		return exemplarService.findByKeyword(pageable, keyword);
	}
}
