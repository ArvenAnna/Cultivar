package com.anna.cultivar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.anna.cultivar.dto.VarietyDetailDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "variety_details")
public class VarietyDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "photo")
	private String photo;

	@Column(name = "description")
	private String description;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "variety_id")
	private Variety variety;

	@Column(name = "detail_order")
	private Integer order;

	public static VarietyDetail of(VarietyDetailDto dto) {
		VarietyDetail detail = new VarietyDetail();
		detail.setId(dto.getId());
		detail.setDescription(dto.getDescription());
		detail.setPhoto(dto.getPhoto());
		detail.setOrder(dto.getOrder());
		return detail;
	}

	public static VarietyDetail of(VarietyDetailDto dto, Variety variety) {
		VarietyDetail detail = of(dto);
		detail.setVariety(variety);
		return detail;
	}
}
