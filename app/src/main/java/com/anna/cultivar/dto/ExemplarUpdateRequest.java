package com.anna.cultivar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ExemplarUpdateRequest {
	private Long id;
	private VarietyBaseDto variety;
	private String name;
	private ExemplarDto parent;
	private boolean isSport;
}
