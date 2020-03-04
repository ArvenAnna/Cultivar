package com.anna.cultivar.service.impl;

import com.anna.cultivar.dto.HybridisatorDto;
import com.anna.cultivar.entity.Hybridisator;
import com.anna.cultivar.repository.HybridisatorRepository;
import com.anna.cultivar.service.HybridisatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

@Service
public class HybridisatorServiceImpl implements HybridisatorService {

	@Autowired
	private HybridisatorRepository repository;

	@Transactional
	@Override
	public Stream<HybridisatorDto> getAll() {
		return repository.findAll().stream().map(HybridisatorDto::of);
	}

	@Transactional
	@Override
	public HybridisatorDto getOne(Long hybridisatorId) {
		return HybridisatorDto.of(repository.getOne(hybridisatorId));
	}

	@Transactional
	@Override
	public HybridisatorDto save(HybridisatorDto dto) {
		Hybridisator entity = Hybridisator.of(dto);
		return HybridisatorDto.of(repository.saveAndFlush(entity));
	}

	@Transactional
	@Override
	public HybridisatorDto update(HybridisatorDto dto) {
		Hybridisator entity = Hybridisator.of(dto);
		return HybridisatorDto.of(repository.saveAndFlush(entity));
	}
}
