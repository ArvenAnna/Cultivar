package com.anna.cultivar.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CreateLeafRequest {
	//todo: check this to be mandatory as photo saved to null path
	@NotNull
	private VarietyBaseDto variety;
	private LocalDate date;
	private String description;
	private String photo;
	private ExemplarDto parent;
}
