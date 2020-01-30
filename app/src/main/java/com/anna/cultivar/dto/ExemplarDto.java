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
	private String name;
	private VarietyBaseDto variety;
	private ExemplarDto parent;
	private boolean sport;
	private List<ExemplarHistoryDto> history;

	public static ExemplarDto of(Exemplar entity) {
		return ExemplarDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.variety(Optional.ofNullable(entity.getVariety()).map(VarietyBaseDto::of).orElse(null))
				.parent(Optional.ofNullable(entity.getParent()).map(ExemplarDto::ofParent).orElse(null))
				.sport(entity.isSport())
				.history(entity.getHistory().stream().map(ExemplarHistoryDto::of).collect(Collectors.toList()))
				.build();
	}

	public static ExemplarDto ofParent(Exemplar entity) {
		return ExemplarDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.build();
	}
}
