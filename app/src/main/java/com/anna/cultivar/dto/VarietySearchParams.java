package com.anna.cultivar.dto;

import com.anna.cultivar.entity.Variety;

import lombok.Getter;

@Getter
public class VarietySearchParams {
	private String search;
	private Long hybridisatorId;
	private Variety.Type type;
	private Long sportOf;
}
