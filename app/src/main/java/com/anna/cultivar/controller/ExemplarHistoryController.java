package com.anna.cultivar.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anna.cultivar.dto.ExemplarHistoryDto;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.service.ExemplarHistoryService;

@RestController
@RequestMapping(value = {"/exemplar/${id}/history"}, headers = "Accept=application/json")
public class ExemplarHistoryController {
	@Autowired
	private ExemplarHistoryService exemplarHistoryService;

	@RequestMapping(method = RequestMethod.POST)
	public ExemplarHistoryDto saveHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto) {
		return exemplarHistoryService.save(dto);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ExemplarHistoryDto updateHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") ExemplarHistoryDto dto) {
		return exemplarHistoryService.update(dto);
	}


	@RequestMapping(value = {"/events"}, method = RequestMethod.GET)
	public List<String> getEvents() {
			return Arrays.stream(ExemplarHistory.ExemplarEvent.values())
					.filter(evt -> ExemplarHistory.ExemplarEvent.BIRTH != evt)
					.map(Enum::name)
					.collect(Collectors.toList());
	}
}
