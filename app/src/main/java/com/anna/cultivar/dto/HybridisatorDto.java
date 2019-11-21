package com.anna.cultivar.dto;

import com.anna.cultivar.entity.Hybridisator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class HybridisatorDto {
	private Long id;
	private String name;

	public static HybridisatorDto of(Hybridisator entity) {
		return HybridisatorDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.build();
	}
}
