package com.anna.cultivar.service;

import java.util.stream.Stream;

import com.anna.cultivar.dto.HybridisatorDto;

public interface HybridisatorService {
	Stream<HybridisatorDto> getAll();
}
