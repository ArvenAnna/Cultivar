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

import com.anna.cultivar.dto.AllowedEventsRequest;
import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.LeafDto;
import com.anna.cultivar.dto.LeafHistoryDto;
import com.anna.cultivar.dto.LeafPage;
import com.anna.cultivar.dto.LeafSearchParams;
import com.anna.cultivar.service.LeafService;

@RestController
@RequestMapping(value = {"/leaves"}, headers = "Accept=application/json")
public class LeafController {

	@Autowired
	private LeafService leafService;

	@RequestMapping(method = RequestMethod.GET)
	public LeafPage leavesList(LeafSearchParams searchParams, @NotNull final Pageable pageable) {
		return leafService.getList(pageable, searchParams);
	}

	@RequestMapping(value = {"/{leafId}"}, method = RequestMethod.GET)
	public LeafDto getLeaf(@PathVariable("leafId") Long leafId) {
		return leafService.getLeaf(leafId);
	}

	@RequestMapping(method = RequestMethod.POST)
	public LeafDto saveLeaf(@RequestBody @Valid @NotNull(message = "Request should not be null") CreateLeafRequest dto) {
		return leafService.saveLeaf(dto);
	}


	// For history

	@RequestMapping(value = {"/{leafId}/history/{hiId}"}, method = RequestMethod.DELETE)
	public void removeHistoryItem(@PathVariable("leafId") Long leafId, @PathVariable("hiId") Long hiId) {
		leafService.removeHistoryItem(leafId, hiId);
	}

	@RequestMapping(value = {"/{leafId}/history"}, method = RequestMethod.POST)
	public void saveHistoryItem(@RequestBody @Valid @NotNull(message = "Request should not be null") LeafHistoryDto dto, @PathVariable("leafId") Long leafId) {
		leafService.saveHistoryItem(dto, leafId);
	}

	// Event types

	@RequestMapping(value = {"/{leafId}/history/events"}, method = RequestMethod.POST)
	public List<String> getAllowedEvents(@RequestBody @Valid @NotNull AllowedEventsRequest request, @PathVariable("leafId") Long leafId) {
		return leafService.getAllowedEvents(leafId, request).stream()
				.map(enumValue -> enumValue.name())
				.collect(Collectors.toList());
	}


}
