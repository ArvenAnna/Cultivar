package com.anna.cultivar.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AllowedEventsRequest {
	private LocalDate date;
}
