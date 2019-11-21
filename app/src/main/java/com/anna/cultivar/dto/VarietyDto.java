package com.anna.cultivar.dto;

import java.time.LocalDate;
import java.util.List;

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
	private HybridisatorDto author;
	private String description;
	private Variety.Type type;
	private LocalDate hybridisationDate;
	private Long sportOf;
	private List<VarietyDetailDto> details;

	public static VarietyDto of(Variety variety) {
		return VarietyDto.builder()
				.id(variety.getId())
				.name(variety.getName())
				.author(HybridisatorDto.of(variety.getAuthor()))
				.description(variety.getDescription())
				.type(variety.getType())
				.hybridisationDate(variety.getHybridisationDate())
				.sportOf(variety.getSportOf())
				.build();
	}
}
