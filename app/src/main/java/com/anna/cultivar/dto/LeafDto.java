package com.anna.cultivar.dto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.anna.cultivar.entity.Leaf;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class LeafDto {
	private Long id;
	private ExemplarDto parent;
	private VarietyBaseDto variety;
	private List<LeafHistoryDto> history;

	public static LeafDto of(Leaf entity) {
		return LeafDto.builder()
				.id(entity.getId())
				.variety(Optional.ofNullable(entity.getVariety()).map(VarietyBaseDto::of).orElse(null))
				.parent(Optional.ofNullable(entity.getParent()).map(ExemplarDto::ofParent).orElse(null))
				.history(entity.getHistory().stream().map(LeafHistoryDto::of).collect(Collectors.toList()))
				.build();
	}

	public static LeafDto ofParent(Leaf entity) {
		return LeafDto.builder()
				.id(entity.getId())
				.build();
	}
}
