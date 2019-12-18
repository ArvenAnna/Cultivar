package com.anna.cultivar.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anna.cultivar.dto.ExemplarHistoryDto;

import com.anna.cultivar.service.ExemplarHistoryService;

@RestController
@RequestMapping(value = {"/exemplars/${exemplarId}/history"}, headers = "Accept=application/json")
public class ExemplarHistoryController {

	@Autowired
	private ExemplarHistoryService exemplarHistoryService;

	@RequestMapping(method = RequestMethod.POST)
	public void saveHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto, @PathVariable("exemplarId") Long exemplarId) {
		exemplarHistoryService.save(dto, exemplarId);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void updateHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto, @PathVariable("exemplarId") Long exemplarId) {
		exemplarHistoryService.update(dto, exemplarId);
	}

	@RequestMapping(value = {"/events"}, method = RequestMethod.GET)
	public List<String> getAllowedEvents(@PathVariable("exemplarId") Long exemplarId) {
			return exemplarHistoryService.getAllowedEvents(exemplarId).stream()
					.map(enumValue -> enumValue.name())
					.collect(Collectors.toList());
	}
}
