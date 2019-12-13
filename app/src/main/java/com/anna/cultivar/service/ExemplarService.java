package com.anna.cultivar.service;

import org.springframework.data.domain.Pageable;

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarDto;
import com.anna.cultivar.dto.ExemplarPage;
import com.anna.cultivar.dto.ExemplarSearchParams;

public interface ExemplarService {
	ExemplarPage getList(Pageable pageable, ExemplarSearchParams searchParams);

	ExemplarDto getExemplar(Long exemplarId);

	ExemplarDto save(ExemplarCreationRequest dto);

	ExemplarPage findByKeyword(Pageable pageable, String keyword);
}
