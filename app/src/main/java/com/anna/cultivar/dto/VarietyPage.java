package com.anna.cultivar.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class VarietyPage {
	private List<VarietyDto> varieties;
	private long totalElements;
	private long totalPages;
	private long currentPage;
	private long pageSize;
}
