package com.anna.cultivar.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.ExemplarHistoryDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "exemplar_history")
public class ExemplarHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "exemplar_id")
	private Exemplar exemplar;

	@Column(name = "event_type")
	@Enumerated(EnumType.STRING)
	private ExemplarEvent eventType;

	@Column(name = "event_date")
	private LocalDate date;

	@Column(name = "description")
	private String description;

	@Column(name = "event_number")
	private Integer eventNumber;

	@Column(name = "photo")
	private String photo;

	public enum ExemplarEvent {
		APPEARANCE,
		SEPARATE_FROM_LEAF,
		FIRST_BUDS,
		BLOSSOM_START,
		BLOSSOM_END,
		LEAF_SEPARATED,
		STEAM_SEPARATED,
		HEAD_CUT,
		DISAPPEARANCE,
		GROW
	}

	public static ExemplarHistory of(ExemplarCreationRequest request) {
		ExemplarHistory entity = new ExemplarHistory();
		entity.setDate(request.getDate());
		entity.setDescription(request.getDescription());
		entity.setPhoto(request.getPhoto());
		entity.setEventType(ExemplarEvent.APPEARANCE);
		return entity;
	}

	public static ExemplarHistory of(ExemplarHistoryDto dto) {
		ExemplarHistory entity = new ExemplarHistory();
		entity.setId(dto.getId());
		entity.setDate(dto.getDate());
		entity.setDescription(dto.getDescription());
		entity.setPhoto(dto.getPhoto());
		entity.setEventType(dto.getEventType());
		return entity;
	}
}
