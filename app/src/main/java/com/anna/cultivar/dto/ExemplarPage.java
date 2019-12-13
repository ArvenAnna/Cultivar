package com.anna.cultivar.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ExemplarPage {
	private List<ExemplarDto> exemplars;
	private long totalElements;
	private long totalPages;
	private long currentPage;
	private long pageSize;
}
