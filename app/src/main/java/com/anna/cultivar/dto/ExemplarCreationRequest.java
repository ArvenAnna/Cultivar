package com.anna.cultivar.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ExemplarCreationRequest {
	private VarietyBaseDto variety;
	private String name;
	private LocalDate date;
	private String description;
	private String photo;
}
