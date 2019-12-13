package com.anna.cultivar.controller;

import java.util.List;

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
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.service.ExemplarService;

@RestController
@RequestMapping(value = {"/exemplars"}, headers = "Accept=application/json")
public class ExemplarController {

	@Autowired
	private ExemplarService exemplarService;
//	@Autowired
//	private HybridisatorService hybridisatorService;

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

	@RequestMapping(value = {"/keyword/{keyword}"}, method = RequestMethod.GET)
	public ExemplarPage findExemplarsByKeyword(@PathVariable("keyword") String keyword, @NotNull final Pageable pageable) {
		return exemplarService.findByKeyword(pageable, keyword);
	}

//	@RequestMapping(value = {"/events"}, method = RequestMethod.GET)
//	public List<ExemplarHistory.ExemplarEvent> getEvents() {
//		return hybridisatorService.getAll().collect(Collectors.toList());
//	}
//
//	@RequestMapping(value = {"/types"}, method = RequestMethod.GET)
//	public List<String> getTypes() {
//		return Arrays.stream(Variety.Type.values()).map(Enum::name).collect(Collectors.toList());
//	}
}
