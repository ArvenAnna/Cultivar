package com.anna.cultivar.controller;

import java.util.List;
import java.util.stream.Collectors;

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
import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.dto.ExemplarPage;
import com.anna.cultivar.dto.ExemplarSearchParams;
import com.anna.cultivar.dto.ExemplarUpdateRequest;
import com.anna.cultivar.service.ExemplarHistoryService;
import com.anna.cultivar.service.ExemplarService;

@RestController
@RequestMapping(value = {"/exemplars"}, headers = "Accept=application/json")
public class ExemplarController {

	@Autowired
	private ExemplarService exemplarService;
	@Autowired
	private ExemplarHistoryService exemplarHistoryService;

	// exemplar methods

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

	@RequestMapping(method = RequestMethod.PUT)
	public ExemplarDto updateExemplar(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarUpdateRequest dto) {
		return exemplarService.update(dto);
	}

	@RequestMapping(value = {"/keyword"}, method = RequestMethod.POST)
	public ExemplarPage findExemplarsByKeyword(@RequestBody String keyword, @NotNull final Pageable pageable) {
		// do combination of name and variety name
		return exemplarService.findByKeyword(pageable, keyword);
	}



	// exemplar history methods: could not be separated to separate controller due to SpringMvc limitation

	@RequestMapping(value = {"/{exemplarId}/history/{hiId}"}, method = RequestMethod.GET)
	public ExemplarHistoryDto getHistoryItem(@PathVariable("exemplarId") Long exemplarId, @PathVariable("hiId") Long hiId) {
		return exemplarHistoryService.get(exemplarId, hiId);
	}

	@RequestMapping(value = {"/{exemplarId}/history"}, method = RequestMethod.POST)
	public void saveHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto, @PathVariable("exemplarId") Long exemplarId) {
		exemplarHistoryService.save(dto, exemplarId);
	}

	@RequestMapping(value = {"/{exemplarId}/history"}, method = RequestMethod.PUT)
	public void updateHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto, @PathVariable("exemplarId") Long exemplarId) {
		exemplarHistoryService.update(dto, exemplarId);
	}

	@RequestMapping(value = {"/{exemplarId}/history/events"}, method = RequestMethod.GET)
	public List<String> getAllowedEvents(@PathVariable("exemplarId") Long exemplarId) {
		return exemplarHistoryService.getAllowedEvents(exemplarId).stream()
				.map(enumValue -> enumValue.name())
				.collect(Collectors.toList());
	}

}
