package com.anna.cultivar.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CreateLeafRequest {
	private VarietyBaseDto variety;
	private LocalDate date;
	private String description;
	private String photo;
	private ExemplarDto parent;
	private boolean sport;
}
