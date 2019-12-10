package com.anna.cultivar.dto;

import com.anna.cultivar.entity.Variety;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class VarietyBaseDto {
	private Long id;
	private String name;

	public static VarietyBaseDto of(Variety variety) {
		return new VarietyBaseDto(variety.getId(), variety.getName());
	}
}
