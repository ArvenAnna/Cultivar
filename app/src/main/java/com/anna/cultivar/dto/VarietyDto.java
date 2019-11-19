package com.anna.cultivar.dto;

import com.anna.cultivar.entity.Variety;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class VarietyDto {
	private Long id;
	private String name;
	private String author;
	private String description;

	public static VarietyDto of(Variety variety) {
		return VarietyDto.builder()
				.id(variety.getId())
				.name(variety.getName())
				.author(variety.getAuthor())
				.description(variety.getDescription())
				.build();
	}
}
