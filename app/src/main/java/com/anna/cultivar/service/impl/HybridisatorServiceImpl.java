package com.anna.cultivar.service.impl;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anna.cultivar.dto.HybridisatorDto;
import com.anna.cultivar.repository.HybridisatorRepository;
import com.anna.cultivar.service.HybridisatorService;

@Service
public class HybridisatorServiceImpl implements HybridisatorService {

	@Autowired
	private HybridisatorRepository repository;

	@Override
	public Stream<HybridisatorDto> getAll() {
		return repository.findAll().stream().map(HybridisatorDto::of);
	}
}
