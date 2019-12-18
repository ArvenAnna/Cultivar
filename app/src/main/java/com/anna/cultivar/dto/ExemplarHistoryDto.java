package com.anna.cultivar.dto;

import java.time.LocalDate;

import com.anna.cultivar.entity.ExemplarHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ExemplarHistoryDto {
	private Long id;
	private ExemplarHistory.ExemplarEvent eventType;
	private Integer eventNumber;
	private LocalDate date;
	private String description;
	private String photo;

	public static ExemplarHistoryDto of(ExemplarHistory entity) {
		return ExemplarHistoryDto.builder()
				.id(entity.getId())
				.eventType(entity.getEventType())
				.date(entity.getDate())
				.description(entity.getDescription())
				.photo(entity.getPhoto())
				.build();
	}
}
