package com.anna.cultivar.service;

import com.anna.cultivar.dto.HybridisatorDto;

import java.util.stream.Stream;

public interface HybridisatorService {
	Stream<HybridisatorDto> getAll();

	HybridisatorDto getOne(Long hybridisatorId);

	HybridisatorDto save(HybridisatorDto dto);

	HybridisatorDto update(HybridisatorDto dto);
}
