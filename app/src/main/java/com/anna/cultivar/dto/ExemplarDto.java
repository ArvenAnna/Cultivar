package com.anna.cultivar.dto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.anna.cultivar.entity.Exemplar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ExemplarDto {
	private Long id;
	private VarietyBaseDto variety;
	private Long parent;
	private boolean isSport;
	private List<ExemplarHistoryDto> history;

	public static ExemplarDto of(Exemplar entity) {
		return ExemplarDto.builder()
				.id(entity.getId())
				.variety(Optional.ofNullable(entity.getVariety()).map(VarietyBaseDto::of).orElse(null))
				.parent(Optional.ofNullable(entity.getParent()).map(Exemplar::getId).orElse(null))
				.isSport(entity.isSport())
				.history(entity.getHistory().stream().map(ExemplarHistoryDto::of).collect(Collectors.toList()))
				.build();
	}
}
