package com.anna.cultivar.dto;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.anna.cultivar.entity.Exemplar;

import com.anna.cultivar.entity.ExemplarHistory;
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
	private LeafDto parentLeaf;
	private boolean sport;
	private List<ExemplarHistoryDto> history;

	public static ExemplarDto of(Exemplar entity) {
		return ExemplarDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.variety(Optional.ofNullable(entity.getVariety()).map(VarietyBaseDto::of).orElse(null))
				.parent(Optional.ofNullable(entity.getParent()).map(ExemplarDto::ofParent).orElse(null))
				.parentLeaf(Optional.ofNullable(entity.getParentLeaf()).map(LeafDto::ofParent).orElse(null))
				.sport(entity.isSport())
				.history(Stream.concat(entity.getHistory().stream().filter(dto -> dto.getDate() == null),
						entity.getHistory().stream()
						.filter(dto -> dto.getDate() != null)
						.sorted(Comparator.comparing(ExemplarHistory::getDate)))
						.map(ExemplarHistoryDto::of)
						.collect(Collectors.toList()))
				.build();
	}

	public static ExemplarDto ofParent(Exemplar entity) {
		return ExemplarDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.sport(entity.isSport())
				.build();
	}
}
