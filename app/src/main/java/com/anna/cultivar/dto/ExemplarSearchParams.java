package com.anna.cultivar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExemplarSearchParams {
	private String search;
	private Long varietyId;
	private Long childrenFor;
	private Long childrenForLeaf;
	private Boolean closed;
}
