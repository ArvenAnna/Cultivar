package com.anna.cultivar.dto;

import javax.validation.constraints.NotNull;

import com.anna.cultivar.entity.VarietyDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class VarietyDetailDto {
	private Long id;
	private String description;
	private String photo;
	@NotNull
	private Integer order;

	public static VarietyDetailDto of(VarietyDetail entity) {
		return VarietyDetailDto.builder()
				.id(entity.getId())
				.description(entity.getDescription())
				.photo(entity.getPhoto())
				.order(entity.getOrder())
				.build();
	}
}
