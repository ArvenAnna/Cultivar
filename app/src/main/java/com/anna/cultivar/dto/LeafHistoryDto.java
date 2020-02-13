package com.anna.cultivar.dto;

import java.time.LocalDate;

import com.anna.cultivar.entity.LeafHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class LeafHistoryDto {
	private Long id;
	private LeafHistory.LeafEvent eventType;
	private Integer eventNumber;
	private LocalDate date;
	private String description;
	private String photo;

	public static LeafHistoryDto of(LeafHistory entity) {
		return LeafHistoryDto.builder()
				.id(entity.getId())
				.eventType(entity.getEventType())
				.date(entity.getDate())
				.description(entity.getDescription())
				.photo(entity.getPhoto())
				.build();
	}
}
